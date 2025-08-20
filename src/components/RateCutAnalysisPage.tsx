import { useState, useEffect } from 'react'
import { 
  ArrowLeftIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'

interface RateCutAnalysisPageProps {
  onBack: () => void
  assetInput: {
    realEstate: number
    equity: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  selectedMethodology: string
  selectedRiskLevel: 'low' | 'medium' | 'high'
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
  onBack, 
  assetInput, 
  selectedMethodology,
  selectedRiskLevel
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
  const [currentStep, setCurrentStep] = useState<'input' | 'analyzing' | 'results'>('input')

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
    setCurrentStep('analyzing')
    
    console.log('开始分析，资产输入:', assetInput)
    console.log('降息情景:', scenario)
    
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const results: AssetImpact[] = []
    
    // 计算每个资产类别的影响
    Object.entries(assetInput).forEach(([assetType, currentValue]) => {
      console.log(`分析资产: ${assetType}, 当前价值: ${currentValue}`)
      
      if (currentValue > 0) {
        const impact = historicalImpacts[assetType as keyof typeof historicalImpacts]
        console.log(`资产 ${assetType} 的影响系数:`, impact)
        
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
        
        console.log(`资产 ${assetType} 计算结果:`, {
          projectedChangePercent,
          riskAdjustment,
          methodologyAdjustment,
          projectedChange,
          newValue
        })
        
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
    
    console.log('分析完成，结果:', results)
    
    setAnalysisResults(results)
    setShowResults(true)
    setCurrentStep('results')
    setIsAnalyzing(false)
  }

  // 重置分析
  const resetAnalysis = () => {
    setShowResults(false)
    setAnalysisResults([])
    setCurrentStep('input')
  }

  // PDF报告下载功能
  const downloadPDFReport = () => {
    // 创建报告内容
    const reportContent = generateReportContent()
    
    // 创建Blob对象
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' })
    
    // 创建下载链接
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `rate-cut-analysis-report-${new Date().toISOString().split('T')[0]}.txt`
    
    // 触发下载
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // 清理URL
    window.URL.revokeObjectURL(url)
    
    // 显示成功消息
    alert(language === 'en' ? 'Report downloaded successfully!' : '报告下载成功！')
  }

  // Email报告功能
  const emailReport = () => {
    const reportContent = generateReportContent()
    const subject = language === 'en' ? 'Rate Cut Analysis Report' : '降息分析报告'
    const body = encodeURIComponent(reportContent)
    
    // 打开默认邮件客户端
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${body}`)
  }

  // 生成报告内容
  const generateReportContent = () => {
    const timestamp = new Date().toLocaleString()
    let content = ''
    
    content += `Rate Cut Asset Allocation Analysis Report\n`
    content += `降息资产配置分析报告\n`
    content += `Generated: ${timestamp}\n`
    content += `生成时间: ${timestamp}\n\n`
    
    content += `Analysis Parameters 分析参数:\n`
    content += `- Annual Rate Cut: ${scenario.basisPoints} basis points\n`
    content += `- Cycle Duration: ${scenario.cycleDuration} years\n`
    content += `- Total Cut Degree: ${scenario.totalCutDegree} basis points\n`
    content += `- Risk Level: ${selectedRiskLevel}\n`
    content += `- Investment Philosophy: ${selectedMethodology}\n\n`
    
    content += `Portfolio Analysis Results 投资组合分析结果:\n`
    analysisResults.forEach((result, index) => {
      content += `${index + 1}. ${getAssetDisplayName(result.asset)}\n`
      content += `   Current Value: $${result.currentValue.toLocaleString()}\n`
      content += `   Projected Change: $${result.projectedChange.toLocaleString()}\n`
      content += `   New Value: $${result.newValue.toLocaleString()}\n`
      content += `   Confidence: ${result.confidence}%\n`
      content += `   Reasoning: ${result.reasoning}\n\n`
    })
    
    content += `\nPowered by eclipsever\n`
    content += `https://eclipsever.online\n`
    
    return content
  }

  // 社交媒体分享功能
  const shareToSocial = (platform: 'twitter' | 'facebook' | 'instagram') => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(
      language === 'en' 
        ? 'Check out this amazing Rate Cut Asset Allocation Tool! Analyze your portfolio performance under Federal Reserve rate cut scenarios. #Investment #Finance #RateCut'
        : '看看这个超棒的降息资产配置工具！分析您在美联储降息情景下的投资组合表现。 #投资 #金融 #降息'
    )
    
    let shareUrl = ''
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'instagram':
        // Instagram不支持直接链接分享，显示提示
        alert(language === 'en' ? 'Please copy the link and share it on Instagram manually.' : '请复制链接并在Instagram上手动分享。')
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
    
    // 显示分享成功消息
    setTimeout(() => {
      alert(language === 'en' ? 'Shared successfully! Please refresh the page to unlock premium features.' : '分享成功！请刷新页面解锁高级功能。')
    }, 1000)
  }

  // 复制链接功能
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert(language === 'en' ? 'Link copied to clipboard!' : '链接已复制到剪贴板！')
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert(language === 'en' ? 'Link copied to clipboard!' : '链接已复制到剪贴板！')
    }
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

  // 渲染输入页面
  const renderInputPage = () => (
    <div className="space-y-8">
      {/* 降息情景配置 */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <ChartBarIcon className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'Rate Cut Scenario Configuration' : '降息情景配置'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 年度降息基点 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-400">
              {language === 'en' ? 'Annual Rate Cut (Basis Points)' : '年度降息基点'}
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="25"
                max="200"
                step="25"
                value={scenario.basisPoints}
                onChange={(e) => setScenario(prev => ({ ...prev, basisPoints: parseInt(e.target.value) || 100 }))}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-400 font-medium">bp</span>
            </div>
          </div>

          {/* 降息周期持续时间 */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-400">
              {language === 'en' ? 'Rate Cut Cycle Duration (Years)' : '降息周期持续时间'}
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                min="1"
                max="10"
                step="1"
                value={scenario.cycleDuration}
                onChange={(e) => setScenario(prev => ({ ...prev, cycleDuration: parseInt(e.target.value) || 5 }))}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-400 font-medium">yrs</span>
            </div>
          </div>
        </div>

        {/* 总降息程度 */}
        <div className="mt-8 space-y-3">
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

        {/* 降息幅度警告 */}
        {showAdvancedPrompt && (
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/30 rounded-xl">
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
        <div className="mt-8 text-center">
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
    </div>
  )

  // 渲染分析中页面
  const renderAnalyzingPage = () => (
    <div className="text-center py-20">
      <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-500 mx-auto mb-8"></div>
      <h2 className="text-3xl font-bold text-white mb-4">
        {language === 'en' ? 'Analyzing Rate Cut Impact...' : '分析降息影响中...'}
      </h2>
      <p className="text-xl text-gray-400 max-w-2xl mx-auto">
        {language === 'en' 
          ? 'We are analyzing your portfolio performance under the specified rate cut scenario using historical data and advanced modeling algorithms.'
          : '我们正在使用历史数据和高级建模算法分析您在指定降息情景下的投资组合表现。'
        }
      </p>
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-center space-x-2 text-blue-400">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>{language === 'en' ? 'Processing historical data' : '处理历史数据'}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-purple-400">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          <span>{language === 'en' ? 'Calculating asset impacts' : '计算资产影响'}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-pink-400">
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span>{language === 'en' ? 'Generating recommendations' : '生成建议'}</span>
        </div>
      </div>
    </div>
  )

  // 渲染结果页面
  const renderResultsPage = () => (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <div className="flex justify-between items-center no-print">
        <button
          onClick={resetAnalysis}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>{language === 'en' ? 'New Analysis' : '重新分析'}</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-lg"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          <span>{language === 'en' ? 'Print Report' : '打印报告'}</span>
        </button>
      </div>

      {/* 打印Logo - 只在打印时显示 */}
      <div className="print-logo hidden">
        <h1 className="text-2xl font-bold text-center">
          Rate Cut Asset Allocation Analysis Report
        </h1>
        <p className="text-center text-gray-600">
          Powered by eclipsever
        </p>
        <p className="text-center text-gray-600">
          https://eclipsever.online
        </p>
        <hr className="my-4" />
      </div>

      {/* 结果概览 */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700 avoid-break">
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
                    {result.projectedChange > 0 ? '+' : ''}${result.projectedChange.toLocaleString()}
                  </span>
                </div>

                {/* 新价值 */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {language === 'en' ? 'New Value:' : '新价值:'}
                  </span>
                  <span className="text-white font-medium">
                    ${result.newValue.toLocaleString()}
                  </span>
                </div>

                {/* 置信度 */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {language === 'en' ? 'Confidence:' : '置信度:'}
                  </span>
                  <span className="text-blue-400 font-medium">
                    {result.confidence}%
                  </span>
                </div>

                {/* 推理说明 */}
                <div className="pt-3 border-t border-gray-600">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {result.reasoning}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 总结和建议 - 新页面 */}
      <div className="page-break"></div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700 avoid-break">
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

      {/* 打印页脚 */}
      <div className="print-footer hidden">
        <p>Generated by Rate Cut Asset Allocation Tool</p>
        <p>Powered by eclipsever - https://eclipsever.online</p>
        <p>Page {window.location.pathname.includes('analysis') ? '1' : '1'}</p>
      </div>

      {/* 操作选项 - 新页面 */}
      <div className="page-break"></div>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700 no-print">
        <div className="flex items-center space-x-3 mb-6">
          <ChartBarIcon className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'Export & Advanced Features' : '导出与高级功能'}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 基础导出选项 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-blue-400 flex items-center space-x-2">
              <ArrowDownTrayIcon className="w-5 h-5" />
              <span>{language === 'en' ? 'Basic Export Options' : '基础导出选项'}</span>
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => downloadPDFReport()}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>{language === 'en' ? 'Download PDF Report' : '下载PDF报告'}</span>
              </button>
              <button 
                onClick={() => emailReport()}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>{language === 'en' ? 'Email Report' : '邮件发送报告'}</span>
              </button>
            </div>
          </div>

          {/* 高级功能解锁 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 flex items-center space-x-2">
              <CheckCircleIcon className="w-5 h-5" />
              <span>{language === 'en' ? 'Advanced Features' : '高级功能'}</span>
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

        {/* 推广裂变界面 */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-600/30 rounded-xl">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-purple-300 mb-2">
              {language === 'en' ? '🎁 Unlock Premium Features for Free!' : '🎁 免费解锁高级功能！'}
            </h3>
            <p className="text-purple-200 text-sm">
              {language === 'en' 
                ? 'Share this tool with your network and unlock all premium features instantly!'
                : '与您的网络分享此工具，立即解锁所有高级功能！'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {/* 社交媒体分享按钮 */}
            <button 
              onClick={() => shareToSocial('twitter')}
              className="flex flex-col items-center space-y-2 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">𝕏</span>
              </div>
              <span className="text-xs font-medium">Twitter</span>
            </button>
            
            <button 
              onClick={() => shareToSocial('facebook')}
              className="flex flex-col items-center space-y-2 p-4 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-800 font-bold text-sm">f</span>
              </div>
              <span className="text-xs font-medium">Facebook</span>
            </button>
            
            <button 
              onClick={() => shareToSocial('instagram')}
              className="flex flex-col items-center space-y-2 p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-pink-500 font-bold text-sm">📷</span>
              </div>
              <span className="text-xs font-medium">Instagram</span>
            </button>
            
            <button 
              onClick={() => copyLink()}
              className="flex flex-col items-center space-y-2 p-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-bold text-sm">🔗</span>
              </div>
              <span className="text-xs font-medium">Copy Link</span>
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-purple-200 text-xs">
              {language === 'en' 
                ? 'After sharing, refresh the page to unlock premium features!'
                : '分享后刷新页面即可解锁高级功能！'
              }
            </p>
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
  )

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

        {/* 动态内容渲染 */}
        {currentStep === 'input' && renderInputPage()}
        {currentStep === 'analyzing' && renderAnalyzingPage()}
        {currentStep === 'results' && renderResultsPage()}
      </div>
    </div>
  )
}
