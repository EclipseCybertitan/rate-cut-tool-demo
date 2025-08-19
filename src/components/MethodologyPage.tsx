import { useState } from 'react'
import { 
  AcademicCapIcon, 
  BuildingLibraryIcon, 
  SparklesIcon,
  LightBulbIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

interface MethodologyPageProps {
  onBack: () => void
  onNext: () => void
  onAssetChange: (assets: any) => void
}

interface InvestmentBelief {
  id: string
  name: string
  description: string
  icon: any
  color: string
  imageUrl: string
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
  const [selectedBelief, setSelectedBelief] = useState<string>('')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const investmentBeliefs: InvestmentBelief[] = [
    {
      id: 'textbook',
      name: '教科书理念',
      description: '基于现代投资组合理论和有效市场假说的传统投资方法',
      icon: AcademicCapIcon,
      color: 'from-blue-500 to-cyan-500',
      imageUrl: '/images/methodology/textbook-professor.jpg',
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
      reasoning: '教科书理念严格遵循现代投资组合理论，强调资产配置的多样化和风险分散。在降息环境下，建议增加股票配置以捕捉降息带来的估值扩张机会，保持房产配置作为通胀对冲，现金配置提供流动性缓冲。',
      riskProfile: '基于学术理论，追求长期稳定回报',
      specialFeatures: ['严格遵循CAPM模型', '马科维茨投资组合理论', '有效市场假说应用']
    },
    {
      id: 'wallstreet',
      name: '华尔街标准战术',
      description: '基于机构投资者经验和市场微观结构的实战策略',
      icon: BuildingLibraryIcon,
      color: 'from-purple-500 to-pink-500',
      imageUrl: '/images/methodology/wallstreet-elite.jpg',
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
      reasoning: '华尔街战术在降息周期中更加激进，大幅增加股票配置以最大化降息红利，适度配置基金产品获取专业管理收益，减少现金配置以降低机会成本。注重工具应用和风险管理。',
      riskProfile: '基于实战经验，追求超额收益',
      specialFeatures: ['量化交易策略', '风险管理工具', '机构级投资组合']
    },
    {
      id: 'psychohistory',
      name: '心理史学派',
      description: '基于群体心理和宏观趋势的逆向投资哲学',
      icon: SparklesIcon,
      color: 'from-orange-500 to-red-500',
      imageUrl: '/images/methodology/cyber-robot.jpg',
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
      reasoning: '心理史学派认为降息周期中市场情绪过度乐观，建议适度配置股票，增加另类资产如基金和虚拟货币，保持房产配置作为价值锚定。未来将支持加密货币对赌功能。',
      riskProfile: '基于心理学模型，追求非对称收益',
      specialFeatures: ['群体心理学分析', '加密货币对赌', '未来趋势预测', 'OKX/Binance推广']
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
            返回介绍
          </button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            选择您的投资哲学
          </h1>
          <div className="w-24"></div>
        </div>

        {/* 投资信念选择 */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {investmentBeliefs.map((belief) => (
            <button
              key={belief.id}
              onClick={() => handleBeliefSelection(belief.id)}
              className={`group p-8 rounded-3xl border-2 transition-all duration-500 text-left h-96 flex flex-col ${
                selectedBelief === belief.id
                  ? `border-purple-500 bg-gradient-to-br ${belief.color} shadow-2xl transform scale-105`
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700 hover:scale-105'
              }`}
            >
              {/* 图片占位符 */}
              <div className={`w-full h-48 rounded-2xl mb-6 flex items-center justify-center ${
                selectedBelief === belief.id ? 'bg-white/20' : 'bg-gray-700'
              }`}>
                <belief.icon className={`w-24 h-24 ${
                  selectedBelief === belief.id ? 'text-white' : 'text-gray-400'
                }`} />
              </div>
              
              <div className="flex-1">
                <h3 className={`text-xl font-bold mb-3 ${
                  selectedBelief === belief.id ? 'text-white' : 'text-white'
                }`}>
                  {belief.name}
                </h3>
                <p className={`text-sm ${
                  selectedBelief === belief.id ? 'text-white/90' : 'text-gray-300'
                }`}>
                  {belief.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* 投资建议展示 */}
        {showRecommendations && selectedBeliefData && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 border border-gray-600 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-3 text-yellow-400" />
                {selectedBeliefData.name} - 投资配置建议
              </h2>
              <div className="flex items-center space-x-4">
                {/* 风险等级选择 */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">风险等级:</span>
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
                        {level === 'low' ? '低风险' : level === 'medium' ? '中风险' : '高风险'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={applyRecommendations}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
                >
                  应用建议
                </button>
              </div>
            </div>

            {/* 配置建议 */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">📊 建议配置比例</h4>
                <div className="space-y-3">
                  {Object.entries(selectedBeliefData.riskLevels[selectedRiskLevel]).map(([asset, percentage]) => (
                    <div key={asset} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">
                        {asset === 'realEstate' ? '房产' : 
                         asset === 'equity' ? '股票' : 
                         asset === 'cash' ? '现金' : 
                         asset === 'fund' ? '基金' : 
                         asset === 'crypto' ? '虚拟货币' : '保险'}
                      </span>
                      <span className="font-semibold text-lg text-green-400">
                        {percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">💡 投资逻辑</h4>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-400 mb-2">核心理念</h5>
                    <p className="text-sm text-gray-300">{selectedBeliefData.reasoning}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-yellow-400 mb-2">风险特征</h5>
                    <p className="text-sm text-gray-300">{selectedBeliefData.riskProfile}</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-semibold text-purple-400 mb-2">特色功能</h5>
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

        {/* 继续按钮 */}
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
              继续配置资产
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-lg">
            {selectedBelief ? '选择完成，继续下一步' : '请先选择投资哲学'}
          </p>
        </div>
      </div>
    </div>
  )
}
