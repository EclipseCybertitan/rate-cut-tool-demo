import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-800/50">
        <GlobeAltIcon className="w-4 h-4" />
        <span>{t('common.languageSwitch')}</span>
        <span className="text-xs opacity-75">({language.toUpperCase()})</span>
      </button>
      
      <div className="absolute right-0 top-full mt-2 w-32 bg-gray-900 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <button
            onClick={() => setLanguage('en')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-800 transition-colors duration-150 ${
              language === 'en' ? 'text-blue-400 bg-gray-800' : 'text-gray-300'
            }`}
          >
            🇺🇸 {t('common.english')}
          </button>
          <button
            onClick={() => setLanguage('zh')}
            className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-800 transition-colors duration-150 ${
              language === 'zh' ? 'text-blue-400 bg-gray-800' : 'text-gray-300'
            }`}
          >
            🇨🇳 {t('common.chinese')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
