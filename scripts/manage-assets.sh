#!/bin/bash

# 🖼️ 图片资源管理脚本 v1.3.2
# 作者: @eclipsecybertitan
# 功能: 自动管理图片、音频、视频资源的上传和部署

set -e

echo "🖼️ 开始图片资源管理流程..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 资源目录配置
ASSETS_DIR="public/assets"
IMAGES_DIR="$ASSETS_DIR/images"
AUDIO_DIR="$ASSETS_DIR/audio"
VIDEO_DIR="$ASSETS_DIR/video"
MANIFESTS_DIR="$ASSETS_DIR/manifests"

# 检查资源目录结构
check_directories() {
    echo "🔍 检查资源目录结构..."
    
    # 创建必要的目录
    mkdir -p "$IMAGES_DIR/methodology"
    mkdir -p "$IMAGES_DIR/philosophy"
    mkdir -p "$AUDIO_DIR/dusk"
    mkdir -p "$AUDIO_DIR/day"
    mkdir -p "$AUDIO_DIR/dawn"
    mkdir -p "$VIDEO_DIR"
    mkdir -p "$MANIFESTS_DIR"
    
    echo -e "${GREEN}✅ 目录结构检查完成${NC}"
}

# 扫描新资源文件
scan_new_assets() {
    echo "🔍 扫描新资源文件..."
    
    # 检查是否有新的图片文件
    NEW_IMAGES=$(find "$IMAGES_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.gif" -o -name "*.webp" 2>/dev/null | head -10)
    
    if [[ -n "$NEW_IMAGES" ]]; then
        echo -e "${BLUE}📸 发现图片文件:${NC}"
        echo "$NEW_IMAGES"
    fi
    
    # 检查是否有新的音频文件
    NEW_AUDIO=$(find "$AUDIO_DIR" -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" -o -name "*.m4a" 2>/dev/null | head -10)
    
    if [[ -n "$NEW_AUDIO" ]]; then
        echo -e "${BLUE}🎵 发现音频文件:${NC}"
        echo "$NEW_AUDIO"
    fi
    
    # 检查是否有新的视频文件
    NEW_VIDEO=$(find "$VIDEO_DIR" -name "*.mp4" -o -name "*.webm" -o -name "*.avi" -o -name "*.mov" 2>/dev/null | head -10)
    
    if [[ -n "$NEW_VIDEO" ]]; then
        echo -e "${BLUE}🎬 发现视频文件:${NC}"
        echo "$NEW_VIDEO"
    fi
    
    echo -e "${GREEN}✅ 资源扫描完成${NC}"
}

# 验证图片资源
validate_images() {
    echo "🔍 验证图片资源..."
    
    # 检查投资哲学页面的必要图片
    REQUIRED_IMAGES=(
        "$IMAGES_DIR/methodology/textbook.png"
        "$IMAGES_DIR/methodology/wallstreet.png"
        "$IMAGES_DIR/methodology/psychohistory.png"
    )
    
    MISSING_IMAGES=()
    
    for img in "${REQUIRED_IMAGES[@]}"; do
        if [[ ! -f "$img" ]]; then
            MISSING_IMAGES+=("$img")
        fi
    done
    
    if [[ ${#MISSING_IMAGES[@]} -gt 0 ]]; then
        echo -e "${YELLOW}⚠️ 缺少必要图片:${NC}"
        for img in "${MISSING_IMAGES[@]}"; do
            echo "   - $img"
        done
        echo -e "${BLUE}💡 请将图片文件放入对应目录${NC}"
    else
        echo -e "${GREEN}✅ 所有必要图片已就绪${NC}"
    fi
}

# 优化图片资源
optimize_images() {
    echo "🔄 优化图片资源..."
    
    # 检查是否有图片优化工具
    if command -v convert &> /dev/null; then
        echo "使用ImageMagick优化图片..."
        
        # 优化PNG图片
        find "$IMAGES_DIR" -name "*.png" -exec convert {} -strip -quality 85 {} \;
        
        echo -e "${GREEN}✅ 图片优化完成${NC}"
    else
        echo -e "${YELLOW}⚠️ ImageMagick未安装，跳过图片优化${NC}"
        echo -e "${BLUE}💡 安装命令: brew install imagemagick (macOS) 或 apt-get install imagemagick (Ubuntu)${NC}"
    fi
}

# 生成资源清单
generate_manifest() {
    echo "📋 生成资源清单..."
    
    MANIFEST_FILE="$MANIFESTS_DIR/assets.json"
    
    # 创建资源清单
    cat > "$MANIFEST_FILE" << EOF
{
  "version": "1.3.2",
  "lastUpdated": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "images": {
    "methodology": {
      "academic": {
        "file": "textbook.png",
        "path": "/images/methodology/textbook.png",
        "size": "$(stat -f%z "$IMAGES_DIR/methodology/textbook.png" 2>/dev/null || echo "unknown")",
        "type": "image/png"
      },
      "business": {
        "file": "wallstreet.png",
        "path": "/images/methodology/wallstreet.png",
        "size": "$(stat -f%z "$IMAGES_DIR/methodology/wallstreet.png" 2>/dev/null || echo "unknown")",
        "type": "image/png"
      },
      "psychologic": {
        "file": "psychohistory.png",
        "path": "/images/methodology/psychohistory.png",
        "size": "$(stat -f%z "$IMAGES_DIR/methodology/psychohistory.png" 2>/dev/null || echo "unknown")",
        "type": "image/png"
      }
    }
  },
  "audio": {
    "dusk": {
      "count": $(find "$AUDIO_DIR/dusk" -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" 2>/dev/null | wc -l | tr -d ' ')
    },
    "day": {
      "count": $(find "$AUDIO_DIR/day" -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" 2>/dev/null | wc -l | tr -d ' ')
    },
    "dawn": {
      "count": $(find "$AUDIO_DIR/dawn" -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" 2>/dev/null | wc -l | tr -d ' ')
    }
  },
  "video": {
    "count": $(find "$VIDEO_DIR" -name "*.mp4" -o -name "*.webm" -o -name "*.avi" -o -name "*.mov" 2>/dev/null | wc -l | tr -d ' ')
  }
}
EOF
    
    echo -e "${GREEN}✅ 资源清单生成完成: $MANIFEST_FILE${NC}"
}

# 检查资源完整性
check_integrity() {
    echo "🔍 检查资源完整性..."
    
    # 检查图片文件大小
    echo "📸 图片资源状态:"
    for img in "$IMAGES_DIR/methodology"/*.png; do
        if [[ -f "$img" ]]; then
            size=$(stat -f%z "$img" 2>/dev/null || echo "unknown")
            echo "   - $(basename "$img"): $size bytes"
        fi
    done
    
    # 检查音频文件
    echo "🎵 音频资源状态:"
    for theme in dusk day dawn; do
        count=$(find "$AUDIO_DIR/$theme" -name "*.mp3" -o -name "*.wav" -o -name "*.ogg" 2>/dev/null | wc -l | tr -d ' ')
        echo "   - $theme: $count 个文件"
    done
    
    echo -e "${GREEN}✅ 资源完整性检查完成${NC}"
}

# 部署准备
prepare_deployment() {
    echo "🚀 准备部署..."
    
    # 运行媒体资源检查
    if npm run check-media &> /dev/null; then
        echo -e "${GREEN}✅ 媒体资源检查通过${NC}"
    else
        echo -e "${YELLOW}⚠️ 媒体资源检查失败，但继续部署${NC}"
    fi
    
    # 构建项目
    echo "🏗️ 构建项目..."
    npm run build
    
    echo -e "${GREEN}✅ 部署准备完成${NC}"
}

# 主函数
main() {
    echo -e "${BLUE}🎭 执政官开始执行资源管理流程...${NC}"
    
    check_directories
    scan_new_assets
    validate_images
    optimize_images
    generate_manifest
    check_integrity
    prepare_deployment
    
    echo -e "${GREEN}🎉 资源管理流程完成！${NC}"
    echo -e "${BLUE}📋 下一步操作:${NC}"
    echo -e "${BLUE}   1. 运行部署脚本: ./scripts/deploy.sh${NC}"
    echo -e "${BLUE}   2. 或手动推送到GitHub触发Vercel部署${NC}"
    echo -e "${BLUE}   3. 验证生产环境: https://eclipsever.online${NC}"
}

# 执行主函数
main "$@"
