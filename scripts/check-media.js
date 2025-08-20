#!/usr/bin/env node

/**
 * 媒体资源检查脚本
 * 验证基础存在性和完整性
 * @author @eclipsecybertitan
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 配置
const CONFIG = {
  assetsDir: path.join(__dirname, '../public/assets'),
  requiredDirs: ['audio', 'fonts', 'images', 'manifests'],
  requiredFiles: {
    'manifests/media.json': '媒体配置文件',
    'audio/dusk/athens_academy.mp3': 'DUSK主题音频示例',
    'audio/day/trading_floor.mp3': 'DAY主题音频示例',
    'audio/dawn/digital_future.mp3': 'DAWN主题音频示例',
    'fonts/dusk/athens-serif.woff2': 'DUSK主题字体示例',
    'fonts/day/wall-street-sans.woff2': 'DAY主题字体示例',
    'fonts/dawn/cyber-pixel.woff2': 'DAWN主题字体示例',
    'images/dusk/investment_philosophy.png': 'DUSK主题图片示例',
    'images/day/trading_scene.png': 'DAY主题图片示例',
    'images/dawn/cyber_world.png': 'DAWN主题图片示例'
  },
  optionalFiles: {
    'audio/default/dusk_default.mp3': 'DUSK默认音频',
    'audio/default/day_default.mp3': 'DAY默认音频',
    'audio/default/dawn_default.mp3': 'DAWN默认音频',
    'images/default/dusk_default.png': 'DUSK默认图片',
    'images/default/day_default.png': 'DAY默认图片',
    'images/default/dawn_default.png': 'DAWN默认图片'
  }
}

/**
 * 检查目录是否存在
 */
function checkDirectory(dirPath, dirName) {
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ 目录不存在: ${dirName}`)
    return false
  }
  
  if (!fs.statSync(dirPath).isDirectory()) {
    console.error(`❌ 不是目录: ${dirName}`)
    return false
  }
  
  console.log(`✅ 目录存在: ${dirName}`)
  return true
}

/**
 * 检查文件是否存在
 */
function checkFile(filePath, description) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${description} (${filePath})`)
    return false
  }
  
  if (!fs.statSync(filePath).isFile()) {
    console.error(`❌ 不是文件: ${description} (${filePath})`)
    return false
  }
  
  // 检查文件大小
  const stats = fs.statSync(filePath)
  const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2)
  
  console.log(`✅ 文件存在: ${description} (${sizeInMB} MB)`)
  return true
}

/**
 * 验证媒体配置文件
 */
function validateMediaConfig() {
  const configPath = path.join(CONFIG.assetsDir, 'manifests/media.json')
  
  if (!fs.existsSync(configPath)) {
    console.error('❌ 媒体配置文件不存在')
    return false
  }
  
  try {
    const configContent = fs.readFileSync(configPath, 'utf8')
    const config = JSON.parse(configContent)
    
    // 基本验证
    const requiredFields = ['version', 'music', 'fonts', 'images', 'fallbacks']
    for (const field of requiredFields) {
      if (!config[field]) {
        console.error(`❌ 配置文件缺少字段: ${field}`)
        return false
      }
    }
    
    // 主题验证
    const requiredThemes = ['dusk', 'day', 'dawn']
    for (const theme of requiredThemes) {
      if (!config.music[theme] || !config.fonts[theme] || !config.images[theme]) {
        console.error(`❌ 配置文件缺少主题: ${theme}`)
        return false
      }
    }
    
    console.log('✅ 媒体配置文件验证通过')
    return true
    
  } catch (error) {
    console.error('❌ 媒体配置文件解析失败:', error.message)
    return false
  }
}

/**
 * 检查主题资源完整性
 */
function checkThemeResources() {
  const themes = ['dusk', 'day', 'dawn']
  let allValid = true
  
  for (const theme of themes) {
    console.log(`\n🔍 检查 ${theme.toUpperCase()} 主题资源:`)
    
    // 检查音频
    const audioDir = path.join(CONFIG.assetsDir, 'audio', theme)
    if (fs.existsSync(audioDir)) {
      const audioFiles = fs.readdirSync(audioDir).filter(file => file.endsWith('.mp3'))
      console.log(`  📻 音频文件: ${audioFiles.length} 个`)
      if (audioFiles.length === 0) {
        console.warn(`  ⚠️  警告: ${theme} 主题没有音频文件`)
        allValid = false
      }
    }
    
    // 检查字体
    const fontsDir = path.join(CONFIG.assetsDir, 'fonts', theme)
    if (fs.existsSync(fontsDir)) {
      const fontFiles = fs.readdirSync(fontsDir).filter(file => file.endsWith('.woff2'))
      console.log(`  🔤 字体文件: ${fontFiles.length} 个`)
      if (fontFiles.length === 0) {
        console.warn(`  ⚠️  警告: ${theme} 主题没有字体文件`)
        allValid = false
      }
    }
    
    // 检查图片
    const imagesDir = path.join(CONFIG.assetsDir, 'images', theme)
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir).filter(file => 
        file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
      )
      console.log(`  🖼️  图片文件: ${imageFiles.length} 个`)
      if (imageFiles.length === 0) {
        console.warn(`  ⚠️  警告: ${theme} 主题没有图片文件`)
        allValid = false
      }
    }
  }
  
  return allValid
}

/**
 * 生成资源报告
 */
function generateResourceReport() {
  const report = {
    timestamp: new Date().toISOString(),
    totalSize: 0,
    fileCount: 0,
    themes: {}
  }
  
  const themes = ['dusk', 'day', 'dawn']
  
  for (const theme of themes) {
    report.themes[theme] = {
      audio: { count: 0, size: 0 },
      fonts: { count: 0, size: 0 },
      images: { count: 0, size: 0 }
    }
    
    // 统计音频
    const audioDir = path.join(CONFIG.assetsDir, 'audio', theme)
    if (fs.existsSync(audioDir)) {
      const audioFiles = fs.readdirSync(audioDir).filter(file => file.endsWith('.mp3'))
      report.themes[theme].audio.count = audioFiles.length
      
      for (const file of audioFiles) {
        const filePath = path.join(audioDir, file)
        const stats = fs.statSync(filePath)
        report.themes[theme].audio.size += stats.size
        report.totalSize += stats.size
        report.fileCount++
      }
    }
    
    // 统计字体
    const fontsDir = path.join(CONFIG.assetsDir, 'fonts', theme)
    if (fs.existsSync(fontsDir)) {
      const fontFiles = fs.readdirSync(fontsDir).filter(file => file.endsWith('.woff2'))
      report.themes[theme].fonts.count = fontFiles.length
      
      for (const file of fontFiles) {
        const filePath = path.join(fontsDir, file)
        const stats = fs.statSync(filePath)
        report.themes[theme].fonts.size += stats.size
        report.totalSize += stats.size
        report.fileCount++
      }
    }
    
    // 统计图片
    const imagesDir = path.join(CONFIG.assetsDir, 'images', theme)
    if (fs.existsSync(imagesDir)) {
      const imageFiles = fs.readdirSync(imagesDir).filter(file => 
        file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')
      )
      report.themes[theme].images.count = imageFiles.length
      
      for (const file of imageFiles) {
        const filePath = path.join(imagesDir, file)
        const stats = fs.statSync(filePath)
        report.themes[theme].images.size += stats.size
        report.totalSize += stats.size
        report.fileCount++
      }
    }
  }
  
  return report
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始检查媒体资源...\n')
  
  let allChecksPassed = true
  
  // 1. 检查基础目录结构
  console.log('📁 检查目录结构:')
  for (const dir of CONFIG.requiredDirs) {
    const dirPath = path.join(CONFIG.assetsDir, dir)
    if (!checkDirectory(dirPath, dir)) {
      allChecksPassed = false
    }
  }
  
  // 2. 检查必需文件
  console.log('\n📄 检查必需文件:')
  for (const [filePath, description] of Object.entries(CONFIG.requiredFiles)) {
    const fullPath = path.join(CONFIG.assetsDir, filePath)
    if (!checkFile(fullPath, description)) {
      allChecksPassed = false
    }
  }
  
  // 3. 检查可选文件
  console.log('\n📄 检查可选文件:')
  for (const [filePath, description] of Object.entries(CONFIG.optionalFiles)) {
    const fullPath = path.join(CONFIG.assetsDir, filePath)
    if (fs.existsSync(fullPath)) {
      checkFile(fullPath, description)
    } else {
      console.log(`⏭️  跳过: ${description} (可选文件)`)
    }
  }
  
  // 4. 验证配置文件
  console.log('\n⚙️  验证配置文件:')
  if (!validateMediaConfig()) {
    allChecksPassed = false
  }
  
  // 5. 检查主题资源
  console.log('\n🎨 检查主题资源:')
  if (!checkThemeResources()) {
    allChecksPassed = false
  }
  
  // 6. 生成报告
  const report = generateResourceReport()
  const totalSizeMB = (report.totalSize / (1024 * 1024)).toFixed(2)
  
  console.log('\n📊 资源统计报告:')
  console.log(`总文件数: ${report.fileCount}`)
  console.log(`总大小: ${totalSizeMB} MB`)
  
  for (const [theme, resources] of Object.entries(report.themes)) {
    console.log(`\n${theme.toUpperCase()} 主题:`)
    console.log(`  音频: ${resources.audio.count} 个 (${(resources.audio.size / 1024 / 1024).toFixed(2)} MB)`)
    console.log(`  字体: ${resources.fonts.count} 个 (${(resources.fonts.size / 1024 / 1024).toFixed(2)} MB)`)
    console.log(`  图片: ${resources.images.count} 个 (${(resources.images.size / 1024 / 1024).toFixed(2)} MB)`)
  }
  
  // 7. 输出结果
  console.log('\n' + '='.repeat(50))
  if (allChecksPassed) {
    console.log('🎉 所有检查通过！媒体资源准备就绪。')
    process.exit(0)
  } else {
    console.log('❌ 部分检查失败，请修复上述问题。')
    process.exit(1)
  }
}

// 运行主函数
// ES模块自动执行
main()

module.exports = {
  checkDirectory,
  checkFile,
  validateMediaConfig,
  checkThemeResources,
  generateResourceReport
}

// 开发者签名: @eclipsecybertitan
