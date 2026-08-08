/**
 * Sinh types động từ OpenAPI spec của backend.
 *
 * Cách dùng:
 *   1. Backend be-agri đang chạy (kèm Swagger)
 *   2. `pnpm gen:api` (hoặc `pnpm --filter fe-agri-nextjs-app run gen:api`)
 *
 * Nếu chưa có URL Swagger ổn định, script báo lỗi và giữ nguyên file
 * placeholder `src/types/generated/openapi.d.ts`.
 */
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SWAGGER_URL =
  process.env.SWAGGER_URL || 'http://localhost:3000/docs/json';

const outputFile = resolve(__dirname, '../src/types/generated/openapi.d.ts');

if (!existsSync(outputFile)) {
  console.error(
    `File placeholder "${outputFile}" chưa tồn tại. Bỏ qua để tránh xoá nhầm.`,
  );
  process.exit(1);
}

try {
  execSync(`pnpm exec openapi-typescript ${SWAGGER_URL} -o ${outputFile}`, {
    stdio: 'inherit',
  });
  console.log(`Đã types từ ${SWAGGER_URL} -> ${outputFile}`);
} catch (error) {
  console.warn(
    'Không kết nối được tới Swagger spec. Giữ nguyên placeholder.\n' +
      'Đảm bảo backend đang chạy hoặc chỉnh SWAGGER_URL.',
  );
  process.exit(1);
}
