# Gitee Pages 固定链接（国内免费）

## 前置

1. 打开 https://gitee.com 注册/登录（通常要**手机实名认证**才能开 Pages）
2. 新建仓库：
   - 仓库名填：`cimi-abacus`（建议用这个，已和构建路径对齐）
   - 可设为**公开**
   - **不要**勾选「使用 Readme 初始化」（空仓库最省事）

## 一键构建并准备推送

在终端执行（把 `你的用户名` 换成 Gitee 用户名）：

```bash
cd "/Users/ww/Cimi小算盘"
chmod +x scripts/deploy-gitee.sh
./scripts/deploy-gitee.sh 你的用户名
```

按脚本提示再执行 `git remote add` 和 `git push`（会要你输入 Gitee 账号密码或私人令牌）。

## 开启 Pages

1. 打开你的仓库页面  
2. 上方 **服务** → **Gitee Pages**  
3. 部署分支：`main`，目录：`/`  
4. 点 **启动**  
5. 打开给出的地址，一般是：

`https://你的用户名.gitee.io/cimi-abacus/`

## 手机安装

Safari 打开上面的链接 → 分享 → **添加到主屏幕**。

## 更新网站

改完代码后再跑一遍：

```bash
./scripts/deploy-gitee.sh 你的用户名
# 然后在 .gitee-deploy 里再 push
```

## 如果开不了 Pages

Gitee 有时要求实名，或 Pages 审核较慢。可改用腾讯云静态托管免费额度，或继续用电脑局域网调试。
