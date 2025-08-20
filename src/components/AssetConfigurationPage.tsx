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
  InformationCircleIcon,
  ChartBarIcon as AnalysisIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import AssetDiagnosisReport from './AssetDiagnosisReport'

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
  selectedMethodology: string
  selectedRiskLevel: 'low' | 'medium' | 'high'
}

interface AssetCategory {
  id: string
  name: string
  icon: any
  color: string
  description: string
  examples: string[]
  tooltip: string
  options?: AssetOption[]
  isPremium?: boolean
}

interface AssetOption {
  id: string
  name: string
  description: string
  backtestData?: any
}

export default function AssetConfigurationPage({ 
  onBack, 
  onNext, 
  assetInput, 
  onAssetChange,
  selectedMethodology,
  selectedRiskLevel
}: AssetConfigurationPageProps) {
  const { language } = useLanguage()
  const [localInput, setLocalInput] = useState(assetInput)
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('')
  const [ignoreAgeRecommendation, setIgnoreAgeRecommendation] = useState(false)
  const [showAssetDiagnosis, setShowAssetDiagnosis] = useState(false)


  // 计算推荐配置数据
  const selectedBeliefData = {
    riskLevels: {
      low: {
        realEstate: 36,
        equity: 30,
        cash: 20,
        fund: 10,
        crypto: 1,
        insurance: 3
      },
      medium: {
        realEstate: 25,
        equity: 50,
        cash: 15,
        fund: 5,
        crypto: 2,
        insurance: 3
      },
      high: {
        realEstate: 14,
        equity: 70,
        cash: 5,
        fund: 5,
        crypto: 3,
        insurance: 3
      }
    }
  }

  // 年龄参数风险模型 - 在不可见位置进行参数调优（用于未来扩展）
  // const ageRiskModel = {
  //   // 年龄组风险调整系数
  //   riskAdjustmentFactors: {
  //     young: { equity: 1.2, realEstate: 0.8, crypto: 1.3, cash: 0.9, fund: 1.1, insurance: 0.9 },
  //     middle: { equity: 1.0, realEstate: 1.0, crypto: 1.0, cash: 1.0, fund: 1.0, insurance: 1.0 },
  //     senior: { equity: 0.8, realEstate: 1.2, crypto: 0.7, cash: 1.1, fund: 0.9, insurance: 1.1 },
  //     elderly: { equity: 0.6, realEstate: 1.4, crypto: 0.5, cash: 1.2, fund: 0.8, insurance: 1.2 }
  //   },
  //   
  //   // 年龄组时间偏好调整
  //   timeHorizonAdjustments: {
  //     young: { shortTerm: 0.3, mediumTerm: 0.4, longTerm: 0.3 },
  //     middle: { shortTerm: 0.2, mediumTerm: 0.5, longTerm: 0.3 },
  //     senior: { shortTerm: 0.4, mediumTerm: 0.4, longTerm: 0.2 },
  //     elderly: { shortTerm: 0.5, mediumTerm: 0.3, longTerm: 0.2 }
  //   },
  //   
  //   // 年龄组流动性偏好
  //   liquidityPreferences: {
  //     young: { high: 0.3, medium: 0.5, low: 0.2 },
  //     middle: { high: 0.2, medium: 0.6, low: 0.2 },
  //     senior: { high: 0.4, medium: 0.4, low: 0.2 },
  //     elderly: { high: 0.5, medium: 0.3, low: 0.2 }
  //   }
  // }

  // 基于年龄的风险调整函数（内部使用，不对外显示）
  // const getAgeAdjustedRiskLevel = () => {
  //   if (ignoreAgeRecommendation || !selectedAgeGroup) {
  //     return selectedRiskLevel
  //   }

  //   // 年龄风险调整逻辑
  //   switch (selectedAgeGroup) {
  //     case 'young': // 25-35岁
  //       return selectedRiskLevel === 'low' ? 'medium' : selectedRiskLevel === 'medium' ? 'high' : 'high'
  //     case 'middle': // 36-50岁
  //       return selectedRiskLevel
  //     case 'senior': // 51-65岁
  //       return selectedRiskLevel === 'high' ? 'medium' : selectedRiskLevel === 'medium' ? 'low' : 'low'
  //     case 'elderly': // 65岁以上
  //       return selectedRiskLevel === 'high' ? 'low' : selectedRiskLevel === 'medium' ? 'low' : 'low'
  //     default:
  //       return selectedRiskLevel
  //   }
  // }

  // 获取年龄调整后的配置（用于未来扩展）
  // const getAgeAdjustedConfig = () => {
  //   const adjustedRiskLevel = getAgeAdjustedRiskLevel()
  //   return selectedBeliefData.riskLevels[adjustedRiskLevel]
  // }

  // 年龄组配置
  const ageGroups = [
    { value: 'young', label: { en: '25-35 years', zh: '25-35岁' }, description: { en: 'Young professional, can take higher risks', zh: '年轻专业人士，可承担较高风险' } },
    { value: 'middle', label: { en: '36-50 years', zh: '36-50岁' }, description: { en: 'Mid-career, balanced risk approach', zh: '职业生涯中期，平衡风险策略' } },
    { value: 'senior', label: { en: '51-65 years', zh: '51-65岁' }, description: { en: 'Pre-retirement, moderate risk', zh: '退休前，适度风险' } },
    { value: 'elderly', label: { en: '65+ years', zh: '65岁以上' }, description: { en: 'Retirement age, conservative approach', zh: '退休年龄，保守策略' } }
  ]

  // 综合评价函数
  const getAssessmentLevel = () => {
    if (!deviations) return 'Analyzing...'
    
    const maxDeviation = Math.max(...Object.values(deviations).map(d => Math.abs(d)))
    
    if (maxDeviation <= 10) return 'Strong Recommendation'
    if (maxDeviation <= 25) return 'Recommendation'
    return 'Asset Diagnosis Required'
  }

  const getAssessmentColor = () => {
    if (!deviations) return 'text-gray-400'
    
    const maxDeviation = Math.max(...Object.values(deviations).map(d => Math.abs(d)))
    
    if (maxDeviation <= 10) return 'text-green-400'
    if (maxDeviation <= 25) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getAssessmentStyle = () => {
    if (!deviations) return 'bg-gray-800'
    
    const maxDeviation = Math.max(...Object.values(deviations).map(d => Math.abs(d)))
    
    if (maxDeviation <= 10) return 'bg-green-900/30'
    if (maxDeviation <= 25) return 'bg-yellow-900/30'
    return 'bg-red-900/30'
  }

  const assetCategories: AssetCategory[] = [
    {
      id: 'realEstate',
      name: language === 'en' ? 'Real Estate' : '房产估值',
      icon: HomeIcon,
      color: 'from-green-500 to-emerald-500',
      description: language === 'en' ? 'Real estate investment including residential and commercial properties' : '房地产投资，包括住宅、商业地产等',
      examples: language === 'en' ? ['Residential', 'Commercial', 'Land', 'REITs'] : ['住宅房产', '商业地产', '土地投资', 'REITs'],
      tooltip: language === 'en' ? 'Real estate performs well in rate-cut environments, with lower mortgage costs driving demand growth' : '房产在降息环境下通常表现良好，房贷成本下降推动需求增长',
      options: [
        { id: 'california', name: language === 'en' ? 'California' : '加利福尼亚州', description: language === 'en' ? 'High growth, high volatility' : '高增长，高波动' },
        { id: 'newyork', name: language === 'en' ? 'New York' : '纽约州', description: language === 'en' ? 'Stable, premium market' : '稳定，高端市场' },
        { id: 'texas', name: language === 'en' ? 'Texas' : '德克萨斯州', description: language === 'en' ? 'Affordable, growing market' : '可负担，增长市场' },
        { id: 'florida', name: language === 'en' ? 'Florida' : '佛罗里达州', description: language === 'en' ? 'Retirement destination, seasonal' : '退休目的地，季节性' },
        { id: 'washington', name: language === 'en' ? 'Washington' : '华盛顿州', description: language === 'en' ? 'Tech hub, strong growth' : '科技中心，强劲增长' }
      ],
      isPremium: true
    },
    {
      id: 'equity',
      name: language === 'en' ? 'Equity' : '股票估值',
      icon: ChartBarIcon,
      color: 'from-blue-500 to-cyan-500',
      description: language === 'en' ? 'Stock investment portfolio including individual stocks and index funds' : '股票投资组合，包括个股、指数基金等',
      examples: language === 'en' ? ['Individual Stocks', 'Index Funds', 'Sector ETFs', 'Growth Stocks'] : ['个股投资', '指数基金', '行业ETF', '成长股'],
      tooltip: language === 'en' ? 'Stocks perform strongly in rate-cut cycles with lower financing costs and valuation expansion' : '降息周期中股票表现强劲，企业融资成本下降，估值扩张',
      options: [
        { id: 'sp500', name: 'S&P 500', description: language === 'en' ? 'Large-cap US stocks' : '美国大盘股' },
        { id: 'nasdaq', name: 'NASDAQ', description: language === 'en' ? 'Technology-focused index' : '科技股指数' },
        { id: 'dow', name: 'Dow Jones', description: language === 'en' ? 'Blue-chip industrial stocks' : '蓝筹工业股' },
        { id: 'russell2000', name: 'Russell 2000', description: language === 'en' ? 'Small-cap US stocks' : '美国小盘股' },
        { id: 'international', name: language === 'en' ? 'International' : '国际股票', description: language === 'en' ? 'Global diversification' : '全球多样化' }
      ],
      isPremium: true
    },
    {
      id: 'cash',
      name: language === 'en' ? 'Cash' : '现金估值',
      icon: CurrencyDollarIcon,
      color: 'from-yellow-500 to-orange-500',
      description: language === 'en' ? 'Cash and cash equivalents including various deposit products' : '现金及现金等价物，包括各类存款产品',
      examples: language === 'en' ? ['Fed Products', 'Time Deposits', 'Money Funds', 'Demand Deposits', 'Savings'] : ['美联储产品', '定期存款', '货币基金', '活期存款', '储蓄账户'],
      tooltip: language === 'en' ? 'Cash yields decline in rate-cut environments but provide liquidity and safety' : '现金在降息环境下收益率下降，但提供流动性和安全性'
    },
    {
      id: 'fund',
      name: language === 'en' ? 'Funds' : '基金产品',
      icon: BuildingLibraryIcon,
      color: 'from-purple-500 to-pink-500',
      description: language === 'en' ? 'Various investment funds with professional portfolio management' : '各类投资基金，专业管理的投资组合',
      examples: language === 'en' ? ['Stock Funds', 'Bond Funds', 'ETF Funds', 'Mixed Funds', 'Index Funds'] : ['股票基金', '债券基金', 'ETF基金', '混合基金', '指数基金'],
      tooltip: language === 'en' ? 'Fund products provide professional management with differentiated performance in rate-cut environments' : '基金产品提供专业管理，在降息环境下表现分化'
    },
    {
      id: 'crypto',
      name: language === 'en' ? 'Cryptocurrency' : '虚拟货币',
      icon: CryptoIcon,
      color: 'from-orange-500 to-red-500',
      description: language === 'en' ? 'Digital currency investment including mainstream coins and tokens' : '数字货币投资，包括主流币种和代币',
      examples: language === 'en' ? ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Stablecoins', 'DeFi Tokens', 'NFTs'] : ['比特币(BTC)', '以太坊(ETH)', '稳定币', 'DeFi代币', 'NFT'],
      tooltip: language === 'en' ? 'Cryptocurrency risk appetite rises in rate-cut environments but with high volatility' : '虚拟货币在降息环境下风险偏好上升，但波动性极高',
      options: [
        { id: 'btc', name: 'Bitcoin (BTC)', description: language === 'en' ? 'Digital gold, store of value' : '数字黄金，价值存储' },
        { id: 'eth', name: 'Ethereum (ETH)', description: language === 'en' ? 'Smart contract platform' : '智能合约平台' }
      ]
    },
    {
      id: 'insurance',
      name: language === 'en' ? 'Insurance' : '保险产品',
      icon: ShieldCheckIcon,
      color: 'from-red-500 to-pink-500',
      description: language === 'en' ? 'Investment-linked insurance products with dual financial and protection functions' : '投资型保险产品，具有理财和保障双重功能',
      examples: language === 'en' ? ['Investment-linked Insurance', 'Dividend Insurance', 'Universal Insurance', 'Annuity Insurance', 'Retirement Savings'] : ['投资连结保险', '分红保险', '万能保险', '年金保险', '退休储蓄保险'],
      tooltip: language === 'en' ? 'Investment insurance yields decline in rate-cut environments but provide protection functions' : '投资型保险在降息环境下收益率下降，但提供保障功能',
      options: [
        { id: 'variable', name: language === 'en' ? 'Variable Life' : '变额寿险', description: language === 'en' ? 'Investment-linked life insurance' : '投资连结寿险' },
        { id: 'universal', name: language === 'en' ? 'Universal Life' : '万能寿险', description: language === 'en' ? 'Flexible premium life insurance' : '灵活保费寿险' },
        { id: 'annuity', name: language === 'en' ? 'Annuity' : '年金保险', description: language === 'en' ? 'Retirement income stream' : '退休收入流' },
        { id: 'longterm', name: language === 'en' ? 'Long-term Care' : '长期护理', description: language === 'en' ? 'Healthcare coverage' : '医疗保健覆盖' }
      ]
    },
    {
      id: 'gold',
      name: language === 'en' ? 'Gold' : '黄金',
      icon: SparklesIcon,
      color: 'from-yellow-400 to-amber-600',
      description: language === 'en' ? 'Precious metal investment and hedge against inflation' : '贵金属投资，通胀对冲',
      examples: language === 'en' ? ['Physical Gold', 'Gold ETFs', 'Gold Mining Stocks', 'Gold Futures'] : ['实物黄金', '黄金ETF', '金矿股', '黄金期货'],
      tooltip: language === 'en' ? 'Gold serves as a safe haven and inflation hedge in uncertain economic conditions' : '黄金在经济不确定条件下作为避险资产和通胀对冲',
      options: [
        { id: 'physical', name: language === 'en' ? 'Physical Gold' : '实物黄金', description: language === 'en' ? 'Bars, coins, jewelry' : '金条、金币、首饰' },
        { id: 'etf', name: language === 'en' ? 'Gold ETFs' : '黄金ETF', description: language === 'en' ? 'Exchange-traded gold funds' : '交易所交易黄金基金' },
        { id: 'mining', name: language === 'en' ? 'Mining Stocks' : '金矿股', description: language === 'en' ? 'Gold mining company stocks' : '金矿公司股票' }
      ]
    },
    {
      id: 'international',
      name: language === 'en' ? 'International Markets' : '海外市场',
      icon: BuildingLibraryIcon,
      color: 'from-indigo-500 to-purple-600',
      description: language === 'en' ? 'International stock markets and emerging markets' : '国际股票市场和新兴市场',
      examples: language === 'en' ? ['European Markets', 'Asian Markets', 'Emerging Markets', 'Global ETFs'] : ['欧洲市场', '亚洲市场', '新兴市场', '全球ETF'],
      tooltip: language === 'en' ? 'International markets provide geographic diversification and growth opportunities' : '海外市场提供地理多样化和增长机会',
      options: [
        { id: 'europe', name: language === 'en' ? 'Europe' : '欧洲', description: language === 'en' ? 'Developed European markets' : '发达欧洲市场' },
        { id: 'asia', name: language === 'en' ? 'Asia Pacific' : '亚太', description: language === 'en' ? 'Asia Pacific markets' : '亚太市场' },
        { id: 'emerging', name: language === 'en' ? 'Emerging Markets' : '新兴市场', description: language === 'en' ? 'High growth emerging economies' : '高增长新兴经济体' },
        { id: 'global', name: language === 'en' ? 'Global' : '全球', description: language === 'en' ? 'Worldwide market exposure' : '全球市场敞口' }
      ],
      isPremium: true
    }
  ]

  const handleInputChange = (field: keyof typeof localInput, value: string) => {
    const numValue = parseFloat(value) || 0
    const newInput = { ...localInput, [field]: numValue }
    setLocalInput(newInput)
    onAssetChange(newInput)
  }

  const totalAssets = Object.values(localInput).reduce((sum, value) => sum + value, 0)

  // 根据投资哲学和风险等级计算推荐配置
  const getRecommendedAllocation = () => {
    if (!selectedMethodology) return null
    
    const baseAllocations: Record<string, Record<string, Record<string, number>>> = {
      academic: {
        low: { realEstate: 36, equity: 30, cash: 20, fund: 10, crypto: 1, insurance: 3 },
        medium: { realEstate: 25, equity: 50, cash: 15, fund: 5, crypto: 2, insurance: 3 },
        high: { realEstate: 14, equity: 70, cash: 5, fund: 5, crypto: 3, insurance: 3 }
      },
      business: {
        low: { realEstate: 29, equity: 40, cash: 15, fund: 10, crypto: 3, insurance: 3 },
        medium: { realEstate: 16, equity: 60, cash: 10, fund: 5, crypto: 6, insurance: 3 },
        high: { realEstate: 3, equity: 75, cash: 5, fund: 5, crypto: 9, insurance: 3 }
      },
      psychologic: {
        low: { realEstate: 17, equity: 35, cash: 20, fund: 15, crypto: 10, insurance: 3 },
        medium: { realEstate: 12, equity: 40, cash: 15, fund: 15, crypto: 15, insurance: 3 },
        high: { realEstate: 7, equity: 35, cash: 10, fund: 15, crypto: 30, insurance: 3 }
      }
    }
    
    return baseAllocations[selectedMethodology]?.[selectedRiskLevel] || null
  }

  const recommendedAllocation = getRecommendedAllocation()

  // 计算配置偏差
  const calculateDeviation = () => {
    if (!recommendedAllocation || totalAssets === 0) return null
    
    const deviations: Record<string, number> = {}
    Object.keys(recommendedAllocation).forEach(asset => {
      const recommended = (recommendedAllocation[asset as keyof typeof recommendedAllocation] / 100) * totalAssets
      const actual = localInput[asset as keyof typeof localInput] || 0
      
      // 防止除零错误，当推荐值为0时，使用绝对值偏差
      let deviation: number
      if (recommended === 0) {
        // 如果推荐值为0，但实际有值，偏差为+100%
        // 如果推荐值为0，实际也为0，偏差为0%
        deviation = actual > 0 ? 100 : 0
      } else {
        deviation = ((actual - recommended) / recommended) * 100
        // 限制偏差范围，避免无穷大
        deviation = Math.max(-1000, Math.min(1000, deviation))
      }
      
      deviations[asset] = deviation
    })
    
    return deviations
  }

  const deviations = calculateDeviation()

  const getAssetPercentage = (value: number) => {
    if (totalAssets === 0) return 0
    return (value / totalAssets) * 100
  }

  // 计算风险等级（已移除，使用综合评价系统）
  // const getRiskLevel = () => {
  //   const aggressiveAssets = localInput.equity + localInput.crypto
  //   const conservativeAssets = localInput.cash + localInput.insurance
  //   // const balancedAssets = localInput.realEstate + localInput.fund
  //   
  //   const aggressiveRatio = (aggressiveAssets / totalAssets) * 100
  //   const conservativeRatio = (conservativeAssets / totalAssets) * 100
  //   
  //   if (aggressiveRatio > 60) return { level: '高风险', color: 'text-red-400', bg: 'bg-red-900/20' }
  //   if (conservativeRatio > 60) return { level: '低风险', color: 'text-green-400', bg: 'bg-green-900/20' }
  //   return { level: '中风险', color: 'text-yellow-400', bg: 'bg-green-900/20' }
  // }

  // const riskProfile = getRiskLevel()

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
            {language === 'en' ? 'Back to Methodology' : '返回方法论'}
          </button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            {language === 'en' ? 'Asset Configuration Input' : '资产配置输入'}
          </h1>
          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        {/* 投资策略匹配分析 */}
        {selectedMethodology && (
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-2xl border border-green-600/30 mb-8">
            <div className="flex items-start">
              <AnalysisIcon className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
              <div className="text-green-200 w-full">
                <h3 className="text-lg font-semibold mb-4">
                  🎯 Investment Strategy Analysis
                </h3>
                
                {/* 基础策略信息 */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-800/20 p-4 rounded-lg border border-green-600/30">
                    <h4 className="font-semibold text-green-300 mb-2">
                      {language === 'en' ? 'Investment Philosophy' : '投资哲学'}
                    </h4>
                    <p className="text-white text-sm">
                      {selectedMethodology === 'academic' ? 
                        'Academic School - Based on rigorous financial theory and long-term value investment principles' :
                       selectedMethodology === 'business' ? 
                        'Business Practical School - Focus on market timing and quantitative trading strategies' : 
                        'Psychological History School - Leveraging market sentiment and behavioral finance insights'}
                    </p>
                  </div>
                  
                  <div className="bg-green-800/20 p-4 rounded-lg border border-green-600/30">
                    <h4 className="font-semibold text-green-300 mb-2">
                      {language === 'en' ? 'Risk Profile' : '风险档案'}
                    </h4>
                    <p className="text-white text-sm">
                      {selectedRiskLevel === 'low' ? 
                        'Conservative Strategy - Capital preservation with stable returns' :
                       selectedRiskLevel === 'medium' ? 
                        'Balanced Strategy - Moderate risk with growth potential' : 
                        'Aggressive Strategy - Higher risk for maximum growth'}
                    </p>
                  </div>
                </div>

                {/* 年龄风险调整建议 */}
                <div className="bg-blue-800/20 p-4 rounded-lg border border-blue-600/30 mb-4">
                  <h4 className="font-semibold text-blue-300 mb-3">
                    Age-Based Risk Adjustment
                  </h4>
                  
                  {/* 年龄选择 */}
                  <div className="grid md:grid-cols-4 gap-3 mb-4">
                    {ageGroups.map((ageGroup) => (
                      <label key={ageGroup.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="ageGroup"
                          value={ageGroup.value}
                          checked={selectedAgeGroup === ageGroup.value}
                          onChange={(e) => setSelectedAgeGroup(e.target.value)}
                          className="text-blue-500"
                        />
                        <div className="text-sm">
                          <div className="text-white font-medium">
                            {language === 'en' ? ageGroup.label.en : ageGroup.label.zh}
                          </div>
                          <div className="text-blue-200 text-xs">
                            {language === 'en' ? ageGroup.description.en : ageGroup.description.zh}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* 年龄调整说明 */}
                  {selectedAgeGroup && (
                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                      <div className="flex items-center justify-between">
                        <div className="text-blue-200 text-sm">
                          <span className="font-semibold">
                            Age Parameters:
                          </span>
                          <span className="text-white ml-2">
                            {selectedAgeGroup === 'young' ? 'Young Professional' :
                             selectedAgeGroup === 'middle' ? 'Mid-Career' :
                             selectedAgeGroup === 'senior' ? 'Pre-Retirement' : 'Retirement Age'}
                          </span>
                        </div>
                        <button
                          onClick={() => setIgnoreAgeRecommendation(!ignoreAgeRecommendation)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            ignoreAgeRecommendation
                              ? 'bg-yellow-600 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Ignore Age
                        </button>
                      </div>
                      {!ignoreAgeRecommendation && (
                        <p className="text-blue-200 text-xs mt-2">
                          Age-based adjustments will optimize asset allocation parameters for your life stage
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 策略特点总结 */}
                <div className="bg-purple-800/20 p-4 rounded-lg border border-purple-600/30">
                  <h4 className="font-semibold text-purple-300 mb-2">
                    Strategy Highlights
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-purple-200">
                        Crypto Allocation: 
                      </span>
                      <span className="text-white">
                        {selectedMethodology === 'academic' ? '1%' : 
                         selectedMethodology === 'business' ? '5%' : '7%'}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-purple-200">
                        Focus Area: 
                      </span>
                      <span className="text-white">
                        {selectedMethodology === 'academic' ? 'Long-term value, CAPM theory' : 
                         selectedMethodology === 'business' ? 'Market timing, quantitative' : 
                         'Sentiment analysis, contrarian'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 资产配置说明 */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-600/30 mb-8">
          <div className="flex items-start">
            <InformationCircleIcon className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
            <div className="text-blue-200">
              <h3 className="text-lg font-semibold mb-2">
                💡 Asset Classification Guide
              </h3>
              <p className="text-sm leading-relaxed">
                Please accurately input your asset allocation according to the following categories. Each input field has detailed descriptions and examples to help you correctly classify various assets. The system will provide precise rate-cut scenario analysis based on your configuration.
              </p>
            </div>
          </div>
        </div>

        {/* 资产配置表单 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* 左侧：基础资产 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-6">
              🏠 Core Assets
            </h3>
            
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
                      <strong>Contains:</strong> {category.examples.join(', ')}
                    </div>
                    <div className="text-sm text-blue-300 mt-2">
                      <strong>Rate Cut Impact:</strong> {category.tooltip}
                    </div>
                  </div>
                )}
                
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={localInput[category.id as keyof typeof localInput] || ''}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value)
                    if (value >= 0 || e.target.value === '') {
                      handleInputChange(category.id as keyof typeof localInput, e.target.value)
                    }
                  }}
                  placeholder={`Enter ${category.name}`}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            ))}
          </div>

          {/* 右侧：扩展资产 */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-purple-300 mb-6">
              🚀 Extended Assets
            </h3>
            
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
                  min="0"
                  step="0.01"
                  value={localInput[category.id as keyof typeof localInput] || ''}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value)
                    if (value >= 0 || e.target.value === '') {
                      handleInputChange(category.id as keyof typeof localInput, e.target.value)
                    }
                  }}
                  placeholder={`Enter ${category.name}`}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 策略匹配分析 */}
        {totalAssets > 0 && recommendedAllocation && (
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-2xl border border-purple-600/30 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-3 text-purple-400" />
              Strategy Match Analysis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* 推荐配置 */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-purple-300">🎯 Recommended Allocation</h4>
                <div className="space-y-4">
                  {Object.entries(recommendedAllocation).map(([asset, percentage]) => {
                    const currentValue = localInput[asset as keyof typeof localInput] || 0
                    const currentPercentage = totalAssets > 0 ? (currentValue / totalAssets) * 100 : 0
                    const deviation = ((currentPercentage - percentage) / percentage) * 100
                    
                    return (
                      <div key={asset} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize text-sm font-medium">
                            {asset === 'realEstate' ? 'Real Estate' : 
                             asset === 'equity' ? 'Equity' : 
                             asset === 'cash' ? 'Cash' : 
                             asset === 'fund' ? 'Funds' : 
                             asset === 'crypto' ? 'Crypto' : 'Insurance'}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium text-sm">{percentage}%</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              Math.abs(deviation) <= 10 ? 'bg-green-500/20 text-green-400' :
                              Math.abs(deviation) <= 25 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        {/* 先进动态条形图 */}
                        <div className="relative">
                          {/* 推荐配置条形图 */}
                          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out relative"
                              style={{ width: `${percentage}%` }}
                            >
                              {/* 动态光效 */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                              {/* 科技感装饰 */}
                              <div className="absolute right-0 top-0 w-1 h-3 bg-white/30 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* 当前配置指示器 - 只在有值且不为0时显示 */}
                          {currentPercentage > 0 && (
                            <>
                              <div 
                                className="absolute top-0 w-1 h-3 bg-white border border-gray-300 rounded-full transform -translate-y-0.5 transition-all duration-500 ease-out"
                                style={{ left: `${Math.min(currentPercentage, 100)}%` }}
                              >
                                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full border-2 border-blue-400 animate-ping"></div>
                              </div>
                              
                              {/* 百分比标签 - 只在有值且不为0时显示 */}
                              <div className="absolute -top-6 text-xs text-gray-400" style={{ left: `${Math.min(currentPercentage, 100)}%` }}>
                                {currentPercentage.toFixed(1)}%
                              </div>
                            </>
                          )}
                        </div>
                        
                        {/* 对比说明 */}
                        <div className="text-xs text-gray-400 ml-2">
                          {Math.abs(deviation) <= 10 ? '✅ Optimal' : 
                           Math.abs(deviation) <= 25 ? '⚠️ Consider adjustment' : '🚨 Significant deviation'}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              {/* 偏差分析 */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-purple-300">
                  📊 Configuration Deviation Analysis
                </h4>
                <div className="space-y-3">
                  {deviations && Object.entries(deviations).map(([asset, deviation]) => {
                    const currentValue = localInput[asset as keyof typeof localInput] || 0
                    const recommendedValue = totalAssets * (selectedBeliefData?.riskLevels[selectedRiskLevel][asset as keyof typeof selectedBeliefData.riskLevels[typeof selectedRiskLevel]] || 0) / 100
                    const adjustmentAmount = recommendedValue - currentValue
                    
                    return (
                      <div key={asset} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 capitalize">
                            {asset === 'realEstate' ? 'Real Estate' : 
                             asset === 'equity' ? 'Equity' : 
                             asset === 'cash' ? 'Cash' : 
                             asset === 'fund' ? 'Funds' : 
                             asset === 'crypto' ? 'Crypto' : 'Insurance'}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${
                              Math.abs(deviation) <= 10 ? 'text-green-400' :
                              Math.abs(deviation) <= 25 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}%
                            </span>
                            <div className={`w-2 h-2 rounded-full ${
                              Math.abs(deviation) <= 10 ? 'bg-green-400' :
                              Math.abs(deviation) <= 25 ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></div>
                          </div>
                        </div>
                        
                        {/* 具体金额建议 */}
                        <div className="ml-4 text-sm">
                          {adjustmentAmount > 0 ? (
                            <div className="text-green-400">
                              Recommend increasing by ${adjustmentAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </div>
                          ) : adjustmentAmount < 0 ? (
                            <div className="text-red-400">
                              Recommend reducing by ${Math.abs(adjustmentAmount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </div>
                          ) : (
                            <div className="text-gray-400">
                              Configuration optimal
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                  <div className="text-sm text-gray-300">
                    <p className="mb-2">
                      <span className="text-green-400">●</span> 
                      Deviation ≤10%: Excellent configuration
                    </p>
                    <p className="mb-2">
                      <span className="text-yellow-400">●</span> 
                      Deviation ≤25%: Good configuration
                    </p>
                                          <p>
                        <span className="text-red-400">●</span> 
                        Deviation {'>'}25%: Needs adjustment
                      </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 资产总计和风险分析 */}
        {totalAssets > 0 && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-2xl border border-gray-600 mb-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300 font-semibold text-2xl">Total Assets:</span>
              <span className="font-bold text-4xl text-white">
                ${totalAssets.toLocaleString('en-US')}
              </span>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {/* 基础资产占比 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Core Assets</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Real Estate:</span>
                    <span className="text-green-400 font-medium">
                      {getAssetPercentage(localInput.realEstate).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Equity:</span>
                    <span className="text-blue-400 font-medium">
                      {getAssetPercentage(localInput.equity).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cash:</span>
                    <span className="text-yellow-400 font-medium">
                      {getAssetPercentage(localInput.cash).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 扩展资产占比 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Extended Assets</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Funds:</span>
                    <span className="text-purple-400 font-medium">
                      {getAssetPercentage(localInput.fund).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cryptocurrency:</span>
                    <span className="text-orange-400 font-medium">
                      {getAssetPercentage(localInput.crypto).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Insurance:</span>
                    <span className="text-red-400 font-medium">
                      {getAssetPercentage(localInput.insurance).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 风险分布 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Risk Distribution</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conservative:</span>
                    <span className="text-green-400 font-medium">
                      {getAssetPercentage(localInput.cash + localInput.insurance).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Balanced:</span>
                    <span className="text-blue-400 font-medium">
                      {getAssetPercentage(localInput.realEstate + localInput.fund).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Aggressive:</span>
                    <span className="text-orange-400 font-medium">
                      {getAssetPercentage(localInput.equity + localInput.crypto).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 综合评价 */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400">Comprehensive Assessment</h4>
                <div className={`p-4 rounded-lg ${getAssessmentStyle()} border border-gray-600`}>
                  <div className={`text-center text-2xl font-bold ${getAssessmentColor()}`}>
                    {getAssessmentLevel()}
                  </div>
                  <div className="text-center text-sm text-gray-400 mt-1">
                    Based on deviation analysis
                  </div>
                  <button
                    onClick={() => setShowAssetDiagnosis(true)}
                    className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white text-sm font-medium rounded-lg hover:from-amber-700 hover:via-yellow-600 hover:to-amber-700 transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-xl border border-amber-400/30"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-semibold">Premium Asset Diagnosis</span>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 继续按钮 */}
        <div className="text-center">
          <button
            onClick={onNext}
            disabled={totalAssets === 0 || !selectedMethodology}
            className={`group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-hidden ${
              totalAssets > 0 && selectedMethodology
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center">
              Start Rate Cut Analysis
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-lg">
            {!selectedMethodology ? 'Please select investment philosophy and risk level first' :
             totalAssets === 0 ? 'Please input asset configuration first' : 
             'Configuration complete, start 4-basis point rate cut analysis'}
          </p>
          
          {/* 策略匹配提示 */}
          {totalAssets > 0 && recommendedAllocation && deviations && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-600/30">
              <p className="text-sm text-blue-200 text-center">
                💡 System has generated personalized configuration recommendations based on your investment philosophy and risk level.
                {Object.values(deviations).some(d => Math.abs(d) > 25) && 
                  ' Some asset allocation deviations are significant, consider adjusting based on recommended ratios.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 资产诊断报告 */}
      <AssetDiagnosisReport
        isOpen={showAssetDiagnosis}
        onClose={() => setShowAssetDiagnosis(false)}
        assetData={{
          localInput,
          totalAssets,
          selectedMethodology,
          selectedRiskLevel,
          deviations,
          recommendedAllocation
        }}
      />
    </div>
  )
}
