#!/bin/bash

# 🚀 版本1.3.0 部署脚本
# 支持 Vercel 和 Netlify 部署
# @author @eclipsecybertitan

set -e

echo "🚀 开始部署 版本1.3.0..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查依赖
check_dependencies() {
    echo "🔍 检查部署依赖..."
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ git 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 依赖检查通过${NC}"
}

# 构建项目
build_project() {
    echo "🔨 构建生产版本..."
    
    # 清理之前的构建
    if [ -d "dist" ]; then
        rm -rf dist
        echo "🧹 清理旧的构建文件"
    fi
    
    # 安装依赖
    echo "📦 安装依赖..."
    npm install
    
    # 类型检查
    echo "🔍 类型检查..."
    npm run type-check
    
    # 构建
    echo "🏗️ 构建项目..."
    npm run build
    
    echo -e "${GREEN}✅ 构建完成${NC}"
}

# 媒体资源检查
check_media() {
    echo "🎵 检查媒体资源..."
    npm run check-media
    echo -e "${GREEN}✅ 媒体资源检查通过${NC}"
}

# 测试
run_tests() {
    echo "🧪 运行测试..."
    npm run test:run
    echo -e "${GREEN}✅ 测试通过${NC}"
}

# Vercel 部署
deploy_vercel() {
    echo "🚀 部署到 Vercel..."
    
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}⚠️  Vercel CLI 未安装，跳过 Vercel 部署${NC}"
        echo "   安装命令: npm i -g vercel"
        return 1
    fi
    
    # 检查是否已登录
    if ! vercel whoami &> /dev/null; then
        echo -e "${YELLOW}⚠️  请先登录 Vercel: vercel login${NC}"
        return 1
    fi
    
    echo "📤 部署到 Vercel..."
    vercel --prod
    
    echo -e "${GREEN}✅ Vercel 部署完成${NC}"
}

# Netlify 部署
deploy_netlify() {
    echo "🚀 部署到 Netlify..."
    
    if ! command -v netlify &> /dev/null; then
        echo -e "${YELLOW}⚠️  Netlify CLI 未安装，跳过 Netlify 部署${NC}"
        echo "   安装命令: npm i -g netlify-cli"
        return 1
    fi
    
    # 检查是否已登录
    if ! netlify status &> /dev/null; then
        echo -e "${YELLOW}⚠️  请先登录 Netlify: netlify login${NC}"
        return 1
    fi
    
    echo "📤 部署到 Netlify..."
    netlify deploy --prod --dir=dist
    
    echo -e "${GREEN}✅ Netlify 部署完成${NC}"
}

# 本地预览
preview_local() {
    echo "👀 本地预览..."
    echo -e "${BLUE}🌐 访问地址: http://localhost:4173${NC}"
    echo -e "${BLUE}📱 按 Ctrl+C 停止预览${NC}"
    
    npm run preview
}

# 主函数
main() {
    echo "🎭 执政官部署脚本 v1.3.0"
    echo "=================================="
    
    # 检查依赖
    check_dependencies
    
    # 构建项目
    build_project
    
    # 检查媒体资源
    check_media
    
    # 运行测试
    run_tests
    
    echo ""
    echo "🎉 部署准备完成！"
    echo ""
    echo "选择部署方式:"
    echo "1) Vercel 部署"
    echo "2) Netlify 部署"
    echo "3) 本地预览"
    echo "4) 仅构建（不部署）"
    echo ""
    
    read -p "请输入选择 (1-4): " choice
    
    case $choice in
        1)
            deploy_vercel
            ;;
        2)
            deploy_netlify
            ;;
        3)
            preview_local
            ;;
        4)
            echo "✅ 构建完成，未进行部署"
            ;;
        *)
            echo -e "${RED}❌ 无效选择${NC}"
            exit 1
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}🎉 部署流程完成！${NC}"
    echo ""
    echo "📋 部署信息:"
    echo "   版本: 1.3.0"
    echo "   构建时间: $(date)"
    echo "   构建目录: dist/"
    echo "   包大小: $(du -sh dist/ | cut -f1)"
}

# 运行主函数
main "$@"
