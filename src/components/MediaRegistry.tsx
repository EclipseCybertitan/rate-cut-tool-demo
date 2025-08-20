/**
 * 媒体注册组件
 * 校验媒体清单（音乐/字体/图片）
 * 遵循RULES.md：三主题CSS变量、无内联样式、无障碍
 * @author @eclipsecybertitan
 */

import { useState, useEffect } from 'react'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  XCircleIcon,
  MusicalNoteIcon,
  DocumentTextIcon,
  PhotoIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
// import { useTheme } from '../contexts/ThemeContext'
import { mediaLoader, MediaConfig } from '../lib/media'

interface MediaRegistryProps {
  className?: string
  onValidationComplete?: (isValid: boolean) => void
  showDetails?: boolean
}

interface ValidationResult {
  type: 'audio' | 'font' | 'image'
  theme: 'dusk' | 'day' | 'dawn'
  status: 'valid' | 'warning' | 'error'
  message: string
  details?: string[]
}

export default function MediaRegistry({ 
  className = '',
  onValidationComplete,
  showDetails = false
}: MediaRegistryProps) {
  // const { theme: currentTheme } = useTheme()
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [overallStatus, setOverallStatus] = useState<'valid' | 'warning' | 'error'>('valid')
  const [config, setConfig] = useState<MediaConfig | null>(null)

  // 验证媒体资源
  const validateMediaResources = async () => {
    setIsValidating(true)
    const results: ValidationResult[] = []

    try {
      const mediaConfig = await mediaLoader.loadConfig()
      setConfig(mediaConfig)

      // 验证音频资源
      for (const [themeKey, themeData] of Object.entries(mediaConfig.music)) {
        const theme = themeKey as 'dusk' | 'day' | 'dawn'
        
        for (const track of themeData.tracks) {
          const isValid = await validateResource(track.url, 'audio')
          results.push({
            type: 'audio',
            theme,
            status: isValid ? 'valid' : 'error',
            message: isValid ? '音频文件正常' : '音频文件无法访问',
            details: [track.title, track.artist]
          })
        }
      }

      // 验证字体资源
      for (const [themeKey, themeData] of Object.entries(mediaConfig.fonts)) {
        const theme = themeKey as 'dusk' | 'day' | 'dawn'
        
        for (const font of themeData.fonts) {
          const isValid = await validateResource(font.url, 'font')
          results.push({
            type: 'font',
            theme,
            status: isValid ? 'valid' : 'error',
            message: isValid ? '字体文件正常' : '字体文件无法访问',
            details: [font.name, font.weight, font.style]
          })
        }
      }

      // 验证图片资源
      for (const [themeKey, themeData] of Object.entries(mediaConfig.images)) {
        const theme = themeKey as 'dusk' | 'day' | 'dawn'
        
        for (const image of themeData.images) {
          const isValid = await validateResource(image.url, 'image')
          results.push({
            type: 'image',
            theme,
            status: isValid ? 'valid' : 'error',
            message: isValid ? '图片文件正常' : '图片文件无法访问',
            details: [image.title, image.size, image.format]
          })
        }
      }

      // 验证回退资源
      for (const [themeKey, fallbackUrl] of Object.entries(mediaConfig.fallbacks.music)) {
        const theme = themeKey as 'dusk' | 'day' | 'dawn'
        const isValid = await validateResource(fallbackUrl, 'audio')
        results.push({
          type: 'audio',
          theme,
          status: isValid ? 'valid' : 'warning',
          message: isValid ? '回退音频正常' : '回退音频无法访问',
          details: ['回退资源']
        })
      }

    } catch (error) {
      results.push({
        type: 'audio',
        theme: 'dusk',
        status: 'error',
        message: '配置加载失败',
        details: [error instanceof Error ? error.message : '未知错误']
      })
    }

    setValidationResults(results)
    
    // 计算整体状态
    const hasErrors = results.some(r => r.status === 'error')
    const hasWarnings = results.some(r => r.status === 'warning')
    
    let overallStatus: 'valid' | 'warning' | 'error' = 'valid'
    if (hasErrors) overallStatus = 'error'
    else if (hasWarnings) overallStatus = 'warning'
    
    setOverallStatus(overallStatus)
    onValidationComplete?.(!hasErrors)
    setIsValidating(false)
  }

  // 验证单个资源
  const validateResource = async (url: string, _type: 'audio' | 'font' | 'image'): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  // 获取状态图标
  const getStatusIcon = (status: ValidationResult['status']) => {
    switch (status) {
      case 'valid':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
      case 'error':
        return <XCircleIcon className="w-5 h-5 text-red-500" />
    }
  }

  // 获取类型图标
  const getTypeIcon = (type: ValidationResult['type']) => {
    switch (type) {
      case 'audio':
        return <MusicalNoteIcon className="w-4 h-4" />
      case 'font':
        return <DocumentTextIcon className="w-4 h-4" />
      case 'image':
        return <PhotoIcon className="w-4 h-4" />
    }
  }

  // 获取主题颜色
  const getThemeColor = (themeKey: string) => {
    switch (themeKey) {
      case 'dusk':
        return 'text-purple-400'
      case 'day':
        return 'text-yellow-400'
      case 'dawn':
        return 'text-green-400'
      default:
        return 'text-gray-400'
    }
  }

  // 统计结果
  const stats = {
    total: validationResults.length,
    valid: validationResults.filter(r => r.status === 'valid').length,
    warning: validationResults.filter(r => r.status === 'warning').length,
    error: validationResults.filter(r => r.status === 'error').length
  }

  // 按主题分组结果
  const groupedResults = validationResults.reduce((acc, result) => {
    if (!acc[result.theme]) {
      acc[result.theme] = []
    }
    acc[result.theme].push(result)
    return acc
  }, {} as Record<string, ValidationResult[]>)

  useEffect(() => {
    validateMediaResources()
  }, [])

  return (
    <div className={`
      media-registry bg-[var(--color-bg-secondary)] rounded-xl p-6 border border-[var(--color-border)]
      ${className}
    `}>
      {/* 标题和状态 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <InformationCircleIcon className="w-6 h-6 text-[var(--color-accent-primary)]" />
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
            媒体资源注册表
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${overallStatus === 'valid' ? 'bg-green-100 text-green-800' : ''}
            ${overallStatus === 'warning' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${overallStatus === 'error' ? 'bg-red-100 text-red-800' : ''}
          `}>
            {overallStatus === 'valid' && '✅ 正常'}
            {overallStatus === 'warning' && '⚠️ 警告'}
            {overallStatus === 'error' && '❌ 错误'}
          </div>
          
          <button
            onClick={validateMediaResources}
            disabled={isValidating}
            className="
              px-4 py-2 bg-[var(--color-accent-primary)] text-white rounded-lg
              hover:bg-[var(--color-accent-hover)] transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="重新验证媒体资源"
          >
            {isValidating ? '验证中...' : '重新验证'}
          </button>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--color-bg-primary)] p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-[var(--color-text-primary)]">{stats.total}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">总资源</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{stats.valid}</div>
          <div className="text-sm text-green-700">正常</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
          <div className="text-sm text-yellow-700">警告</div>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{stats.error}</div>
          <div className="text-sm text-red-700">错误</div>
        </div>
      </div>

      {/* 验证结果 */}
      <div className="space-y-4">
        {Object.entries(groupedResults).map(([themeKey, results]) => (
          <div key={themeKey} className="bg-[var(--color-bg-primary)] rounded-lg p-4">
            <h3 className={`
              text-lg font-semibold mb-3 flex items-center space-x-2
              ${getThemeColor(themeKey)}
            `}>
              <span className="w-3 h-3 rounded-full bg-current"></span>
              <span>{themeKey.toUpperCase()} 主题</span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                ({results.length} 个资源)
              </span>
            </h3>
            
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={`${result.type}-${result.theme}-${index}`}
                  className="flex items-center space-x-3 p-3 bg-[var(--color-bg-secondary)] rounded-lg"
                >
                  {getStatusIcon(result.status)}
                  <div className="flex items-center space-x-2 text-[var(--color-text-secondary)]">
                    {getTypeIcon(result.type)}
                    <span className="text-sm font-medium">{result.type}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--color-text-primary)]">
                      {result.message}
                    </div>
                    {showDetails && result.details && (
                      <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                        {result.details.join(' • ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 配置信息 */}
      {config && (
        <div className="mt-6 p-4 bg-[var(--color-bg-primary)] rounded-lg">
          <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
            配置信息
          </h4>
          <div className="text-xs text-[var(--color-text-secondary)] space-y-1">
            <div>版本: {config.version}</div>
            <div>最后更新: {new Date(config.lastUpdated).toLocaleDateString()}</div>
            <div>作者: {config.author}</div>
            <div>许可证: {config.license}</div>
          </div>
        </div>
      )}

      {/* 无障碍信息 */}
      <div className="mt-4 text-xs text-[var(--color-text-secondary)] text-center">
        <span className="sr-only">
          媒体资源验证完成，共 {stats.total} 个资源，
          {stats.valid} 个正常，{stats.warning} 个警告，{stats.error} 个错误
        </span>
        验证完成 • 最后更新: {new Date().toLocaleTimeString()}
      </div>
    </div>
  )
}

// 开发者签名: @eclipsecybertitan
