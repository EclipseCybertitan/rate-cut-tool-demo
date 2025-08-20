#!/bin/bash

# 🔍 部署状态检查脚本 v1.3.2
echo "🔍 开始检查部署状态..."

# 检查Git状态
echo "📋 检查Git状态..."
CURRENT_BRANCH=$(git branch --show-current)
echo "当前分支: $CURRENT_BRANCH"

# 检查远程状态
if git status -uno | grep -q "up to date"; then
    echo "✅ 本地与远程同步"
else
    echo "⚠️ 本地与远程不同步"
fi

# 检查最新提交
LATEST_COMMIT=$(git log --oneline -1)
echo "最新提交: $LATEST_COMMIT"

# 检查GitHub连接
echo "🐙 检查GitHub连接..."
if git ls-remote origin > /dev/null 2>&1; then
    echo "✅ GitHub连接正常"
else
    echo "❌ GitHub连接失败"
fi

# 检查本地构建
echo "🏗️ 检查本地构建状态..."
if [ -d "dist" ]; then
    echo "✅ 构建目录存在"
    IMAGE_COUNT=$(find dist/images -name "*.png" 2>/dev/null | wc -l)
    echo "图片资源: $IMAGE_COUNT 个文件"
else
    echo "❌ 构建目录不存在"
fi

# 检查GitHub Actions
echo "⚙️ 检查GitHub Actions..."
if [ -d ".github/workflows" ]; then
    echo "✅ GitHub Actions配置存在"
    ls .github/workflows/
else
    echo "⚠️ GitHub Actions配置不存在"
fi

echo "🎉 部署状态检查完成！"
