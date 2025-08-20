import { mediaLoader, Theme } from './media'

/**
 * 字体管理库
 * 支持@font-face注入和主题字体切换
 * @author @eclipsecybertitan
 */

/**
 * 字体注入器类
 */
export class FontInjector {
  private injectedFonts = new Set<string>()
  private currentTheme: Theme | null = null

  /**
   * 注入主题字体
   */
  async injectThemeFonts(theme: Theme): Promise<void> {
    if (this.currentTheme === theme) {
      return
    }

    try {
      const fonts = await mediaLoader.getThemeFonts(theme)
      
      // 移除旧主题字体
      if (this.currentTheme) {
        this.removeThemeFonts(this.currentTheme)
      }

      // 注入新主题字体
      for (const font of fonts) {
        await this.injectFont(font)
      }

      this.currentTheme = theme
      
      // 更新CSS变量
      this.updateFontCSSVariables(theme, fonts)
      
    } catch (error) {
      console.error(`字体注入失败: ${error}`)
      // 使用回退字体
      await this.useFallbackFonts(theme)
    }
  }

  /**
   * 注入单个字体
   */
  private async injectFont(font: any): Promise<void> {
    const fontId = `${font.id}_${font.weight}_${font.style}`
    
    if (this.injectedFonts.has(fontId)) {
      return
    }

    try {
      // 创建@font-face规则
      const fontFace = new FontFace(font.name, `url(${font.url})`, {
        weight: font.weight,
        style: font.style,
        display: 'swap'
      })

      // 加载字体
      const loadedFont = await fontFace.load()
      
      // 添加到文档字体集
      document.fonts.add(loadedFont)
      
      // 记录已注入的字体
      this.injectedFonts.add(fontId)
      
      console.log(`字体注入成功: ${font.name}`)
      
    } catch (error) {
      console.error(`字体注入失败: ${font.name}`, error)
      throw error
    }
  }

  /**
   * 移除主题字体
   */
  private removeThemeFonts(theme: Theme): void {
    // 这里可以实现字体移除逻辑
    // 但通常不建议动态移除字体，因为可能影响用户体验
    console.log(`准备切换字体主题: ${theme}`)
  }

  /**
   * 使用回退字体
   */
  private async useFallbackFonts(theme: Theme): Promise<void> {
    try {
      const fallbackFont = await mediaLoader.getFallback('fonts', theme)
      
      if (fallbackFont) {
        // 使用系统回退字体
        this.updateFontCSSVariables(theme, [], fallbackFont)
      }
    } catch (error) {
      console.error('回退字体设置失败:', error)
    }
  }

  /**
   * 更新CSS变量
   */
  private updateFontCSSVariables(theme: Theme, fonts: any[], fallbackFont?: string): void {
    const root = document.documentElement
    
    if (fonts.length > 0) {
      // 设置主题字体
      const primaryFont = fonts.find(f => f.weight === '400') || fonts[0]
      const displayFont = fonts.find(f => f.weight === '700') || fonts[0]
      const monoFont = fonts.find(f => f.style === 'monospace') || fonts[0]
      
      root.style.setProperty('--font-primary', `"${primaryFont?.name}", ${fallbackFont || 'serif'}`)
      root.style.setProperty('--font-display', `"${displayFont?.name}", ${fallbackFont || 'serif'}`)
      root.style.setProperty('--font-mono', `"${monoFont?.name}", ${fallbackFont || 'monospace'}`)
      
    } else if (fallbackFont) {
      // 使用回退字体
      root.style.setProperty('--font-primary', fallbackFont)
      root.style.setProperty('--font-display', fallbackFont)
      root.style.setProperty('--font-mono', fallbackFont)
    }
    
    // 设置字体主题标识
    root.style.setProperty('--font-theme', theme)
  }

  /**
   * 预加载字体
   */
  async preloadFonts(theme: Theme): Promise<void> {
    try {
      const fonts = await mediaLoader.getThemeFonts(theme)
      
      for (const font of fonts) {
        this.preloadFont(font)
      }
    } catch (error) {
      console.error('字体预加载失败:', error)
    }
  }

  /**
   * 预加载单个字体
   */
  private preloadFont(font: any): void {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = font.url
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    
    document.head.appendChild(link)
  }

  /**
   * 检查字体是否可用
   */
  async checkFontAvailability(fontName: string): Promise<boolean> {
    try {
      await document.fonts.ready
      return document.fonts.check(`12px "${fontName}"`)
    } catch {
      return false
    }
  }

  /**
   * 获取已注入字体列表
   */
  getInjectedFonts(): string[] {
    return Array.from(this.injectedFonts)
  }

  /**
   * 获取当前字体主题
   */
  getCurrentTheme(): Theme | null {
    return this.currentTheme
  }

  /**
   * 清理字体缓存
   */
  clearCache(): void {
    this.injectedFonts.clear()
    this.currentTheme = null
  }
}

/**
 * 字体工具函数
 */
export const fontUtils = {
  /**
   * 格式化字体权重
   */
  formatWeight(weight: string): string {
    const weightMap: Record<string, string> = {
      '100': 'Thin',
      '200': 'Extra Light',
      '300': 'Light',
      '400': 'Regular',
      '500': 'Medium',
      '600': 'Semi Bold',
      '700': 'Bold',
      '800': 'Extra Bold',
      '900': 'Black'
    }
    
    return weightMap[weight] || weight
  },

  /**
   * 格式化字体样式
   */
  formatStyle(style: string): string {
    const styleMap: Record<string, string> = {
      'normal': 'Normal',
      'italic': 'Italic',
      'oblique': 'Oblique'
    }
    
    return styleMap[style] || style
  },

  /**
   * 获取字体CSS属性
   */
  getFontCSS(fontFamily: string, weight: string = '400', style: string = 'normal'): string {
    return `font-family: "${fontFamily}", serif; font-weight: ${weight}; font-style: ${style};`
  },

  /**
   * 创建字体预览文本
   */
  getFontPreviewText(fontName: string): string {
    const previews = {
      'Athens Serif': 'The quick brown fox jumps over the lazy dog',
      'Academy Display': 'INVESTMENT PHILOSOPHY',
      'Wall Street Sans': 'Financial Markets Analysis',
      'Trading Mono': 'BTC: $45,000 | ETH: $3,200',
      'Cyber Pixel': 'DIGITAL ASSETS 2.0',
      'Future Tech': 'AI-POWERED INVESTMENT'
    }
    
    return previews[fontName as keyof typeof previews] || 'Sample Text'
  }
}

/**
 * 字体性能监控
 */
export class FontPerformanceMonitor {
  private metrics: Map<string, number> = new Map()

  /**
   * 开始监控字体加载
   */
  startMonitoring(): void {
    document.fonts.addEventListener('loading', this.handleFontLoading.bind(this))
    document.fonts.addEventListener('loadingdone', this.handleFontLoaded.bind(this))
  }

  /**
   * 处理字体开始加载
   */
  private handleFontLoading(event: any): void {
    const startTime = performance.now()
    this.metrics.set(event.target.family, startTime)
  }

  /**
   * 处理字体加载完成
   */
  private handleFontLoaded(event: any): void {
    const endTime = performance.now()
    const startTime = this.metrics.get(event.target.family)
    
    if (startTime) {
      const loadTime = endTime - startTime
      console.log(`字体加载时间: ${event.target.family} - ${loadTime.toFixed(2)}ms`)
      
      // 记录性能指标
      this.recordMetric(event.target.family, loadTime)
    }
  }

  /**
   * 记录性能指标
   */
  private recordMetric(fontFamily: string, loadTime: number): void {
    // 这里可以发送到分析服务
    if (loadTime > 1000) {
      console.warn(`字体加载缓慢: ${fontFamily} - ${loadTime}ms`)
    }
  }

  /**
   * 获取性能报告
   */
  getPerformanceReport(): Record<string, number> {
    return Object.fromEntries(this.metrics)
  }
}

// 创建全局实例
export const fontInjector = new FontInjector()
export const fontMonitor = new FontPerformanceMonitor()

// 启动字体监控
fontMonitor.startMonitoring()

// 开发者签名: @eclipsecybertitan
