# Web Audit Report — toanrobert.online

> **Generated:** 2026-07-01
> **Source:** PageSpeed Insights (Lighthouse 13.4.0) + CDP Audit (Puppeteer/Chrome DevTools Protocol)
> **Project:** fe-agri (Next.js 14 App Router, Cloudflare Edge, pnpm monorepo)

---

## 🏆 Tổng quan Scores

### Mobile (Moto G Power, Slow 4G)

| Category         | Score   | Đánh giá         |
| ---------------- | ------- | ---------------- |
| Performance      | **74**  | ⚠️ Cần cải thiện |
| Accessibility    | **86**  | Cần cải thiện    |
| Best Practices   | **100** | ✅ Tốt           |
| SEO              | **100** | ✅ Tốt           |
| Agentic Browsing | 1/2     | ⚠️               |

### Desktop

| Category       | Score   | Đánh giá         |
| -------------- | ------- | ---------------- |
| Performance    | **79**  | ⚠️ Cần cải thiện |
| Accessibility  | **92**  | ✅ Tốt           |
| Best Practices | **100** | ✅ Tốt           |
| SEO            | **100** | ✅ Tốt           |

---

## 📊 Core Web Vitals

### Từ PageSpeed Insights (Mobile, Slow 4G)

| Metric                         | Value     | Threshold | Đánh giá      |
| ------------------------------ | --------- | --------- | ------------- |
| FCP (First Contentful Paint)   | **1.5s**  | < 1.8s    | ✅ Tốt        |
| LCP (Largest Contentful Paint) | **7.3s**  | < 2.5s    | ❌ **Kém**    |
| TBT (Total Blocking Time)      | **10ms**  | < 200ms   | ✅ Tốt        |
| CLS (Cumulative Layout Shift)  | **0.009** | < 0.1     | ✅ Tốt        |
| SI (Speed Index)               | **4.0s**  | < 3.4s    | ⚠️ Trung bình |

### Từ CDP Audit (Desktop, không throttling)

| Metric    | Value       | Ghi chú                      |
| --------- | ----------- | ---------------------------- |
| LCP       | **2,100ms** | ✅ Tốt (lab, không throttle) |
| CLS       | **0.202**   | ❌ Kém                       |
| TBT       | **3,760ms** | ❌ Rất kém                   |
| Load Time | **9,681ms** | ❌ Chậm                      |
| JS Heap   | **5.3 MB**  | Bình thường                  |

---

## 📦 Resource Breakdown

Tổng cộng **807.4 KB / 32 requests**:

| initiatorType |         Size | Requests | Thực chất                                                                 |
| :------------ | -----------: | :------: | :------------------------------------------------------------------------ |
| css           | **431.7 KB** |    5     | bg-hero-1.webp (168KB), bg-hero-2.webp (165KB), fonts (84KB) + actual CSS |
| script        | **156.1 KB** |    13    | Next.js chunks                                                            |
| img           | **115.7 KB** |    1     | avatar.jpg                                                                |
| link          | **100.2 KB** |    7     | Stylesheets + preloads                                                    |
| other         |       3.5 KB |    1     | misc                                                                      |
| fetch/xhr     |       0.3 KB |    5     | API calls                                                                 |

### Top 5 Resources Lớn Nhất

|  #  |         Size | Type           | URL                |
| :-: | -----------: | :------------- | :----------------- |
|  1  | **168.5 KB** | CSS (bg image) | /bg-hero-1.webp    |
|  2  | **164.9 KB** | CSS (bg image) | /bg-hero-2.webp    |
|  3  | **115.7 KB** | img            | /avatar.jpg        |
|  4  |  **83.6 KB** | CSS (font)     | Google Fonts woff2 |
|  5  |  **53.1 KB** | script         | Next.js chunk      |

---

## 🔬 Code Coverage

| Loại       |        Total |       Unused | % Unused     |
| :--------- | -----------: | -----------: | :----------- |
| CSS        |      80.2 KB |      47.9 KB | **59.7%**    |
| JavaScript | **398.7 KB** | **389.0 KB** | **97.6%** ❌ |

> JS chỉ dùng **2.4%** — bundle chứa code toàn bộ section (Hero, Expertise, Projects, v.v.) nhưng chỉ 1 phần dùng ngay initial load.

---

## 🔍 SEO Audit

### ✅ Đã có / OK

| Item             |                                     Value |
| :--------------- | ----------------------------------------: |
| Title            | `Nguyen Minh Toan — Full-Stack Developer` |
| Meta Description |                        ~155 ký tự, hợp lý |
| OG Title         |                                        ✅ |
| OG Description   |                                        ✅ |
| Canonical        |              `https://toanrobert.online/` |
| Lang             |                                      `en` |
| Viewport         |     `width=device-width, initial-scale=1` |
| Charset          |                                     UTF-8 |
| Twitter Card     |                    ✅ summary_large_image |
| robots.txt       |                                     ✅ Có |
| Favicon files    |                  ✅ Có file trong public/ |

### ❌ Thiếu / Cần sửa

|  #  | Issue                       | Severity      | File                                                 |
| :-: | --------------------------- | ------------- | :--------------------------------------------------- |
|  1  | **OG Image không có**       | 🔴 Cao        | layout.tsx — openGraph.images chưa set               |
|  2  | **Favicon không được link** | 🟠 Trung bình | layout.tsx — cần thêm icons metadata                 |
|  3  | **Schema.org JSON-LD**      | 🟠 Trung bình | layout.tsx — thiếu structured data                   |
|  4  | **meta robots chưa set**    | 🟢 Thấp       | layout.tsx — thêm robots metadata                    |
|  5  | **H1 text bị dính**         | 🟢 Thấp       | hero.tsx — \"Nguyen Minh ToanPerformance Architect\" |

---

## 🎨 Accessibility

|  #  | Issue                          | Severity      |
| :-: | ------------------------------ | ------------- |
|  1  | **Empty buttons (2 elements)** | 🟠 Trung bình |
|  2  | **No ARIA labels**             | 🟢 Thấp       |
|  3  | Image alt text                 | ✅ 3/3 có alt |
|  4  | HTML lang                      | ✅ en         |
|  5  | Console errors                 | ✅ 0 errors   |

---

## 🛡️ Security Headers

| Header                    | Status     | File cần tạo                 |
| ------------------------- | ---------- | ---------------------------- |
| X-Frame-Options           | ❌ NOT SET | middleware.ts mới            |
| X-Content-Type-Options    | ❌ NOT SET | middleware.ts mới            |
| Strict-Transport-Security | ❌ NOT SET | middleware.ts mới            |
| Cache-Control             | ❌ NOT SET | next.config.mjs + middleware |
| Content-Encoding          | ✅ br      | Cloudflare tự động           |

> Hiện tại **không có middleware.ts** — cần tạo mới.

---

## ⚡ Performance Issues

### 1. LCP 7.3s trên Mobile 🔴 P0

Nguyên nhân:

- bg-hero-1.jpg (2.38 MB) — CSS có thể vẫn reference .jpg thay vì .webp
- Render-blocking scripts/stylesheets
- Edge runtime cold start

**Ước tính tiết kiệm:** ~4-5s

### 2. Render-blocking Resources 🔴 P0

PSI ước tính tiết kiệm **1,360ms**.

### 3. Image Delivery Optimization 🟠 P1

PSI ước tính tiết kiệm **111 KiB**.

- logo.svg (581 KB) quá lớn cho SVG
- next.config.mjs đang set `images: { unoptimized: true }`

### 4. Code Coverage — 97.6% JS Unused 🔴 P0

Tất cả sections render ngay không có dynamic import.

---

## 📋 Tổng hợp Actions

### P0 — Performance Critical

|  #  | Action                                                | File(s)             |
| :-: | ----------------------------------------------------- | ------------------- |
|  1  | Fix LCP: preload hero image, CSS dùng .webp thay .jpg | hero component, CSS |
|  2  | Dynamic imports cho sections dưới fold                | page.tsx            |
|  3  | Inline critical CSS                                   | next.config.mjs     |
|  4  | Xóa `unoptimized: true`                               | next.config.mjs     |

### P1 — SEO + UX

|  #  | Action                      | File(s)                          |
| :-: | --------------------------- | -------------------------------- |
|  5  | Thêm OG Image               | public/og-image.png + layout.tsx |
|  6  | Link favicon trong metadata | layout.tsx                       |
|  7  | Fix H1 text                 | hero.tsx                         |
|  8  | Thêm Schema.org JSON-LD     | layout.tsx                       |

### P2 — Quality

|  #  | Action                           | File(s)           |
| :-: | -------------------------------- | ----------------- |
|  9  | Thêm meta robots                 | layout.tsx        |
| 10  | Thêm security headers middleware | src/middleware.ts |
| 11  | Optimize logo.svg (581 KB)       | public/logo.svg   |
| 12  | Fix empty buttons + aria-labels  | hero component    |
| 13  | Fix non-composited animations    | hero CSS          |

```

```
