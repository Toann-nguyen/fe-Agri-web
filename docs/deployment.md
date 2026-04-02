# 🌐 Deployment

Deploy and serve your applications and assets over a CDN for best delivery and performance. Good options for that are:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [AWS](https://aws.amazon.com/cloudfront/)
- [CloudFlare](https://www.cloudflare.com/en-gb/cdn/)

## Deployment via Cloudflare Pages

Dự án đã được cấu hình tự động deploy lên Cloudflare Pages thông qua GitHub Actions.

### 1. Cấu hình GitHub Secrets

Để GitHub Actions có thể deploy lên Cloudflare, bạn cần cấu hình các Secrets sau tại **Settings > Secrets and Variables > Actions**:

- `CLOUDFLARE_API_TOKEN`: Token có quyền Edit Cloudflare Pages.
- `CLOUDFLARE_ACCOUNT_ID`: Account ID (`f960756ef992f2078150351f8b7141ca`).

### 2. Các ứng dụng được hỗ trợ

#### React Vite (`apps/react-vite`)
- **Domain**: `https://toanrobert.online`
- **Output**: Thư mục `dist/`
- **SPA Routing**: Đã có file `_redirects` hỗ trợ SPA (fallback về `index.html`).
- **CD Workflow**: `.github/workflows/react-vite-cd.yml`

#### Next.js App (`apps/nextjs-app`)
- **Domain**: `fe-agri-nextjs-app.pages.dev` (hoặc custom domain)
- **Adapter**: Sử dụng `@cloudflare/next-on-pages`.
- **Build Command**: `npx @cloudflare/next-on-pages`
- **CD Workflow**: `.github/workflows/nextjs-app-cd.yml`

### 3. Lưu ý về CORS (Quan trọng)

Vì Frontend và Backend (`api.toanrobert.online`) khác subdomain, bạn cần đảm bảo Backend đã cấu hình cho phép Origin của Frontend:

```env
CORS_ALLOWED_ORIGIN=https://toanrobert.online
```
