import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import {
  ChartBarIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface RateCutAnalysisPageProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  selectedMethodology: string
  selectedRiskLevel: string
  onBack: () => void
}

interface RateCutScenario {
  basisPoints: number
  cycleDuration: number
  totalCutDegree: number
}

interface AssetImpact {
  asset: string
  currentValue: number
  projectedChange: number
  newValue: number
  confidence: number
  reasoning: string
}

export default function RateCutAnalysisPage({ 
  assetInput, 
  selectedMethodology, 
  selectedRiskLevel, 
  onBack 
}: RateCutAnalysisPageProps) {
  const { language } = useLanguage()
  const [scenario, setScenario] = useState<RateCutScenario>({
    basisPoints: 100, // 默认100个基点
    cycleDuration: 5, // 默认5年周期
    totalCutDegree: 500 // 100 * 5 = 500个基点总降息
  })
  const [analysisResults, setAnalysisResults] = useState<AssetImpact[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [showAdvancedPrompt, setShowAdvancedPrompt] = useState(false)
  const [isAdvancedMode, setIsAdvancedMode] = useState(true) // 测试阶段开放高级模式

  // 计算总降息程度
  useEffect(() => {
    const totalCutDegree = scenario.basisPoints * scenario.cycleDuration
    setScenario(prev => ({
      ...prev,
      totalCutDegree
    }))
    
    // 检查降息幅度是否过高
    if (totalCutDegree > 600) {
      setShowAdvancedPrompt(true)
    } else {
      setShowAdvancedPrompt(false)
    }
  }, [scenario.basisPoints, scenario.cycleDuration])

  // 历史回测数据（基于历史降息周期的资产影响）
  const historicalImpacts = {
    equity: { baseImpact: 0.15, volatility: 0.08 }, // 股票通常受益于降息
    realEstate: { baseImpact: 0.12, volatility: 0.06 }, // 房产受益于低利率
    cash: { baseImpact: -0.05, volatility: 0.02 }, // 现金收益下降
    fund: { baseImpact: 0.08, volatility: 0.05 }, // 基金混合影响
    crypto: { baseImpact: 0.25, volatility: 0.15 }, // 加密货币高波动
    insurance: { baseImpact: -0.02, volatility: 0.03 } // 保险轻微负面
  }

  // 降息情景分析算法
  const analyzeRateCutImpact = async () => {
    setIsAnalyzing(true)
    
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const results: AssetImpact[] = []
    
    // 计算每个资产类别的影响
    Object.entries(assetInput).forEach(([assetType, currentValue]) => {
      if (currentValue > 0) {
        const impact = historicalImpacts[assetType as keyof typeof historicalImpacts]
        
        // 基于总降息程度调整影响
        const adjustmentFactor = scenario.totalCutDegree / 1000 // 标准化到千分之一
        const projectedChangePercent = impact.baseImpact * adjustmentFactor
        
        // 添加风险等级和投资哲学调整
        let riskAdjustment = 1
        if (selectedRiskLevel === 'high') riskAdjustment = 1.2
        else if (selectedRiskLevel === 'low') riskAdjustment = 0.8

        // 根据投资哲学调整
        let methodologyAdjustment = 1
        if (selectedMethodology === 'business') methodologyAdjustment = 1.1 // 商业派更积极
        else if (selectedMethodology === 'academic') methodologyAdjustment = 0.95 // 学术派更保守
        else if (selectedMethodology === 'psychologic') methodologyAdjustment = 1.05 // 心理史学派中等积极
        
        const projectedChange = currentValue * projectedChangePercent * riskAdjustment * methodologyAdjustment
        const newValue = currentValue + projectedChange
        
        // 计算置信度（基于历史数据可靠性）
        const confidence = Math.max(60, 90 - impact.volatility * 100)
        
        // 生成推理说明
        let reasoning = ''
        if (projectedChangePercent > 0) {
          reasoning = `Historical data shows ${assetType} typically benefits from rate cuts due to increased liquidity and lower borrowing costs.`
        } else {
          reasoning = `Rate cuts typically reduce yields for ${assetType}, leading to decreased returns in low-rate environments.`
        }
        
        results.push({
          asset: assetType,
          currentValue,
          projectedChange,
          newValue,
          confidence,
          reasoning
        })
      }
    })
    
    setAnalysisResults(results)
    setShowResults(true)
    setIsAnalyzing(false)
  }

  // 获取资产显示名称
  const getAssetDisplayName = (asset: string) => {
    const names = {
      equity: language === 'en' ? 'Stocks' : '股票',
      realEstate: language === 'en' ? 'Real Estate' : '房产',
      cash: language === 'en' ? 'Cash' : '现金',
      fund: language === 'en' ? 'Funds' : '基金',
      crypto: language === 'en' ? 'Cryptocurrency' : '加密货币',
      insurance: language === 'en' ? 'Insurance' : '保险'
    }
    return names[asset as keyof typeof names] || asset
  }

  // 获取影响颜色
  const getImpactColor = (change: number) => {
    if (change > 0) return 'text-green-400'
    if (change < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  // 获取影响图标
  const getImpactIcon = (change: number) => {
    if (change > 0) return <CheckCircleIcon className="w-5 h-5 text-green-400" />
    if (change < 0) return <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
    return <div className="w-5 h-5 rounded-full bg-gray-400" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* 顶部导航 */}
      <div className="flex justify-between items-center p-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>{language === 'en' ? 'Back' : '返回'}</span>
        </button>
        <LanguageSwitcher />
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Rate Cut Asset Allocation Game Tool' : '降息资产配置博弈工具'}
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            {language === 'en' 
              ? 'Analyze your portfolio performance under Federal Reserve rate cut scenarios'
              : '分析您的投资组合在美联储降息情景下的表现'
            }
          </p>
        </div>

        {/* 降息情景设置 */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <ArrowTrendingDownIcon className="w-8 h-8 text-blue-400" />
            <h2 className="text-2xl font-bold">
              {language === 'en' ? 'Rate Cut Scenario Configuration' : '降息情景配置'}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* 年度降息基点 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-400">
                {language === 'en' ? 'Annual Rate Cut (Basis Points)' : '年度降息基点'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="1000"
                  step="25"
                  value={scenario.basisPoints}
                  onChange={(e) => setScenario(prev => ({ ...prev, basisPoints: Number(e.target.value) }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="absolute right-3 top-3 text-gray-400 text-sm">bp</div>
              </div>
            </div>

            {/* 降息周期年限 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-400">
                {language === 'en' ? 'Rate Cut Cycle Duration (Years)' : '降息周期年限'}
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="10"
                  step="0.5"
                  value={scenario.cycleDuration}
                  onChange={(e) => setScenario(prev => ({ ...prev, cycleDuration: Number(e.target.value) }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                <div className="absolute right-3 top-3 text-gray-400 text-sm">
                  {language === 'en' ? 'yrs' : '年'}
                </div>
              </div>
            </div>

            {/* 总降息程度 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-400">
                {language === 'en' ? 'Total Rate Cut Degree' : '总降息程度'}
              </label>
              <div className="px-4 py-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-600/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {scenario.totalCutDegree}
                  <span className="text-sm text-gray-400 ml-1">bp</span>
                </div>
                <div className="text-xs text-gray-500">
                  {scenario.basisPoints} × {scenario.cycleDuration}
                </div>
              </div>
            </div>
          </div>

          {/* 降息幅度警告 */}
          {showAdvancedPrompt && (
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/30 rounded-xl">
              <div className="flex items-center space-x-3">
                <ExclamationTriangleIcon className="w-6 h-6 text-amber-400" />
                <div>
                  <h4 className="text-amber-400 font-semibold">
                    {language === 'en' ? 'High Rate Cut Warning' : '高降息幅度警告'}
                  </h4>
                  <p className="text-amber-200 text-sm">
                    {language === 'en' 
                      ? 'The current rate cut scenario (500+ basis points) is unusually high and may not reflect realistic market conditions. Consider adjusting parameters for more accurate analysis.'
                      : '当前降息情景（500+基点）异常高，可能不符合实际市场情况。建议调整参数以获得更准确的分析。'
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 分析按钮 */}
          <div className="text-center">
            <button
              onClick={analyzeRateCutImpact}
              disabled={isAnalyzing}
              className={`group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-hidden ${
                isAnalyzing
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105'
              }`}
            >
              <span className="relative z-10 flex items-center">
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {language === 'en' ? 'Analyzing...' : '分析中...'}
                  </>
                ) : (
                  <>
                    <ChartBarIcon className="w-6 h-6 mr-3" />
                    {language === 'en' ? 'Start Rate Cut Analysis' : '开始降息情景分析'}
                  </>
                )}
              </span>
              {!isAnalyzing && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              )}
            </button>
          </div>
        </div>

        {/* 分析结果 */}
        {showResults && analysisResults.length > 0 && (
          <div className="space-y-6">
            {/* 结果概览 */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <CurrencyDollarIcon className="w-8 h-8 text-green-400" />
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Portfolio Impact Analysis' : '投资组合影响分析'}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {analysisResults.map((result, index) => (
                  <div key={index} className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        {getAssetDisplayName(result.asset)}
                      </h3>
                      {getImpactIcon(result.projectedChange)}
                    </div>

                    <div className="space-y-3">
                      {/* 当前价值 */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {language === 'en' ? 'Current Value:' : '当前价值:'}
                        </span>
                        <span className="text-white font-medium">
                          ${result.currentValue.toLocaleString()}
                        </span>
                      </div>

                      {/* 预期变化 */}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">
                          {language === 'en' ? 'Projected Change:' : '预期变化:'}
                        </span>
                        <span className={`font-medium ${getImpactColor(result.projectedChange)}`}>
                          {result.projectedChange >= 0 ? '+' : ''}
                          ${result.projectedChange.toLocaleString()}
                        </span>
                      </div>

                      {/* 新价值 */}
                      <div className="flex justify-between text-sm border-t border-gray-600 pt-2">
                        <span className="text-gray-400">
                          {language === 'en' ? 'New Value:' : '新价值:'}
                        </span>
                        <span className="text-white font-bold">
                          ${result.newValue.toLocaleString()}
                        </span>
                      </div>

                      {/* 置信度 */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{language === 'en' ? 'Confidence:' : '置信度:'}</span>
                          <span>{result.confidence.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${result.confidence}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* 推理说明 */}
                      <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                        <p className="text-xs text-gray-300 leading-relaxed">
                          {result.reasoning}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 总结和建议 */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <ClockIcon className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Strategic Recommendations' : '策略建议'}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* 赢家资产 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-400">
                    {language === 'en' ? 'Rate Cut Winners' : '降息受益资产'}
                  </h3>
                  <div className="space-y-2">
                    {analysisResults
                      .filter(result => result.projectedChange > 0)
                      .sort((a, b) => b.projectedChange - a.projectedChange)
                      .map((result, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-green-900/20 rounded-lg border border-green-600/30">
                          <span className="text-green-200">{getAssetDisplayName(result.asset)}</span>
                          <span className="text-green-400 font-medium">
                            +{((result.projectedChange / result.currentValue) * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* 输家资产 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-400">
                    {language === 'en' ? 'Rate Cut Losers' : '降息受损资产'}
                  </h3>
                  <div className="space-y-2">
                    {analysisResults
                      .filter(result => result.projectedChange < 0)
                      .sort((a, b) => a.projectedChange - b.projectedChange)
                      .map((result, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-red-900/20 rounded-lg border border-red-600/30">
                          <span className="text-red-200">{getAssetDisplayName(result.asset)}</span>
                          <span className="text-red-400 font-medium">
                            {((result.projectedChange / result.currentValue) * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 操作选项 */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
              <div className="flex items-center space-x-3 mb-6">
                <ChartBarIcon className="w-8 h-8 text-purple-400" />
                <h2 className="text-2xl font-bold">
                  {language === 'en' ? 'Export & Advanced Features' : '导出与高级功能'}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* 基础导出选项 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400">
                    {language === 'en' ? 'Basic Export Options' : '基础导出选项'}
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      <span>{language === 'en' ? 'Download PDF Report' : '下载PDF报告'}</span>
                    </button>
                    <button className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span>{language === 'en' ? 'Email Report' : '邮件发送报告'}</span>
                    </button>
                  </div>
                </div>

                {/* 高级功能解锁 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-amber-400">
                    {language === 'en' ? 'Advanced Features' : '高级功能'}
                  </h3>
                  {isAdvancedMode ? (
                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-600/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-400" />
                          <span className="text-green-400 font-medium">
                            {language === 'en' ? 'Advanced Mode Active' : '高级模式已激活'}
                          </span>
                        </div>
                        <p className="text-green-200 text-sm">
                          {language === 'en' 
                            ? 'Testing phase: All advanced features are unlocked for evaluation.'
                            : '测试阶段：所有高级功能已解锁供评估使用。'
                          }
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsAdvancedMode(false)}
                        className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="font-semibold">
                          {language === 'en' ? 'Premium Analysis' : '高级分析'}
                        </span>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/30 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <ExclamationTriangleIcon className="w-5 h-5 text-amber-400" />
                          <span className="text-amber-400 font-medium">
                            {language === 'en' ? 'Premium Features Locked' : '高级功能已锁定'}
                          </span>
                        </div>
                        <p className="text-amber-200 text-sm">
                          {language === 'en' 
                            ? 'Unlock advanced analysis, historical backtesting, and personalized recommendations.'
                            : '解锁高级分析、历史回测和个性化建议。'
                          }
                        </p>
                      </div>
                      <button className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="font-semibold">
                          {language === 'en' ? 'Unlock Premium' : '解锁高级版'}
                        </span>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 功能说明 */}
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  {language === 'en' ? 'What\'s Included:' : '包含内容：'}
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <ul className="space-y-1">
                      <li>• {language === 'en' ? 'Historical backtesting data' : '历史回测数据'}</li>
                      <li>• {language === 'en' ? 'Advanced risk modeling' : '高级风险建模'}</li>
                      <li>• {language === 'en' ? 'Portfolio optimization' : '投资组合优化'}</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-1">
                      <li>• {language === 'en' ? 'Real-time market insights' : '实时市场洞察'}</li>
                      <li>• {language === 'en' ? 'Custom scenario modeling' : '自定义情景建模'}</li>
                      <li>• {language === 'en' ? 'Priority support' : '优先支持'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
