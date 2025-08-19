import { useState } from 'react'
import { 
  HomeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon as CryptoIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface AssetConfigurationPageProps {
  onBack: () => void
  onNext: () => void
  assetInput: {
    realEstate: number
    equity: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  onAssetChange: (assets: any) => void
}

interface AssetCategory {
  id: string
  name: string
  icon: any
  color: string
  description: string
  examples: string[]
  tooltip: string
}

export default function AssetConfigurationPage({ 
  onBack, 
  onNext, 
  assetInput, 
  onAssetChange 
}: AssetConfigurationPageProps) {
  const [localInput, setLocalInput] = useState(assetInput)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const assetCategories: AssetCategory[] = [
    {
      id: 'realEstate',
      name: '房产估值',
      icon: HomeIcon,
      color: 'from-green-500 to-emerald-500',
      description: '房地产投资，包括住宅、商业地产等',
      examples: ['住宅房产', '商业地产', '土地投资', 'REITs'],
      tooltip: '房产在降息环境下通常表现良好，房贷成本下降推动需求增长'
    },
    {
      id: 'equity',
      name: '股票估值',
      icon: ChartBarIcon,
      color: 'from-blue-500 to-cyan-500',
      description: '股票投资组合，包括个股、指数基金等',
      examples: ['个股投资', '指数基金', '行业ETF', '成长股'],
      tooltip: '降息周期中股票表现强劲，企业融资成本下降，估值扩张'
    },
    {
      id: 'cash',
      name: '现金估值',
      icon: CurrencyDollarIcon,
      color: 'from-yellow-500 to-orange-500',
      description: '现金及现金等价物，包括各类存款产品',
      examples: ['美联储产品', '定期存款', '货币基金', '活期存款', '储蓄账户'],
      tooltip: '现金在降息环境下收益率下降，但提供流动性和安全性'
    },
    {
      id: 'fund',
      name: '基金产品',
      icon: BuildingLibraryIcon,
      color: 'from-purple-500 to-pink-500',
      description: '各类投资基金，专业管理的投资组合',
      examples: ['股票基金', '债券基金', 'ETF基金', '混合基金', '指数基金'],
      tooltip: '基金产品提供专业管理，在降息环境下表现分化'
    },
    {
      id: 'crypto',
      name: '虚拟货币',
      icon: CryptoIcon,
      color: 'from-orange-500 to-red-500',
      description: '数字货币投资，包括主流币种和代币',
      examples: ['比特币(BTC)', '以太坊(ETH)', '稳定币', 'DeFi代币', 'NFT'],
      tooltip: '虚拟货币在降息环境下风险偏好上升，但波动性极高'
    },
    {
      id: 'insurance',
      name: '保险产品',
      icon: ShieldCheckIcon,
      color: 'from-red-500 to-pink-500',
      description: '投资型保险产品，具有理财和保障双重功能',
      examples: ['投资连结保险', '分红保险', '万能保险', '年金保险', '退休储蓄保险'],
      tooltip: '投资型保险在降息环境下收益率下降，但提供保障功能'
    }
  ]

  const handleInputChange = (field: keyof typeof localInput, value: string) => {
    const numValue = parseFloat(value) || 0
    const newInput = { ...localInput, [field]: numValue }
    setLocalInput(newInput)
    onAssetChange(newInput)
  }

  const totalAssets = Object.values(localInput).reduce((sum, value) => sum + value, 0)

  const getAssetPercentage = (value: number) => {
    if (totalAssets === 0) return 0
    return (value / totalAssets) * 100
  }

  const getRiskLevel = () => {
    const aggressiveAssets = localInput.equity + localInput.crypto
    const conservativeAssets = localInput.cash + localInput.insurance
    // const balancedAssets = localInput.realEstate + localInput.fund
    
    const aggressiveRatio = (aggressiveAssets / totalAssets) * 100
    const conservativeRatio = (conservativeAssets / totalAssets) * 100
    
    if (aggressiveRatio > 60) return { level: '高风险', color: 'text-red-400', bg: 'bg-red-900/20' }
    if (conservativeRatio > 60) return { level: '低风险', color: 'text-green-400', bg: 'bg-green-900/20' }
    return { level: '中风险', color: 'text-yellow-400', bg: 'bg-yellow-900/20' }
  }

  const riskProfile = getRiskLevel()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            返回方法论
          </button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            资产配置输入
          </h1>
          <div className="w-24"></div>
        </div>

        {/* 资产配置说明 */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-600/30 mb-8">
          <div className="flex items-start">
            <InformationCircleIcon className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
            <div className="text-blue-200">
              <h3 className="text-lg font-semibold mb-2">💡 资产分类说明</h3>
              <p className="text-sm leading-relaxed">
                请根据以下分类准确输入您的资产配置。每个输入框都有详细说明和示例，
                帮助您正确分类各类资产。系统将基于您的配置提供精准的降息情景分析。
              </p>
            </div>
          </div>
        </div>

        {/* 资产配置表单 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 左侧：基础资产 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-6">🏠 基础资产</h3>
            
            {assetCategories.slice(0, 3).map((category) => (
              <div key={category.id} className="space-y-3">
                <label className="block text-sm font-medium text-gray-300 flex items-center">
                  <category.icon className={`w-5 h-5 mr-2 text-${category.color.split('-')[1]}-400`} />
                  {category.name} (USD)
                  <button
                    onMouseEnter={() => setShowTooltip(category.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="ml-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <InformationCircleIcon className="w-4 h-4" />
                  </button>
                </label>
                
                {showTooltip === category.id && (
                  <div className="absolute z-20 bg-gray-800 p-4 rounded-lg border border-gray-600 shadow-2xl max-w-xs">
                    <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{category.description}</p>
                    <div className="text-sm text-gray-400">
                      <strong>包含:</strong> {category.examples.join('、')}
                    </div>
                    <div className="text-sm text-blue-300 mt-2">
                      <strong>降息影响:</strong> {category.tooltip}
                    </div>
                  </div>
                )}
                
                <input
                  type="number"
                  value={localInput[category.id as keyof typeof localInput] || ''}
                  onChange={(e) => handleInputChange(category.id as keyof typeof localInput, e.target.value)}
                  placeholder={`输入${category.name}`}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* 右侧：扩展资产 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-6">🚀 扩展资产</h3>
            
            {assetCategories.slice(3).map((category) => (
              <div key={category.id} className="space-y-3">
                <label className="block text-sm font-medium text-gray-300 flex items-center">
                  <category.icon className={`w-5 h-5 mr-2 text-${category.color.split('-')[1]}-400`} />
                  {category.name} (USD)
                  <button
                    onMouseEnter={() => setShowTooltip(category.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="ml-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <InformationCircleIcon className="w-4 h-4" />
                  </button>
                </label>
                
                <input
                  type="number"
                  value={localInput[category.id as keyof typeof localInput] || ''}
                  onChange={(e) => handleInputChange(category.id as keyof typeof localInput, e.target.value)}
                  placeholder={`输入${category.name}`}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 资产总计和风险分析 */}
        {totalAssets > 0 && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600 mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 font-semibold text-2xl">资产总计:</span>
              <span className="font-bold text-4xl text-white">
                ${totalAssets.toLocaleString('en-US')}
              </span>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* 基础资产占比 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">基础资产</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">房产:</span>
                    <span className="text-green-400 font-medium">
                      {getAssetPercentage(localInput.realEstate).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">股票:</span>
                    <span className="text-blue-400 font-medium">
                      {getAssetPercentage(localInput.equity).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">现金:</span>
                    <span className="text-yellow-400 font-medium">
                      {getAssetPercentage(localInput.cash).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 扩展资产占比 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">扩展资产</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">基金:</span>
                    <span className="text-purple-400 font-medium">
                      {getAssetPercentage(localInput.fund).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">虚拟货币:</span>
                    <span className="text-orange-400 font-medium">
                      {getAssetPercentage(localInput.crypto).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">保险:</span>
                    <span className="text-red-400 font-medium">
                      {getAssetPercentage(localInput.insurance).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 风险分布 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">风险分布</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">保守:</span>
                    <span className="text-green-400 font-medium">
                      {getAssetPercentage(localInput.cash + localInput.insurance).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">平衡:</span>
                    <span className="text-blue-400 font-medium">
                      {getAssetPercentage(localInput.realEstate + localInput.fund).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">激进:</span>
                    <span className="text-orange-400 font-medium">
                      {getAssetPercentage(localInput.equity + localInput.crypto).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 风险等级 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">风险等级</h4>
                <div className={`p-4 rounded-lg ${riskProfile.bg} border border-gray-600`}>
                  <div className={`text-center text-2xl font-bold ${riskProfile.color}`}>
                    {riskProfile.level}
                  </div>
                  <div className="text-center text-sm text-gray-400 mt-1">
                    基于当前配置
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 继续按钮 */}
        <div className="text-center">
          <button
            onClick={onNext}
            disabled={totalAssets === 0}
            className={`group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-hidden ${
              totalAssets > 0 
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center">
              开始分析
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-lg">
            {totalAssets > 0 ? '配置完成，开始降息情景分析' : '请先输入资产配置'}
          </p>
        </div>
      </div>
    </div>
  )
}
