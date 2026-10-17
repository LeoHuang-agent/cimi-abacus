#!/bin/bash
# 用法：
#   ./scripts/deploy-gitee.sh 你的Gitee用户名 [仓库名]
# 示例：
#   ./scripts/deploy-gitee.sh cimiuser cimi-abacus
set -euo pipefail

USER_NAME="${1:-}"
REPO_NAME="${2:-cimi-abacus}"

if [[ -z "$USER_NAME" ]]; then
  echo "请传入 Gitee 用户名："
  echo "  ./scripts/deploy-gitee.sh 你的用户名"
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

export VITE_BASE="/${REPO_NAME}/"
echo "==> 构建（base=${VITE_BASE}）"
npm run build

DEPLOY_DIR="$ROOT/.gitee-deploy"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -R dist/. "$DEPLOY_DIR/"

cd "$DEPLOY_DIR"
git init -b main
git add -A
git -c user.name="cimi" -c user.email="cimi@local" commit -m "deploy: gitee pages"

REMOTE="https://gitee.com/${USER_NAME}/${REPO_NAME}.git"
echo ""
echo "==> 构建完成。接下来请执行（会提示登录 Gitee）："
echo ""
echo "  cd \"$DEPLOY_DIR\""
echo "  git remote add origin ${REMOTE}"
echo "  git push -u origin main --force"
echo ""
echo "推送成功后："
echo "  1. 打开 https://gitee.com/${USER_NAME}/${REPO_NAME}"
echo "  2. 服务 → Gitee Pages → 部署分支选 main，目录选 / → 启动"
echo "  3. 访问 https://${USER_NAME}.gitee.io/${REPO_NAME}/"
echo ""
