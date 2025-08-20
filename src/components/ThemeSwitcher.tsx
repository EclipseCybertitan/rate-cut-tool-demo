import { useState, useEffect } from 'react'
import { 
  SunIcon, 
  MoonIcon, 
  ComputerDesktopIcon 
} from '@heroicons/react/24/outline'

export type Theme = 'dusk' | 'day' | 'dawn'

interface ThemeSwitcherProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * 主题切换器组件
 * @param props 组件属性
 * @returns JSX元素
 * @author @eclipsecybertitan
 */
export default function ThemeSwitcher({ 
  className = '', 
  size = 'md' 
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>('dusk')
  const [mounted, setMounted] = useState(false)

  // 主题配置
  const themes: { value: Theme; label: string; icon: any; description: string }[] = [
    {
      value: 'dusk',
      label: 'DUSK',
      icon: MoonIcon,
      description: '学院雅典风'
    },
    {
      value: 'day',
      label: 'DAY',
      icon: SunIcon,
      description: '黑金商务风'
    },
    {
      value: 'dawn',
      label: 'DAWN',
      icon: ComputerDesktopIcon,
      description: '赛博像素风'
    }
  ]

  // 尺寸配置
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themes.some(t => t.value === savedTheme)) {
      setTheme(savedTheme)
    }
    setMounted(true)
  }, [])

  // 应用主题
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  // 切换主题
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  // 防止SSR不匹配
  if (!mounted) {
    return (
      <div className={`flex space-x-2 ${className}`}>
        {themes.map((t) => (
          <div
            key={t.value}
            className={`${sizeClasses[size]} bg-gray-200 rounded-lg animate-pulse`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`flex space-x-2 ${className}`}>
      {themes.map((t) => {
        const Icon = t.icon
        const isActive = theme === t.value
        
        return (
          <button
            key={t.value}
            onClick={() => handleThemeChange(t.value)}
            className={`
              ${sizeClasses[size]} 
              relative flex flex-col items-center justify-center 
              rounded-xl border-2 transition-all duration-300 
              hover:scale-110 hover:shadow-lg
              ${isActive 
                ? 'border-current bg-current text-white shadow-xl' 
                : 'border-gray-300 bg-gray-100 text-gray-600 hover:border-gray-400'
              }
            `}
            title={`${t.label} - ${t.description}`}
            aria-label={`切换到${t.label}主题`}
          >
            <Icon className="w-5 h-5" />
            
            {/* 主题标签 */}
            <span className="absolute -bottom-8 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
              {t.label}
            </span>
            
            {/* 激活指示器 */}
            {isActive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </button>
        )
      })}
    </div>
  )
}

// 开发者签名: @eclipsecybertitan
