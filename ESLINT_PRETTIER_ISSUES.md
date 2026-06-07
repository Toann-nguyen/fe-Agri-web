# ESLint, Prettier & Husky - Issues & Fixes

## 1. Thiếu lint-staged Config ở Root

**Vấn đề:** Root `package.json` khai báo script `"lint-staged": "lint-staged"` nhưng không có phần config thực tế.

**Fix:** Thêm config vào root `package.json`:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

Hoặc tạo file `.lintstagedrc` ở root:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

---

## 2. Inconsistent printWidth giữa các apps

**Vấn đề:**
- `nextjs-app/.prettierrc` → `printWidth: 80`
- `nextjs-pages/.prettierrc` → `printWidth: 80`
- `react-vite/.prettierrc` → `printWidth: 120`

**Fix:** Đồng nhất về 80 (khuyến nghị):

```json
// react-vite/.prettierrc
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## 3. Inconsistent prettier/prettier rule

**Vấn đề:**
- `nextjs-app/.eslintrc.cjs` → `['error', {}, { usePrettierrc: true }]`
- `nextjs-pages/.eslintrc.cjs` → `['error', {}, { usePrettierrc: true }]`
- `react-vite/.eslintrc.cjs` → `['warn', {}, { usePrettierrc: true }]`

**Fix:** Đổi react-vite thành `'error'` và loại bỏ `usePrettierrc: true` (deprecated):

```javascript
// Trong react-vite/.eslintrc.cjs - rules
'prettier/prettier': ['error'],
```

Tương tự cho các app khác, loại bỏ option cũ:

```javascript
// Thay
'prettier/prettier': ['error', {}, { usePrettierrc: true }]
// Thành
'prettier/prettier': ['error'],
```

---

## 4. Deprecated usePrettierrc Option

**Vấn đề:** eslint-plugin-prettier phiên bản mới tự động sử dụng `.prettierrc`, không cần `usePrettierrc: true`.

**Fix:** Cập nhật ở cả 3 apps - loại bỏ option không còn cần thiết:

```javascript
// .eslintrc.cjs - thay
'prettier/prettier': ['error', {}, { usePrettierrc: true }]
// thành
'prettier/prettier': ['error'],
```

---

## 5. Xóa printWidth 80 thừa trong nextjs-app và nextjs-pages

**Vấn đề:** Cả 2 app đều có `printWidth: 80` giống nhau, có thể để ở root `.prettierrc` và các app kế thừa.

**Fix:** Tạo root `.prettierrc` và để các app kế thừa:

```json
// root .prettierrc
{
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

Sau đó xóa `.prettierrc` ở các app, hoặc giữ nếu cần override riêng.

---

## Tóm tắt các files cần sửa

| File | Issue | Action |
|------|-------|--------|
| `package.json` (root) | Thiếu lint-staged config | Thêm config |
| `apps/react-vite/.prettierrc` | printWidth: 120 | Đổi thành 80 |
| `apps/react-vite/.eslintrc.cjs` | prettier rule = warn | Đổi thành error, bỏ usePrettierrc |
| `apps/nextjs-app/.eslintrc.cjs` | usePrettierrc deprecated | Bỏ option deprecated |
| `apps/nextjs-pages/.eslintrc.cjs` | usePrettierrc deprecated | Bỏ option deprecated |

---

## Commands để verify sau khi fix

```bash
# Check lint
pnpm lint

# Check prettier
pnpm prettier --check .

# Test husky
pnpm prepare
```