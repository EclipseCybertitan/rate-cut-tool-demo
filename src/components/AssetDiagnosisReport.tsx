import { useState, useEffect } from 'react'
import { 
  XMarkIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

interface AssetDiagnosisReportProps {
  isOpen: boolean
  onClose: () => void
  assetData: {
    localInput: any
    totalAssets: number
    selectedMethodology: string
    selectedRiskLevel: string
    deviations: any
    recommendedAllocation: any
  }
}

interface DiagnosisResult {
  overallScore: number
  riskLevel: string
  recommendations: string[]
  urgentActions: string[]
  longTermStrategy: string[]
  marketOutlook: string
}

export default function AssetDiagnosisReport({ isOpen, onClose, assetData }: AssetDiagnosisReportProps) {
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // 使用isGenerating状态来控制加载动画
  useEffect(() => {
    if (isGenerating) {
      // 可以在这里添加额外的加载逻辑
    }
  }, [isGenerating])
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'results' | 'export'>('analyzing')

  useEffect(() => {
    if (isOpen && assetData) {
      generateDiagnosis()
    }
  }, [isOpen, assetData])

  // 资产诊断算法
  const generateDiagnosis = async () => {
    setIsGenerating(true)
    setCurrentStep('analyzing')
    
    // 模拟分析过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const result = analyzeAssetPortfolio(assetData)
    setDiagnosisResult(result)
    setCurrentStep('results')
    setIsGenerating(false)
  }

  // 核心诊断算法
  const analyzeAssetPortfolio = (data: any): DiagnosisResult => {
    const { localInput, totalAssets, selectedMethodology, selectedRiskLevel, deviations } = data
    
    // 计算综合评分
    let overallScore = 100
    let riskLevel = 'Low'
    const recommendations: string[] = []
    const urgentActions: string[] = []
    const longTermStrategy: string[] = []
    
    // 分析资产配置偏差
    if (deviations) {
      Object.entries(deviations).forEach(([asset, deviation]) => {
        const absDeviation = Math.abs(deviation as number)
        
        if (absDeviation > 25) {
          overallScore -= 20
          urgentActions.push(`Immediate adjustment needed for ${asset} allocation`)
        } else if (absDeviation > 10) {
          overallScore -= 10
          recommendations.push(`Consider adjusting ${asset} allocation`)
        }
      })
    }
    
    // 分析风险分布
    const equityRatio = (localInput.equity / totalAssets) * 100
    const realEstateRatio = (localInput.realEstate / totalAssets) * 100
    const cashRatio = (localInput.cash / totalAssets) * 100
    
    if (equityRatio > 70) {
      overallScore -= 15
      recommendations.push('High equity concentration - consider diversification')
    }
    
    if (realEstateRatio > 50) {
      overallScore -= 10
      recommendations.push('Real estate overweight - liquidity risk')
    }
    
    if (cashRatio < 5) {
      overallScore -= 10
      urgentActions.push('Insufficient cash buffer - emergency fund needed')
    }
    
    // 确定风险等级
    if (overallScore >= 80) riskLevel = 'Low'
    else if (overallScore >= 60) riskLevel = 'Medium'
    else riskLevel = 'High'
    
    // 长期策略建议
    if (selectedMethodology === 'academic') {
      longTermStrategy.push('Focus on long-term value investing principles')
      longTermStrategy.push('Maintain CAPM-based portfolio theory')
    } else if (selectedMethodology === 'business') {
      longTermStrategy.push('Implement quantitative trading strategies')
      longTermStrategy.push('Use market timing for tactical adjustments')
    } else {
      longTermStrategy.push('Leverage behavioral finance insights')
      longTermStrategy.push('Contrarian investment approach')
    }
    
    // 市场展望
    const marketOutlook = getMarketOutlook(selectedRiskLevel, overallScore)
    
    return {
      overallScore: Math.max(0, overallScore),
      riskLevel,
      recommendations,
      urgentActions,
      longTermStrategy,
      marketOutlook
    }
  }

  // 市场展望算法
  const getMarketOutlook = (_riskLevel: string, score: number): string => {
    if (score >= 80) {
      return 'Portfolio well-positioned for current market conditions. Maintain strategic allocation with minor tactical adjustments.'
    } else if (score >= 60) {
      return 'Portfolio requires moderate restructuring. Focus on risk management and rebalancing opportunities.'
    } else {
      return 'Portfolio needs significant restructuring. Consider professional financial advice and immediate risk mitigation.'
    }
  }

  // 生成PDF报告
  const generatePDF = () => {
    setCurrentStep('export')
    // TODO: 集成PDF生成库
    console.log('Generating PDF report...')
  }

  // 发送邮件
  const sendEmail = () => {
    // TODO: 集成邮件发送服务
    console.log('Sending email report...')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Asset Diagnosis Report</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {currentStep === 'analyzing' && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-white mb-2">Analyzing Portfolio</h3>
              <p className="text-gray-400">Running comprehensive asset diagnosis algorithms...</p>
            </div>
          )}

          {currentStep === 'results' && diagnosisResult && (
            <div className="space-y-6">
              {/* 综合评分 */}
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-xl border border-blue-600/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Portfolio Health Score</h3>
                  <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                    diagnosisResult.overallScore >= 80 ? 'bg-green-500/20 text-green-400' :
                    diagnosisResult.overallScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {diagnosisResult.riskLevel} Risk
                  </div>
                </div>
                
                {/* 评分环形图 */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${diagnosisResult.overallScore}, 100`}
                        className="text-blue-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{diagnosisResult.overallScore}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-gray-300">
                  {diagnosisResult.overallScore >= 80 ? 'Excellent portfolio health' :
                   diagnosisResult.overallScore >= 60 ? 'Good portfolio with room for improvement' :
                   'Portfolio requires immediate attention'}
                </p>
              </div>

              {/* 紧急行动 */}
              {diagnosisResult.urgentActions.length > 0 && (
                <div className="bg-red-900/20 p-6 rounded-xl border border-red-600/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-400" />
                    <h3 className="text-xl font-semibold text-white">Urgent Actions Required</h3>
                  </div>
                  <ul className="space-y-2">
                    {diagnosisResult.urgentActions.map((action, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1">●</span>
                        <span className="text-red-200">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 建议 */}
              {diagnosisResult.recommendations.length > 0 && (
                <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-600/30">
                  <div className="flex items-center space-x-3 mb-4">
                    <ChartBarIcon className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Recommendations</h3>
                  </div>
                  <ul className="space-y-2">
                    {diagnosisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-green-400 mt-1">●</span>
                        <span className="text-red-200">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 长期策略 */}
              <div className="bg-green-900/20 p-6 rounded-xl border border-green-600/30">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircleIcon className="w-6 h-6 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Long-term Strategy</h3>
                </div>
                <ul className="space-y-2">
                  {diagnosisResult.longTermStrategy.map((strategy, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-400 mt-1">●</span>
                      <span className="text-green-200">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 市场展望 */}
              <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-600/30">
                <h3 className="text-xl font-semibold text-white mb-4">Market Outlook</h3>
                <p className="text-purple-200 leading-relaxed">{diagnosisResult.marketOutlook}</p>
              </div>

              {/* 操作按钮 */}
              <div className="flex space-x-4">
                <button
                  onClick={generatePDF}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  <span>Generate PDF Report</span>
                </button>
                <button
                  onClick={sendEmail}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  <span>Send to Email</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 'export' && (
            <div className="text-center py-12">
              <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Report Generated Successfully</h3>
              <p className="text-gray-400 mb-6">Your comprehensive asset diagnosis report is ready.</p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setCurrentStep('results')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back to Results</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
