import { useState } from 'react'
import { 
  AcademicCapIcon, 
  BuildingLibraryIcon, 
  SparklesIcon,
  ChartBarIcon,
  LightBulbIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface InvestmentMethodologyProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
    fund?: number
    crypto?: number
    insurance?: number
  }
  onAssetChange: (assets: any) => void
}

interface InvestmentBelief {
  id: string
  name: string
  description: string
  icon: any
  color: string
  recommendations: {
    realEstate: number
    equity: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  reasoning: string
  riskProfile: string
}

export default function InvestmentMethodology({ assetInput, onAssetChange }: InvestmentMethodologyProps) {
  const [selectedBelief, setSelectedBelief] = useState<string>('')
  const [showRecommendations, setShowRecommendations] = useState(false)

  const investmentBeliefs: InvestmentBelief[] = [
    {
      id: 'textbook',
      name: '教科书理念',
      description: '基于现代投资组合理论和有效市场假说的传统投资方法',
      icon: AcademicCapIcon,
      color: 'from-blue-500 to-cyan-500',
      recommendations: {
        realEstate: 30,
        equity: 50,
        cash: 20,
        fund: 0,
        crypto: 0,
        insurance: 0
      },
      reasoning: '教科书理念强调资产配置的多样化和风险分散。在降息环境下，建议增加股票配置（50%）以捕捉降息带来的估值扩张机会，保持房产配置（30%）作为通胀对冲，现金配置（20%）提供流动性缓冲。',
      riskProfile: '中等风险，追求长期稳定回报'
    },
    {
      id: 'wallstreet',
      name: '华尔街标准战术',
      description: '基于机构投资者经验和市场微观结构的实战策略',
      icon: BuildingLibraryIcon,
      color: 'from-purple-500 to-pink-500',
      recommendations: {
        realEstate: 25,
        equity: 60,
        cash: 10,
        fund: 5,
        crypto: 0,
        insurance: 0
      },
      reasoning: '华尔街战术在降息周期中更加激进，大幅增加股票配置（60%）以最大化降息红利，适度配置基金产品（5%）获取专业管理收益，减少现金配置（10%）以降低机会成本。',
      riskProfile: '中高风险，追求超额收益'
    },
    {
      id: 'psychohistory',
      name: '心理史学派',
      description: '基于群体心理和宏观趋势的逆向投资哲学',
      icon: SparklesIcon,
      color: 'from-orange-500 to-red-500',
      recommendations: {
        realEstate: 20,
        equity: 40,
        cash: 15,
        fund: 10,
        crypto: 10,
        insurance: 5
      },
      reasoning: '心理史学派认为降息周期中市场情绪过度乐观，建议适度配置股票（40%），增加另类资产如基金（10%）和虚拟货币（10%），保持房产配置（20%）作为价值锚定。',
      riskProfile: '高风险，追求非对称收益'
    }
  ]

  const handleBeliefSelection = (beliefId: string) => {
    setSelectedBelief(beliefId)
    setShowRecommendations(true)
  }

  const applyRecommendations = (belief: InvestmentBelief) => {
    const totalAssets = assetInput.realEstate + assetInput.equity + assetInput.cash + 
                       (assetInput.fund || 0) + (assetInput.crypto || 0) + (assetInput.insurance || 0)
    
    if (totalAssets === 0) return

    const newAllocation = {
      realEstate: (belief.recommendations.realEstate / 100) * totalAssets,
      equity: (belief.recommendations.equity / 100) * totalAssets,
      cash: (belief.recommendations.cash / 100) * totalAssets,
      fund: (belief.recommendations.fund / 100) * totalAssets,
      crypto: (belief.recommendations.crypto / 100) * totalAssets,
      insurance: (belief.recommendations.insurance / 100) * totalAssets
    }

    onAssetChange(newAllocation)
  }

  const selectedBeliefData = investmentBeliefs.find(belief => belief.id === selectedBelief)

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <ChartBarIcon className="w-6 h-6 mr-3 text-purple-400" />
        <h2 className="text-2xl font-bold text-white">投资方法论</h2>
        <div className="ml-auto">
          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
            选择你的投资信仰
          </span>
        </div>
      </div>

      {/* 投资信念选择 */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {investmentBeliefs.map((belief) => (
          <button
            key={belief.id}
            onClick={() => handleBeliefSelection(belief.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedBelief === belief.id
                ? `border-purple-500 bg-gradient-to-br ${belief.color} shadow-2xl transform scale-105`
                : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center mb-4">
              <belief.icon className={`w-8 h-8 mr-3 ${
                selectedBelief === belief.id ? 'text-white' : 'text-gray-400'
              }`} />
              <h3 className={`text-lg font-bold ${
                selectedBelief === belief.id ? 'text-white' : 'text-white'
              }`}>
                {belief.name}
              </h3>
            </div>
            <p className={`text-sm ${
              selectedBelief === belief.id ? 'text-white/90' : 'text-gray-300'
            }`}>
              {belief.description}
            </p>
          </button>
        ))}
      </div>

      {/* 投资建议展示 */}
      {showRecommendations && selectedBeliefData && (
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 border border-gray-600">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center">
              <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
              {selectedBeliefData.name} - 降息周期资产配置建议
            </h3>
            <button
              onClick={() => applyRecommendations(selectedBeliefData)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold"
            >
              应用建议
            </button>
          </div>

          {/* 配置建议 */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">📊 建议配置比例</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-300">房产配置:</span>
                  <span className="font-semibold text-green-400">
                    {selectedBeliefData.recommendations.realEstate}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-300">股票配置:</span>
                  <span className="font-semibold text-blue-400">
                    {selectedBeliefData.recommendations.equity}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                  <span className="text-gray-300">现金配置:</span>
                  <span className="font-semibold text-yellow-400">
                    {selectedBeliefData.recommendations.cash}%
                  </span>
                </div>
                {selectedBeliefData.recommendations.fund > 0 && (
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">基金配置:</span>
                    <span className="font-semibold text-purple-400">
                      {selectedBeliefData.recommendations.fund}%
                    </span>
                  </div>
                )}
                {selectedBeliefData.recommendations.crypto > 0 && (
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">虚拟货币:</span>
                    <span className="font-semibold text-orange-400">
                      {selectedBeliefData.recommendations.crypto}%
                    </span>
                  </div>
                )}
                {selectedBeliefData.recommendations.insurance > 0 && (
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">保险配置:</span>
                    <span className="font-semibold text-red-400">
                      {selectedBeliefData.recommendations.insurance}%
                    </span>
                  </div>
                )}
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
              </div>
            </div>
          </div>

          {/* 当前配置对比 */}
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 rounded-xl border border-blue-600/30">
            <h4 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2" />
              当前配置 vs 建议配置
            </h4>
            <p className="text-sm text-blue-200">
              点击"应用建议"按钮，系统将根据您选择的投资信念自动调整资产配置比例。
              您也可以手动微调各项配置，系统会实时计算预期收益和风险指标。
            </p>
          </div>
        </div>
      )}

      {/* 方法论说明 */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
        <p className="text-xs text-gray-400 text-center">
          💡 投资方法论基于历史数据和投资理论，不构成投资建议。不同信念适合不同风险承受能力的投资者，
          请根据自身情况谨慎选择。付费用户可获得更精准的回测数据和个性化建议。
        </p>
      </div>
    </div>
  )
}
