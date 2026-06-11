# Nguồn thông tin deployment

## Các file đã đọc

### 1. `/home/robert/Agri-web-app/fe-agri/README.md`

- **Nội dung**: Giới thiệu dự án Bulletproof React - một architecture guide cho React applications
- **Nguồn cung cấp**: Thông tin cơ bản về cấu trúc project có 3 apps: `nextjs-app`, `nextjs-pages`, `react-vite`

### 2. `/home/robert/Agri-web-app/fe-agri/tree-l3.md`

- **Nội dung**: Cây thư mục chi tiết của dự án
- **Nguồn cung cấp**: Xác định có 3 ứng dụng trong thư mục `apps/`
  - `apps/nextjs-app/` - Next.js với App Router
  - `apps/nextjs-pages/` - Next.js với Pages Router
  - `apps/react-vite/` - React với Vite

### 3. `/home/robert/Agri-web-app/fe-agri/docs/deployment.md`

- **Nội dung**: Hướng dẫn deployment từ tài liệu chính thức của dự án
- **Nguồn cung cấp**: **ĐÂY LÀ NGUỒN CHÍNH** cho các tùy chọn deployment được liệt kê:
  - Vercel
  - Netlify
  - AWS (CloudFront)
  - CloudFlare

### 4. `/home/robert/Agri-web-app/fe-agri/.github/workflows/`

- **Nội dung**: Chứa 3 workflow files:
  - `nextjs-app-ci.yml`
  - `nextjs-pages-ci.yml`
  - `react-vite-ci.yml`
- **Nguồn cung cấp**: Xác định project có CI pipeline nhưng **chưa có CD** (deployment) workflow

---

## Tổng kết

Thông tin về **các tùy chọn deployment** được lấy trực tiếp từ file `docs/deployment.md` - đây là tài liệu hướng dẫn chính thức của dự án Bulletproof React.
