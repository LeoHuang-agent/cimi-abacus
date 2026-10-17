# 固定公网链接（免费）

国内若打不开 Netlify，请用 **Vercel**（通常可访问）。

## 推荐：Vercel 拖拽上传（约 1 分钟）

1. 浏览器打开：https://vercel.com/new  
2. 把项目里的整个 `dist` 文件夹拖进页面  
   （或点 Choose a folder to deploy 选 `dist`）  
3. 按提示用邮箱 / GitHub 免费注册或登录一次  
4. 部署完成后会得到：  
   `https://xxx.vercel.app`  
5. 手机 Safari 打开该链接 → 分享 →「添加到主屏幕」

本地先确保 `dist` 是最新：

```bash
cd "/Users/ww/Cimi小算盘"
npm run build
open dist
open https://vercel.com/new
```

## 备选：命令行

```bash
cd "/Users/ww/Cimi小算盘"
npm run build
npx vercel login
npx vercel ./dist --prod
```
