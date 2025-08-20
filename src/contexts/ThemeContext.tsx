import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Theme } from '../components/ThemeSwitcher'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

/**
 * 主题上下文提供者
 * @param props 组件属性
 * @returns JSX元素
 * @author @eclipsecybertitan
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('dusk')
  const [mounted, setMounted] = useState(false)

  const themes: Theme[] = ['dusk', 'day', 'dawn']

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themes.includes(savedTheme)) {
      setThemeState(savedTheme)
    }
    setMounted(true)
  }, [])

  // 应用主题到DOM
  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme, mounted])

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  // 切换主题
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setThemeState(themes[nextIndex])
  }

  // 防止SSR不匹配
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{
        theme: 'dusk',
        setTheme,
        toggleTheme,
        themes
      }}>
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      themes
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * 使用主题上下文
 * @returns 主题上下文值
 * @throws 如果在ThemeProvider外使用
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// 开发者签名: @eclipsecybertitan
