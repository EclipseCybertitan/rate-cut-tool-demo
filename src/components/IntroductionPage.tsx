import { useState, useEffect } from 'react'
import { 
  SparklesIcon, 
  ChartBarIcon, 
  CpuChipIcon,
  ArrowRightIcon,
  // CurrencyDollarIcon,
  // ChartBarIcon as FinanceIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

interface IntroductionPageProps {
  onNext: () => void
}

export default function IntroductionPage({ onNext }: IntroductionPageProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { language } = useLanguage()

  const dynamicTexts = {
    en: [
      "Interest Rate Cut Asset Allocation Game Tool",
      "Why Now?",
      "Fed rate cut expectations rise in H2 2025",
      "Market environment changes will significantly affect asset allocation strategies",
      "Evaluate your investment portfolio in advance",
      "Seize investment opportunities from rate cuts",
      "This tool leverages accessible financial philosophy",
      "Intelligent matching, diagnosing your investment preferences",
      "Seize rate cut cycles"
    ],
    zh: [
      "降息资产配置博弈工具",
      "为什么现在？",
      "2025年下半年美联储降息预期上升",
      "市场环境变化将显著影响资产配置策略",
      "提前评估您的投资组合",
      "把握降息带来的投资机会",
      "本工具可以利用浅显易懂的金融哲学",
      "智能匹配、诊断您的投资偏好",
      "把握降息周期"
    ]
  }

  const currentTexts = dynamicTexts[language as keyof typeof dynamicTexts] || dynamicTexts.en

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % currentTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [currentTexts.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* 语言切换器 */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      {/* 动态粒子效果 */}
      <div className="absolute inset-0">
        {/* 流光点效果 */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
        
        {/* 缓慢飘动的金融符号 */}
        <div className="absolute top-32 left-1/3 text-2xl animate-bounce" style={{ animationDuration: '3s' }}>💹</div>
        <div className="absolute top-64 right-1/4 text-2xl animate-bounce" style={{ animationDuration: '4s' }}>💰</div>
        <div className="absolute top-96 left-1/2 text-2xl animate-bounce" style={{ animationDuration: '5s' }}>💵</div>
        <div className="absolute top-48 right-1/2 text-2xl animate-bounce" style={{ animationDuration: '3.5s' }}>📈</div>
      </div>
      
      {/* 背景动态效果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-pink-900/10 animate-pulse"></div>
      
      {/* 电幻国度风格的装饰元素 */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        {/* 主标题区域 */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <SparklesIcon className="w-16 h-16 mx-auto text-yellow-400 mb-4 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              {language === 'en' ? 'Interest Rate Cut Asset Allocation Game Tool' : '降息资产配置博弈工具'}
            </h1>
          </div>

          {/* 动态切入文字 */}
          <div className="h-32 flex items-center justify-center mb-8">
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-2xl md:text-3xl text-white font-medium">
                {currentTexts[currentTextIndex]}
              </p>
            </div>
          </div>

          {/* 核心价值主张 */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-8 rounded-3xl border border-blue-600/30 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-blue-300 mb-6 flex items-center justify-center">
                <CpuChipIcon className="w-8 h-8 mr-3" />
                {language === 'en' ? 'Intelligent Investment Philosophy Matching System' : '智能投资哲学匹配系统'}
              </h2>
              <p className="text-lg text-blue-200 leading-relaxed mb-6">
                {language === 'en' 
                  ? 'Based on advanced financial algorithms and psychological models, our tool can:' 
                  : '基于先进的金融算法和心理学模型，我们的工具能够：'}
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="group space-y-3 transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                    <ChartBarIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {language === 'en' ? 'Intelligent Matching' : '智能匹配'}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {language === 'en' 
                      ? 'Analyze your risk preferences and match the most suitable investment strategy' 
                      : '分析您的风险偏好，匹配最适合的投资策略'}
                  </p>
                </div>
                <div className="group space-y-3 transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                    <CpuChipIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {language === 'en' ? 'Preference Diagnosis' : '偏好诊断'}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {language === 'en' 
                      ? 'Deep analysis of your investment psychology and decision-making patterns' 
                      : '深度分析您的投资心理和决策模式'}
                  </p>
                </div>
                <div className="group space-y-3 transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all duration-300">
                    <SparklesIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {language === 'en' ? 'Cycle Timing' : '周期把握'}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {language === 'en' 
                      ? 'Accurately identify rate cut cycles and optimize asset allocation timing' 
                      : '精准识别降息周期，优化资产配置时机'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 为什么现在？ */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-orange-900/40 p-8 rounded-3xl border border-purple-600/50 backdrop-blur-sm shadow-2xl">
            <h2 className="text-3xl font-bold text-purple-300 mb-6 text-center">
              🌟 {language === 'en' ? 'Why Now?' : '为什么现在？'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
                      {language === 'en' ? 'Fed Policy Shift' : '美联储政策转向'}
                    </h3>
                    <p className="text-gray-300">
                      {language === 'en' 
                        ? 'Rate cut expectations rise in H2 2025, significant market environment changes expected' 
                        : '2025年下半年降息预期上升，市场环境即将发生重大变化'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                      {language === 'en' ? 'Historical Opportunity Window' : '历史机遇窗口'}
                    </h3>
                    <p className="text-gray-300">
                      {language === 'en' 
                        ? 'Rate cut cycles often bring asset price revaluation, early positioning is crucial' 
                        : '降息周期往往带来资产价格重估，提前布局至关重要'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {language === 'en' ? 'Risk Diversification Needs' : '风险分散需求'}
                    </h3>
                    <p className="text-gray-300">
                      {language === 'en' 
                        ? 'Economic uncertainty increases, diversified asset allocation becomes necessary' 
                        : '经济不确定性增加，多元化资产配置成为必要选择'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 group">
                  <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">
                      {language === 'en' ? 'Technology-Driven Analysis' : '技术驱动分析'}
                    </h3>
                    <p className="text-gray-300">
                      {language === 'en' 
                        ? 'AI algorithms and machine learning make investment decisions more scientific and precise' 
                        : 'AI算法和机器学习技术，让投资决策更加科学精准'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 开始按钮 */}
        <div className="text-center">
          <button
            onClick={onNext}
            className="group relative inline-flex items-center justify-center px-16 py-8 text-2xl font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              {language === 'en' ? 'Start Your Investment Journey' : '开始您的投资之旅'}
              <ArrowRightIcon className="w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
          </button>
          <p className="text-gray-400 mt-6 text-lg">
            {language === 'en' 
              ? 'Click to start, explore your investment philosophy' 
              : '点击开始，探索您的投资哲学'}
          </p>
        </div>
      </div>
    </div>
  )
}
