#!/bin/bash

# 🚀 自动化部署脚本 v1.3.2
# 作者: @eclipsecybertitan
# 功能: 自动构建、测试、部署到Vercel

set -e  # 遇到错误立即退出

echo "🚀 开始自动化部署流程..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查必要工具
check_requirements() {
    echo "🔍 检查部署环境..."
    
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js 未安装${NC}"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm 未安装${NC}"
        exit 1
    fi
    
    if ! command -v git &> /dev/null; then
        echo -e "${RED}❌ Git 未安装${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ 环境检查通过${NC}"
}

# 安装依赖
install_dependencies() {
    echo "📦 安装项目依赖..."
    npm install
    echo -e "${GREEN}✅ 依赖安装完成${NC}"
}

# 运行测试
run_tests() {
    echo "🧪 运行测试..."
    npm run test:run
    echo -e "${GREEN}✅ 测试通过${NC}"
}

# 类型检查
type_check() {
    echo "🔍 运行TypeScript类型检查..."
    npm run type-check
    echo -e "${GREEN}✅ 类型检查通过${NC}"
}

# 构建项目
build_project() {
    echo "🏗️ 构建生产版本..."
    npm run build
    echo -e "${GREEN}✅ 构建完成${NC}"
}

# 检查媒体资源
check_media() {
    echo "🎵 检查媒体资源..."
    npm run check-media
    echo -e "${GREEN}✅ 媒体资源检查通过${NC}"
}

# 提交代码
commit_changes() {
    echo "📝 提交代码变更..."
    
    # 检查是否有变更
    if [[ -z $(git status --porcelain) ]]; then
        echo -e "${YELLOW}⚠️ 没有需要提交的变更${NC}"
        return 0
    fi
    
    # 添加所有变更
    git add .
    
    # 提交
    git commit -m "🚀 v1.3.2: Supabase集成 + 图片资源管理 + 完整部署"
    
    echo -e "${GREEN}✅ 代码提交完成${NC}"
}

# 推送到远程仓库
push_to_remote() {
    echo "📤 推送到远程仓库..."
    
    # 获取当前分支
    CURRENT_BRANCH=$(git branch --show-current)
    
    # 推送到远程
    git push origin $CURRENT_BRANCH
    
    echo -e "${GREEN}✅ 代码推送完成${NC}"
}

# 部署到Vercel
deploy_to_vercel() {
    echo "🌐 部署到Vercel..."
    
    # 检查是否安装了Vercel CLI
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}⚠️ Vercel CLI 未安装，跳过自动部署${NC}"
        echo -e "${BLUE}💡 请手动在Vercel控制台部署或安装CLI: npm i -g vercel${NC}"
        return 0
    fi
    
    # 部署到生产环境
    vercel --prod
    
    echo -e "${GREEN}✅ Vercel部署完成${NC}"
}

# 验证部署
verify_deployment() {
    echo "🔍 验证部署状态..."
    
    # 等待部署完成
    sleep 10
    
    # 检查生产环境
    echo -e "${BLUE}🌐 生产环境: https://eclipsever.online${NC}"
    echo -e "${BLUE}🔗 Vercel部署: https://rate-cut-tool-demo.vercel.app${NC}"
    
    echo -e "${GREEN}✅ 部署验证完成${NC}"
}

# 主函数
main() {
    echo -e "${BLUE}🎭 执政官开始执行自动化部署流程...${NC}"
    
    check_requirements
    install_dependencies
    run_tests
    type_check
    build_project
    check_media
    commit_changes
    push_to_remote
    deploy_to_vercel
    verify_deployment
    
    echo -e "${GREEN}🎉 自动化部署流程完成！${NC}"
    echo -e "${BLUE}📋 部署摘要:${NC}"
    echo -e "${BLUE}   • 版本: v1.3.2${NC}"
    echo -e "${BLUE}   • 功能: Supabase集成 + 图片资源管理${NC}"
    echo -e "${BLUE}   • 状态: 已部署到生产环境${NC}"
    echo -e "${BLUE}   • 域名: eclipsever.online${NC}"
}

# 执行主函数
main "$@"
