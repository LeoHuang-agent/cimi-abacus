# cimi 小算盘

深圳陪拍报价用的**离线手机 App**（PWA + Capacitor）。

装到手机后，**不需要联网**就能报价、截图发给客户。

---

## 方式一：装成桌面 App（最快，推荐）

适合 iPhone / Android，不用上架应用商店。

1. 电脑执行：`npm run build && npm run preview -- --host`
2. 手机连同一 Wi‑Fi，用浏览器打开终端里的 `Network` 地址
3. **第一次保持联网**，等页面顶部提示「离线资源已就绪」
4. 添加到主屏幕：
   - **iPhone**：Safari → 分享 →「添加到主屏幕」
   - **Android**：Chrome 菜单 →「添加到主屏幕」/「安装应用」
5. 之后点桌面图标即可用，可开飞行模式验证离线

> 固定公网：推送到 GitHub `main` 后自动发布 Pages，地址见仓库 Actions / Settings → Pages（一般为 `https://<用户名>.github.io/cimi-abacus/`）。

---

## 方式二：原生 App（Capacitor，真正安装包）

项目已生成 `ios/`、`android/` 工程，网页资源打包进 App，**安装后完全离线**。

### iPhone（本机有 Xcode）

```bash
npm run app:ios
```

在 Xcode 里：

1. 选择你的 Team（可用免费 Apple ID）
2. 用数据线连 iPhone → 选真机 → Run
3. 手机上信任开发者后，图标会固定在桌面

### Android（需安装 Android Studio）

```bash
npm run app:android
```

在 Android Studio 里 Run 到真机，或 Build → Build APK 后安装到手机。

---

## 开发

```bash
npm install
npm run dev -- --host
```

改完界面后同步进原生工程：

```bash
npm run app:sync
```

## 报价规则

- 方案一：150 元/时，加人 +30/时/人，5h 包天 750
- 方案二：200 元/时，加人 +50/时/人，5h 包天 1000
- 2h 起订；不足 30 分钟按半小时计
- 加修 10 元/张；车费、门票/其他选填
- 定金默认 100（页面展示「尾款总价」）
