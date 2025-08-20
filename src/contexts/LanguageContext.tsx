import React, { createContext, useContext, useState, useEffect } from 'react'
import { languages, Language } from '../config/languages'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: React.ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    // 从localStorage读取语言设置，默认为英文
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  // 翻译函数
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = languages[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // 如果找不到翻译，返回英文版本
        value = languages.en
        for (const k2 of keys) {
          if (value && typeof value === 'object' && k2 in value) {
            value = value[k2]
          } else {
            return key // 如果都找不到，返回key本身
          }
        }
        break
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
