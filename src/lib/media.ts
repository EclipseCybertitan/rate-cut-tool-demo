import { z } from 'zod'

/**
 * 媒体资源配置库
 * 支持加载、校验、回退功能
 * @author @eclipsecybertitan
 */

// Zod 校验 Schema
const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  url: z.string().url(),
  duration: z.string(),
  mood: z.string(),
  license: z.string()
})

const FontSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  weight: z.string(),
  style: z.string(),
  license: z.string()
})

const ImageSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
  alt: z.string(),
  size: z.string(),
  format: z.string(),
  license: z.string()
})

const ThemeMusicSchema = z.object({
  name: z.string(),
  description: z.string(),
  tracks: z.array(TrackSchema)
})

const ThemeFontsSchema = z.object({
  name: z.string(),
  description: z.string(),
  fonts: z.array(FontSchema)
})

const ThemeImagesSchema = z.object({
  name: z.string(),
  description: z.string(),
  images: z.array(ImageSchema)
})

const FallbacksSchema = z.object({
  music: z.record(z.string()),
  fonts: z.record(z.string()),
  images: z.record(z.string())
})

const MediaConfigSchema = z.object({
  version: z.string(),
  lastUpdated: z.string(),
  description: z.string(),
  license: z.string(),
  author: z.string(),
  music: z.record(ThemeMusicSchema),
  fonts: z.record(ThemeFontsSchema),
  images: z.record(ThemeImagesSchema),
  fallbacks: FallbacksSchema,
  metadata: z.object({
    totalTracks: z.number(),
    totalFonts: z.number(),
    totalImages: z.number(),
    supportedThemes: z.array(z.string()),
    updateFrequency: z.string(),
    cdnEnabled: z.boolean(),
    compressionEnabled: z.boolean()
  })
})

export type MediaConfig = z.infer<typeof MediaConfigSchema>
export type Theme = 'dusk' | 'day' | 'dawn'

/**
 * 媒体加载器类
 */
export class MediaLoader {
  private config: MediaConfig | null = null
  private cache = new Map<string, any>()
  private loading = false
  private error: Error | null = null

  /**
   * 加载媒体配置
   */
  async loadConfig(): Promise<MediaConfig> {
    if (this.config) {
      return this.config
    }

    if (this.loading) {
      throw new Error('配置正在加载中')
    }

    this.loading = true
    this.error = null

    try {
      const response = await fetch('/assets/manifests/media.json')
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      
      // Zod 校验
      this.config = MediaConfigSchema.parse(data)
      
      return this.config
    } catch (error) {
      this.error = error instanceof Error ? error : new Error('未知错误')
      throw this.error
    } finally {
      this.loading = false
    }
  }

  /**
   * 获取主题音乐
   */
  async getThemeMusic(theme: Theme): Promise<z.infer<typeof TrackSchema>[]> {
    const config = await this.loadConfig()
    return config.music[theme]?.tracks || []
  }

  /**
   * 获取主题字体
   */
  async getThemeFonts(theme: Theme): Promise<z.infer<typeof FontSchema>[]> {
    const config = await this.loadConfig()
    return config.fonts[theme]?.fonts || []
  }

  /**
   * 获取主题图片
   */
  async getThemeImages(theme: Theme): Promise<z.infer<typeof ImageSchema>[]> {
    const config = await this.loadConfig()
    return config.images[theme]?.images || []
  }

  /**
   * 获取回退资源
   */
  async getFallback(type: 'music' | 'fonts' | 'images', theme: Theme): Promise<string> {
    const config = await this.loadConfig()
    return config.fallbacks[type][theme] || ''
  }

  /**
   * 预加载资源
   */
  async preloadResources(theme: Theme): Promise<void> {
    const [music, fonts, images] = await Promise.all([
      this.getThemeMusic(theme),
      this.getThemeFonts(theme),
      this.getThemeImages(theme)
    ])

    // 预加载音频
    for (const track of music) {
      this.preloadAudio(track.url)
    }

    // 预加载字体
    for (const font of fonts) {
      this.preloadFont(font.url, font.name)
    }

    // 预加载图片
    for (const image of images) {
      this.preloadImage(image.url)
    }
  }

  /**
   * 预加载音频
   */
  private preloadAudio(url: string): void {
    if (this.cache.has(url)) return

    const audio = new Audio()
    audio.preload = 'metadata'
    audio.src = url
    
    audio.addEventListener('canplaythrough', () => {
      this.cache.set(url, audio)
    })

    audio.addEventListener('error', () => {
      console.warn(`音频加载失败: ${url}`)
    })
  }

  /**
   * 预加载字体
   */
  private preloadFont(url: string, fontFamily: string): void {
    if (this.cache.has(url)) return

    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = url
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    
    document.head.appendChild(link)

    // 创建字体对象
    const font = new FontFace(fontFamily, `url(${url})`)
    
    font.load().then(() => {
      document.fonts.add(font)
      this.cache.set(url, font)
    }).catch((error) => {
      console.warn(`字体加载失败: ${url}`, error)
    })
  }

  /**
   * 预加载图片
   */
  private preloadImage(url: string): void {
    if (this.cache.has(url)) return

    const img = new Image()
    img.src = url
    
    img.addEventListener('load', () => {
      this.cache.set(url, img)
    })

    img.addEventListener('error', () => {
      console.warn(`图片加载失败: ${url}`)
    })
  }

  /**
   * 清理缓存
   */
  clearCache(): void {
    this.cache.clear()
  }

  /**
   * 获取缓存状态
   */
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    }
  }

  /**
   * 检查资源可用性
   */
  async checkResourceAvailability(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  /**
   * 获取加载状态
   */
  getLoadingStatus(): { loading: boolean; error: Error | null } {
    return {
      loading: this.loading,
      error: this.error
    }
  }
}

/**
 * 媒体工具函数
 */
export const mediaUtils = {
  /**
   * 格式化时长
   */
  formatDuration(duration: string): string {
    return duration
  },

  /**
   * 获取文件大小
   */
  async getFileSize(url: string): Promise<string> {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      const size = response.headers.get('content-length')
      if (size) {
        const bytes = parseInt(size, 10)
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      }
      return '未知'
    } catch {
      return '未知'
    }
  },

  /**
   * 验证URL格式
   */
  isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  },

  /**
   * 获取文件扩展名
   */
  getFileExtension(url: string): string {
    return url.split('.').pop()?.toLowerCase() || ''
  }
}

// 创建全局实例
export const mediaLoader = new MediaLoader()

// 开发者签名: @eclipsecybertitan
