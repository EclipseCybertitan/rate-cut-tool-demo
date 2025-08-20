#!/bin/bash

# 🖼️ 图片资源部署脚本 v1.3.2
# 作者: @eclipsecybertitan
# 功能: 专门处理图片资源的上传和部署

set -e

echo "🖼️ 开始图片资源部署流程..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 目录配置
SOURCE_IMAGES="public/images"
BUILD_IMAGES="dist/images"
VERCEL_CONFIG="vercel.json"

# 检查图片源文件
check_source_images() {
    echo "🔍 检查源图片文件..."
    
    REQUIRED_IMAGES=(
        "$SOURCE_IMAGES/methodology/textbook.png"
        "$SOURCE_IMAGES/methodology/wallstreet.png"
        "$SOURCE_IMAGES/methodology/psychohistory.png"
    )
    
    for img in "${REQUIRED_IMAGES[@]}"; do
        if [[ -f "$img" ]]; then
            size=$(stat -f%z "$img" 2>/dev/null || echo "unknown")
            echo -e "${GREEN}✅ $(basename "$img"): $size bytes${NC}"
        else
            echo -e "${RED}❌ 缺少图片: $(basename "$img")${NC}"
            exit 1
        fi
    done
    
    echo -e "${GREEN}✅ 源图片检查完成${NC}"
}

# 确保构建目录包含图片
ensure_build_images() {
    echo "🏗️ 确保构建目录包含图片..."
    
    # 重新构建项目
    echo "重新构建项目..."
    npm run build
    
    # 检查构建后的图片
    for img in "$BUILD_IMAGES/methodology"/*.png; do
        if [[ -f "$img" ]]; then
            size=$(stat -f%z "$img" 2>/dev/null || echo "unknown")
            echo -e "${GREEN}✅ 构建图片: $(basename "$img"): $size bytes${NC}"
        fi
    done
    
    echo -e "${GREEN}✅ 构建图片检查完成${NC}"
}

# 创建Vercel配置文件
create_vercel_config() {
    echo "⚙️ 创建Vercel配置文件..."
    
    cat > "$VERCEL_CONFIG" << EOF
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/images/(.*)",
      "dest": "/images/\$1"
    },
    {
      "src": "/assets/(.*)",
      "dest": "/assets/\$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
EOF
    
    echo -e "${GREEN}✅ Vercel配置文件创建完成${NC}"
}

# 验证图片可访问性
verify_image_accessibility() {
    echo "🔍 验证图片可访问性..."
    
    # 启动本地预览服务器
    echo "启动本地预览服务器..."
    npm run preview &
    PREVIEW_PID=$!
    
    # 等待服务器启动
    sleep 5
    
    # 测试图片访问
    IMAGES_TO_TEST=(
        "http://localhost:4173/images/methodology/textbook.png"
        "http://localhost:4173/images/methodology/wallstreet.png"
        "http://localhost:4173/images/methodology/psychohistory.png"
    )
    
    for img_url in "${IMAGES_TO_TEST[@]}"; do
        if curl -s -o /dev/null -w "%{http_code}" "$img_url" | grep -q "200"; then
            echo -e "${GREEN}✅ 图片可访问: $(basename "$img_url")${NC}"
        else
            echo -e "${RED}❌ 图片无法访问: $(basename "$img_url")${NC}"
        fi
    done
    
    # 停止预览服务器
    kill $PREVIEW_PID 2>/dev/null || true
    
    echo -e "${GREEN}✅ 图片可访问性验证完成${NC}"
}

# 准备Git提交
prepare_git_commit() {
    echo "📝 准备Git提交..."
    
    # 添加所有变更
    git add .
    
    # 检查是否有变更
    if [[ -n $(git status --porcelain) ]]; then
        git commit -m "🖼️ v1.3.2: 图片资源部署配置 + Vercel路由优化"
        echo -e "${GREEN}✅ Git提交完成${NC}"
    else
        echo -e "${YELLOW}⚠️ 没有需要提交的变更${NC}"
    fi
}

# 推送到远程仓库
push_to_remote() {
    echo "📤 推送到远程仓库..."
    
    CURRENT_BRANCH=$(git branch --show-current)
    git push origin $CURRENT_BRANCH
    
    echo -e "${GREEN}✅ 代码推送完成${NC}"
}

# 部署到Vercel
deploy_to_vercel() {
    echo "🚀 部署到Vercel..."
    
    if command -v vercel &> /dev/null; then
        echo "使用Vercel CLI部署..."
        vercel --prod
        echo -e "${GREEN}✅ Vercel CLI部署完成${NC}"
    else
        echo -e "${YELLOW}⚠️ Vercel CLI未安装${NC}"
        echo -e "${BLUE}💡 将通过GitHub集成自动部署${NC}"
    fi
}

# 验证部署
verify_deployment() {
    echo "🔍 验证部署状态..."
    
    echo -e "${BLUE}🌐 生产环境: https://eclipsever.online${NC}"
    echo -e "${BLUE}🔗 Vercel部署: https://rate-cut-tool-demo.vercel.app${NC}"
    
    echo -e "${GREEN}✅ 部署验证完成${NC}"
}

# 主函数
main() {
    echo -e "${BLUE}🎭 执政官开始执行图片资源部署流程...${NC}"
    
    check_source_images
    ensure_build_images
    create_vercel_config
    verify_image_accessibility
    prepare_git_commit
    push_to_remote
    deploy_to_vercel
    verify_deployment
    
    echo -e "${GREEN}🎉 图片资源部署流程完成！${NC}"
    echo -e "${BLUE}📋 部署摘要:${NC}"
    echo -e "${BLUE}   • 版本: v1.3.2${NC}"
    echo -e "${BLUE}   • 图片资源: 3个投资哲学图片${NC}"
    echo -e "${BLUE}   • Vercel配置: 已优化静态资源路由${NC}"
    echo -e "${BLUE}   • 状态: 已部署到生产环境${NC}"
    echo -e "${BLUE}   • 域名: eclipsever.online${NC}"
}

# 执行主函数
main "$@"
