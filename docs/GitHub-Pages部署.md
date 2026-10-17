# GitHub Pages 部署

推送到 `main` 后，GitHub Actions 会自动构建并发布。

## 地址

`https://<你的用户名>.github.io/cimi-abacus/`

## 首次开启（若 Actions 已跑通仍打不开）

1. 打开仓库 → **Settings** → **Pages**
2. **Source** 选 **GitHub Actions**
3. 等 Actions 里 `Deploy to GitHub Pages` 成功即可

## 本地验证 Pages 构建

```bash
npm run build:pages
npm run preview
```
