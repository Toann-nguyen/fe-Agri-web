/**
 * Fetch OpenAPI specs từ backend (đứng sau nginx api.toanrobert.online).
 *
 * Cách dùng:
 *   1. `pnpm --filter @repo/api fetch:specs`
 *   2. (tuỳ chọn) override base URL: `DOCS_BASE_URL=http://localhost pnpm ...`
 *
 * Output: packages/api/specs/{laravel,finance,notify}-openapi.json (commit vào git).
 * laravel = required (fail → exit 1), finance/notify = optional (fail → skeleton).
 */
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const specsDir = path.resolve(__dirname, '../specs');

const DOCS_BASE_URL =
  process.env.DOCS_BASE_URL || 'https://api.toanrobert.online';

const PLACEHOLDER = (title) => ({
  openapi: '3.0.3',
  info: { title, version: '0.0.0' },
  paths: {},
  components: { schemas: {} },
});

const sources = [
  {
    name: 'laravel',
    file: 'laravel-openapi.json',
    url: `${DOCS_BASE_URL}/docs/laravel/openapi.json`,
    required: true,
    placeholderTitle: 'Laravel API (placeholder)',
  },
  {
    name: 'finance',
    file: 'finance-openapi.json',
    url: `${DOCS_BASE_URL}/docs/finance/openapi.json`,
    required: false,
    placeholderTitle: 'Finance API (placeholder)',
  },
  {
    name: 'notify',
    file: 'notify-openapi.json',
    url: `${DOCS_BASE_URL}/docs/notify/openapi.json`,
    required: false,
    placeholderTitle: 'Notify API (placeholder)',
  },
];

async function fetchSpec(source) {
  console.log(`🔄 Fetching ${source.name}: ${source.url}`);
  try {
    const res = await fetch(source.url, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    if (!json.openapi || !json.paths) {
      throw new Error('Invalid OpenAPI structure');
    }

    await writeFile(
      path.join(specsDir, source.file),
      JSON.stringify(json, null, 2),
      'utf-8',
    );

    console.log(`✅ Saved specs/${source.file} (v${json.openapi})`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to fetch ${source.name}: ${err.message}`);
    const target = path.join(specsDir, source.file);

    if (source.required) {
      process.exit(1);
    }

    if (!existsSync(target)) {
      await writeFile(
        target,
        JSON.stringify(PLACEHOLDER(source.placeholderTitle), null, 2),
        'utf-8',
      );
      console.warn(`⚠️  Wrote placeholder specs/${source.file}`);
    } else {
      console.warn(`ℹ️  Giữ nguyên spec cũ specs/${source.file}`);
    }
    return false;
  }
}

async function main() {
  if (!existsSync(specsDir)) {
    await mkdir(specsDir, { recursive: true });
  }

  console.log(`📂 Specs dir: ${specsDir}`);
  console.log(`🌐 Base URL: ${DOCS_BASE_URL}\n`);

  const results = await Promise.all(sources.map(fetchSpec));
  const successCount = results.filter(Boolean).length;

  console.log(`\n📊 Fetched ${successCount}/${sources.length} specs`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
