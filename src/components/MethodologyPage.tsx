import { useState } from 'react'
import { 
  AcademicCapIcon, 
  BuildingLibraryIcon, 
  SparklesIcon,
  LightBulbIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MusicalNoteIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

interface MethodologyPageProps {
  onBack: () => void
  onNext: () => void
  onAssetChange: (assets: any) => void
}

interface InvestmentBelief {
  id: string
  name: string
  description: string
  longDescription: string
  icon: any
  color: string
  imageUrl: string
  musicUrl: string
  riskLevels: {
    low: {
      realEstate: number
      equity: number
      cash: number
      fund: number
      crypto: number
      insurance: number
    }
    medium: {
      realEstate: number
      equity: number
      cash: number
      fund: number
      crypto: number
      insurance: number
    }
    high: {
      realEstate: number
      equity: number
      cash: number
      fund: number
      crypto: number
      insurance: number
    }
  }
  reasoning: string
  riskProfile: string
  specialFeatures: string[]
}

export default function MethodologyPage({ onBack, onNext, onAssetChange }: MethodologyPageProps) {
  const { t, language } = useLanguage()
  const [selectedBelief, setSelectedBelief] = useState<string>('')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [hoveredBelief, setHoveredBelief] = useState<string>('')
  const [selectedMusic, setSelectedMusic] = useState<string>('')

  const investmentBeliefs: InvestmentBelief[] = [
    {
      id: 'academic',
      name: t('methodology.academic.name'),
      description: t('methodology.academic.description'),
      longDescription: t('methodology.academic.longDescription'),
      icon: AcademicCapIcon,
      color: 'from-yellow-400 to-amber-600',
      imageUrl: '/images/methodology/textbook.png',
      musicUrl: 'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator',
      riskLevels: {
        low: {
          realEstate: 40,
          equity: 30,
          cash: 20,
          fund: 10,
          crypto: 0,
          insurance: 0
        },
        medium: {
          realEstate: 30,
          equity: 50,
          cash: 15,
          fund: 5,
          crypto: 0,
          insurance: 0
        },
        high: {
          realEstate: 20,
          equity: 70,
          cash: 5,
          fund: 5,
          crypto: 0,
          insurance: 0
        }
      },
      reasoning: t('methodology.academic.reasoning'),
      riskProfile: t('methodology.academic.riskProfile'),
      specialFeatures: language === 'en' ? 
        ['Strict CAPM model application', 'Markowitz portfolio theory', 'Efficient market hypothesis application'] :
        ['严格遵循CAPM模型', '马科维茨投资组合理论', '有效市场假说应用']
    },
    {
      id: 'business',
      name: t('methodology.business.name'),
      description: t('methodology.business.description'),
      longDescription: t('methodology.business.longDescription'),
      icon: BuildingLibraryIcon,
      color: 'from-gray-900 to-red-800',
      imageUrl: '/images/methodology/wallstreet.png',
      musicUrl: 'https://open.spotify.com/embed/track/6rqhFgbbKwnb9MLmUQDhG6?utm_source=generator',
      riskLevels: {
        low: {
          realEstate: 35,
          equity: 40,
          cash: 15,
          fund: 10,
          crypto: 0,
          insurance: 0
        },
        medium: {
          realEstate: 25,
          equity: 60,
          cash: 10,
          fund: 5,
          crypto: 0,
          insurance: 0
        },
        high: {
          realEstate: 15,
          equity: 75,
          cash: 5,
          fund: 5,
          crypto: 0,
          insurance: 0
        }
      },
      reasoning: t('methodology.business.reasoning'),
      riskProfile: t('methodology.business.riskProfile'),
      specialFeatures: language === 'en' ? 
        ['Quantitative trading strategies', 'Risk management tools', 'Institutional-level portfolios'] :
        ['量化交易策略', '风险管理工具', '机构级投资组合']
    },
    {
      id: 'psychologic',
      name: t('methodology.psychologic.name'),
      description: t('methodology.psychologic.description'),
      longDescription: t('methodology.psychologic.longDescription'),
      icon: SparklesIcon,
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      imageUrl: '/images/methodology/psychohistory.png',
      musicUrl: 'https://open.spotify.com/embed/track/3HfB5hBU0dmBt8rDxw0ZJc?utm_source=generator',
      riskLevels: {
        low: {
          realEstate: 25,
          equity: 35,
          cash: 20,
          fund: 15,
          crypto: 5,
          insurance: 0
        },
        medium: {
          realEstate: 20,
          equity: 40,
          cash: 15,
          fund: 15,
          crypto: 10,
          insurance: 0
        },
        high: {
          realEstate: 15,
          equity: 45,
          cash: 10,
          fund: 20,
          crypto: 10,
          insurance: 0
        }
      },
      reasoning: t('methodology.psychologic.reasoning'),
      riskProfile: t('methodology.psychologic.riskProfile'),
      specialFeatures: language === 'en' ? 
        ['Market sentiment analysis', 'Behavioral bias identification', 'Contrarian investment timing'] :
        ['市场情绪分析', '行为偏差识别', '逆向投资时机']
    }
  ]

  const handleBeliefSelection = (beliefId: string) => {
    setSelectedBelief(beliefId)
    setShowRecommendations(true)
  }

  const applyRecommendations = () => {
    if (!selectedBelief) return
    
    const belief = investmentBeliefs.find(b => b.id === selectedBelief)
    if (!belief) return

    const recommendations = belief.riskLevels[selectedRiskLevel]
    onAssetChange(recommendations)
  }

  const selectedBeliefData = investmentBeliefs.find(belief => belief.id === selectedBelief)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            {t('methodology.back')}
          </button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            {t('methodology.title')}
          </h1>
          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        {/* 趣味选择提示 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-6 rounded-2xl border border-yellow-600/30 text-center">
            <div className="flex items-center justify-center mb-3">
              <MusicalNoteIcon className="w-8 h-8 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-yellow-300">
                {language === 'en' ? 'Not sure which school to choose?' : '不知道怎么选择流派？'}
              </h3>
            </div>
            <p className="text-yellow-200 text-lg">
              {language === 'en' ? 'Try listening to the music below, choose whichever one you like.' : '试着听听下面的音乐，喜欢哪个就选哪个吧。'}
            </p>
            <p className="text-yellow-300 text-sm mt-2">
              {language === 'en' ? 'Each investment philosophy has its corresponding music style, let music guide your choice' : '每个投资哲学都有对应的音乐风格，让音乐指引您的选择'}
            </p>
          </div>
        </div>

        {/* 投资信念选择 - 大卡片化居中显示 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {investmentBeliefs.map((belief) => (
              <button
                key={belief.id}
                onClick={() => handleBeliefSelection(belief.id)}
                onMouseEnter={() => setHoveredBelief(belief.id)}
                onMouseLeave={() => setHoveredBelief('')}
                className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 text-left flex flex-col cursor-pointer ${
                  selectedBelief === belief.id
                    ? `border-purple-500 bg-gradient-to-br ${belief.color} shadow-2xl transform scale-105 ring-4 ring-purple-500/30`
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700 hover:scale-105'
                }`}
              >
                {/* 闪光边框效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
                
                {/* 图片区域 - 扑克牌比例 (3:4) */}
                <div className={`w-full aspect-[3/4] rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden ${
                  selectedBelief === belief.id ? 'bg-white/20' : 'bg-gray-700'
                }`}>
                  {/* 真实图片 */}
                  <img 
                    src={belief.imageUrl} 
                    alt={belief.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  
                  {/* 音乐试听按钮 */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedMusic(selectedMusic === belief.id ? '' : belief.id)
                      }}
                      className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                    >
                      <PlayIcon className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  

                </div>
                
                {/* 文字说明区域 - 右侧文字说明 */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-3 ${
                    selectedBelief === belief.id ? 'text-white' : 'text-white'
                  }`}>
                    {belief.name}
                  </h3>
                  <p className={`text-sm font-medium ${
                    selectedBelief === belief.id ? 'text-white' : 'text-gray-100'
                  }`}>
                    {belief.description}
                  </p>
                  
                  {/* 动态浮现的详细描述 */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    hoveredBelief === belief.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                                      <p className="text-xs text-white leading-relaxed border-l-2 border-cyan-400 pl-3 bg-black/20 p-2 rounded-r">
                    {belief.longDescription}
                  </p>
                  </div>
                  
                  {/* 音乐风格提示 */}
                  <div className="mt-3 flex items-center text-xs text-gray-400">
                    <MusicalNoteIcon className="w-4 h-4 mr-1" />
                    <span>
                      {belief.id === 'academic' && (language === 'en' ? 'Classical Academic Style' : '古典学术风格')}
                      {belief.id === 'business' && (language === 'en' ? 'Modern Business Style' : '现代商业风格')}
                      {belief.id === 'psychologic' && (language === 'en' ? 'Future Tech Style' : '未来科技风格')}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 投资建议展示 */}
        {showRecommendations && selectedBeliefData && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 border border-gray-600 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-2 text-yellow-400" />
{selectedBeliefData.name} - {language === 'en' ? 'Investment Configuration Advice' : '投资配置建议'}
              </h3>
              <div className="flex items-center space-x-4">
                {/* 风险等级选择 */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">{language === 'en' ? 'Risk Level:' : '风险等级:'}</span>
                  <div className="flex bg-gray-800 rounded-lg p-1">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedRiskLevel(level)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          selectedRiskLevel === level
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {level === 'low' ? t('methodology.riskLevels.low') : level === 'medium' ? t('methodology.riskLevels.medium') : t('methodology.riskLevels.high')}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={applyRecommendations}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
                >
                  {t('methodology.applyRecommendations')}
                </button>
              </div>
            </div>
            
            {/* 风险等级投资逻辑描述 */}
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-600">
              <h4 className="text-lg font-semibold text-white mb-3">💡 {selectedRiskLevel === 'low' ? t('methodology.riskLevels.low') : selectedRiskLevel === 'medium' ? t('methodology.riskLevels.medium') : t('methodology.riskLevels.high')}{t('methodology.investmentLogic')}</h4>
              <p className="text-gray-300 leading-relaxed">
                {selectedRiskLevel === 'low' && t('methodology.riskLevels.lowLogic')}
                {selectedRiskLevel === 'medium' && t('methodology.riskLevels.mediumLogic')}
                {selectedRiskLevel === 'high' && t('methodology.riskLevels.highLogic')}
              </p>
            </div>

            {/* 配置建议 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">📊 {t('methodology.suggestedAllocation')}</h4>
                <div className="space-y-3">
                  {Object.entries(selectedBeliefData.riskLevels[selectedRiskLevel]).map(([asset, percentage]) => (
                    <div key={asset} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">
{language === 'en' ? 
                          (asset === 'realEstate' ? 'Real Estate' : 
                           asset === 'equity' ? 'Equity' : 
                           asset === 'cash' ? 'Cash' : 
                           asset === 'fund' ? 'Fund' : 
                           asset === 'crypto' ? 'Cryptocurrency' : 'Insurance') :
                          (asset === 'realEstate' ? '房产' : 
                           asset === 'equity' ? '股票' : 
                           asset === 'cash' ? '现金' : 
                           asset === 'fund' ? '基金' : 
                           asset === 'crypto' ? '虚拟货币' : '保险')}
                      </span>
                      <span className="font-semibold text-lg text-green-400">
                        {percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">💡 {t('methodology.investmentLogic')}</h4>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-400 mb-2">{t('methodology.reasoning')}</h5>
                    <p className="text-sm text-gray-300">{selectedBeliefData.reasoning}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-400 mb-2">{t('methodology.riskProfile')}</h5>
                    <p className="text-sm text-gray-300">{selectedBeliefData.riskProfile}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-purple-400 mb-2">{t('methodology.specialFeatures')}</h5>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {selectedBeliefData.specialFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 特殊功能说明 */}
            {selectedBeliefData.id === 'psychohistory' && (
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-6 rounded-xl border border-orange-600/30">
                <h4 className="text-lg font-semibold text-orange-300 mb-3">🚀 未来功能预告</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white mb-2">加密货币对赌</h5>
                    <p className="text-sm text-gray-300">
                      预测加密货币市值能否达到美国股市的特定百分比，基于客户对赌结果调整加密资产配置
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">交易所推广</h5>
                    <p className="text-sm text-gray-300">
                      集成OKX、Binance等主流交易所，提供快捷交易入口和专属优惠
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 继续按钮 - 保持居中 */}
        <div className="text-center">
          <button
            onClick={onNext}
            disabled={!selectedBelief}
            className={`group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-hidden ${
              selectedBelief 
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center">
{language === 'en' ? 'Continue Asset Configuration' : '继续配置资产'}
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-lg">
{selectedBelief ? 
              (language === 'en' ? 'Selection completed, continue to next step' : '选择完成，继续下一步') : 
              (language === 'en' ? 'Please select an investment philosophy first' : '请先选择投资哲学')}
          </p>
        </div>

        {/* 音乐播放器 */}
        {selectedMusic && (
          <div className="fixed bottom-4 right-4 w-80 h-20 bg-gray-900/95 border border-gray-600 rounded-xl shadow-2xl backdrop-blur-sm z-50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">
                  {language === 'en' ? 'Now Playing' : '正在播放'}
                </span>
                <button
                  onClick={() => setSelectedMusic('')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>
              <iframe
                src={investmentBeliefs.find(b => b.id === selectedMusic)?.musicUrl}
                width="100%"
                height="80"
                frameBorder="0"
                allow="encrypted-media"
                className="rounded"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
