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
  SparklesIcon,
  StarIcon,
  AcademicCapIcon,
  TrophyIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import AssetDiagnosisReport from './AssetDiagnosisReport'
import AssetRecordingService from '../lib/asset-recording-service'

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

  // 生成会话ID（预留未来后台功能）
  const sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  // 资产数据记录功能
  const recordAssetData = async () => {
    try {
      const assetRecord = {
        session_id: sessionId,
        timestamp: new Date().toISOString(),
        total_assets: totalAssets,
        asset_allocation: {
          realEstate: localInput.realEstate,
          equity: localInput.equity,
          cash: localInput.cash,
          fund: localInput.fund,
          crypto: localInput.crypto,
          insurance: localInput.insurance
        },
        selected_methodology: selectedMethodology,
        selected_risk_level: selectedRiskLevel,
        user_agent: navigator.userAgent,
        language: language
      }

      // 尝试保存到Supabase
      const savedRecord = await AssetRecordingService.recordAssetData(assetRecord)
      
      if (savedRecord) {
        console.log('Asset data saved to Supabase:', savedRecord)
        
        // 同时保存到localStorage作为备份
        const existingRecords = JSON.parse(localStorage.getItem('assetRecords') || '[]')
        existingRecords.push(savedRecord)
        localStorage.setItem('assetRecords', JSON.stringify(existingRecords))
      } else {
        console.log('Failed to save to Supabase, saving to localStorage only')
        
        // 如果Supabase保存失败，只保存到localStorage
        const existingRecords = JSON.parse(localStorage.getItem('assetRecords') || '[]')
        existingRecords.push(assetRecord)
        localStorage.setItem('assetRecords', JSON.stringify(existingRecords))
      }
      
    } catch (error) {
      console.error('Failed to record asset data:', error)
      
      // 错误情况下也保存到localStorage
      try {
        const assetRecord = {
          session_id: sessionId,
          timestamp: new Date().toISOString(),
          total_assets: totalAssets,
          asset_allocation: {
            realEstate: localInput.realEstate,
            equity: localInput.equity,
            cash: localInput.cash,
            fund: localInput.fund,
            crypto: localInput.crypto,
            insurance: localInput.insurance
          },
          selected_methodology: selectedMethodology,
          selected_risk_level: selectedRiskLevel,
          user_agent: navigator.userAgent,
          language: language
        }
        
        const existingRecords = JSON.parse(localStorage.getItem('assetRecords') || '[]')
        existingRecords.push(assetRecord)
        localStorage.setItem('assetRecords', JSON.stringify(existingRecords))
      } catch (localError) {
        console.error('Failed to save to localStorage:', localError)
      }
    }
  }


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

  // 智能配置状态
  const [realEstateExemption, setRealEstateExemption] = useState(false)
  const [debtBurdenLevel, setDebtBurdenLevel] = useState<'low' | 'medium' | 'high'>('low')
  
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
    
    if (maxDeviation <= 10) return language === 'en' ? 'Excellent' : '优秀'
    if (maxDeviation <= 25) return language === 'en' ? 'Good' : '良好'
    return language === 'en' ? 'Needs Optimization' : '需要优化'
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
    
    // 自动记录资产数据（防抖处理）
    setTimeout(() => {
      const totalValue = Object.values(newInput).reduce((sum, val) => sum + val, 0)
      if (totalValue > 0) {
        recordAssetData()
      }
    }, 1000)
  }

  const totalAssets = Object.values(localInput).reduce((sum, value) => sum + value, 0)

  // 智能配置调整函数 - 包含年龄调整逻辑
  const getSmartAdjustedAllocation = (baseAllocation: Record<string, number>) => {
    if (!baseAllocation) return baseAllocation
    
    const adjusted = { ...baseAllocation }
    
    // 年龄调整逻辑 - 只有在未忽略年龄建议时生效
    if (!ignoreAgeRecommendation && selectedAgeGroup) {
      const ageAdjustments = {
        young: {
          // 年轻专业人士：增加风险资产，减少保守资产
          equity: 1.15,    // 股票配置增加15%
          crypto: 1.2,     // 加密货币配置增加20%
          cash: 0.9,       // 现金配置减少10%
          insurance: 0.95  // 保险配置减少5%
        },
        middle: {
          // 职业生涯中期：保持平衡
          equity: 1.0,     // 保持原配置
          crypto: 1.0,
          cash: 1.0,
          insurance: 1.0
        },
        senior: {
          // 退休前：适度保守
          equity: 0.9,     // 股票配置减少10%
          crypto: 0.8,     // 加密货币配置减少20%
          cash: 1.1,       // 现金配置增加10%
          insurance: 1.05  // 保险配置增加5%
        },
        elderly: {
          // 退休年龄：保守策略
          equity: 0.8,     // 股票配置减少20%
          crypto: 0.6,     // 加密货币配置减少40%
          cash: 1.2,       // 现金配置增加20%
          insurance: 1.1   // 保险配置增加10%
        }
      }
      
      const currentAgeAdjustment = ageAdjustments[selectedAgeGroup as keyof typeof ageAdjustments]
      if (currentAgeAdjustment) {
        // 应用年龄调整
        Object.keys(currentAgeAdjustment).forEach(asset => {
          if (adjusted[asset as keyof typeof adjusted] !== undefined) {
            adjusted[asset as keyof typeof adjusted] = Math.round(
              adjusted[asset as keyof typeof adjusted] * currentAgeAdjustment[asset as keyof typeof currentAgeAdjustment]
            )
          }
        })
        
        // 重新平衡总配置为100%
        const total = Object.values(adjusted).reduce((sum, val) => sum + val, 0)
        if (total !== 100) {
          const adjustmentFactor = 100 / total
          Object.keys(adjusted).forEach(asset => {
            if (adjusted[asset as keyof typeof adjusted] !== undefined) {
              adjusted[asset as keyof typeof adjusted] = Math.round(
                adjusted[asset as keyof typeof adjusted] * adjustmentFactor
              )
            }
          })
        }
      }
    }
    
    // 房产豁免逻辑
    if (realEstateExemption) {
      const exemptionRatio = 0.8 // 豁免80%的房产配置
      const maxExemptionAmount = Math.min(50000, totalAssets * 0.5) // 最大豁免5万或总资产50%
      
      if (adjusted.realEstate > 0) {
        const exemptedAmount = Math.min(
          adjusted.realEstate * exemptionRatio,
          maxExemptionAmount / totalAssets * 100
        )
        adjusted.realEstate = Math.max(0, adjusted.realEstate - exemptedAmount)
        
        // 将豁免的配置重新分配给其他资产
        const remainingAssets = ['equity', 'cash', 'fund', 'crypto', 'insurance']
        const redistributionRatio = exemptedAmount / remainingAssets.length
        remainingAssets.forEach(asset => {
          if (adjusted[asset as keyof typeof adjusted] !== undefined) {
            adjusted[asset as keyof typeof adjusted] += redistributionRatio
          }
        })
      }
    }
    
    // 债务负担率调整
    const debtConfig = {
      low: { maxRiskAssets: 0.8, cashBuffer: 0.1 },
      medium: { maxRiskAssets: 0.6, cashBuffer: 0.15 },
      high: { maxRiskAssets: 0.4, cashBuffer: 0.25 }
    }
    
    const currentConfig = debtConfig[debtBurdenLevel]
    
    // 调整现金缓冲
    if (adjusted.cash < currentConfig.cashBuffer * 100) {
      adjusted.cash = currentConfig.cashBuffer * 100
    }
    
    // 限制风险资产（股票+加密货币）
    const riskAssets = adjusted.equity + adjusted.crypto
    const maxRiskAssets = currentConfig.maxRiskAssets * 100
    if (riskAssets > maxRiskAssets) {
      const reduction = riskAssets - maxRiskAssets
      if (adjusted.equity > 0) {
        const equityReduction = Math.min(reduction, adjusted.equity * 0.7)
        adjusted.equity -= equityReduction
        adjusted.cash += equityReduction
      }
      if (adjusted.crypto > 0 && riskAssets - adjusted.equity > maxRiskAssets) {
        const cryptoReduction = Math.min(reduction - adjusted.equity, adjusted.crypto)
        adjusted.crypto -= cryptoReduction
        adjusted.cash += cryptoReduction
      }
    }
    
    return adjusted
  }
  
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
    
    const baseAllocation = baseAllocations[selectedMethodology]?.[selectedRiskLevel] || null
    return baseAllocation ? getSmartAdjustedAllocation(baseAllocation) : null
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

  const getAssetDisplayName = (assetId: string) => {
    const category = assetCategories.find(cat => cat.options?.some(opt => opt.id === assetId));
    if (category) {
      return category.name;
    }
    return assetId.charAt(0).toUpperCase() + assetId.slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* 页面头部 - 优化手机端显示 */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors self-start sm:self-auto"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            <span className="text-sm sm:text-base">
              {language === 'en' ? 'Back to Methodology' : '返回方法论'}
            </span>
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center flex-1">
            {language === 'en' ? 'Asset Configuration Input' : '资产配置输入'}
          </h1>
          {/* 语言切换器 */}
          <div className="self-end sm:self-auto">
            <LanguageSwitcher />
          </div>
        </div>

        {/* 投资策略匹配分析 */}
        {selectedMethodology && (
          <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-4 sm:p-6 rounded-2xl border border-green-600/30 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0">
              <AnalysisIcon className="w-6 h-6 text-green-400 mr-0 sm:mr-3 mt-1 flex-shrink-0 self-center sm:self-start" />
              <div className="text-green-200 w-full text-center sm:text-left">
                <h3 className="text-lg font-semibold mb-4">
                  🎯 {language === 'en' ? 'Investment Strategy Analysis' : '投资策略分析'}
                </h3>
                
                {/* 基础策略信息 - 优化手机端布局 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div className="bg-green-800/20 p-3 sm:p-4 rounded-lg border border-green-600/30">
                    <h4 className="font-semibold text-green-300 mb-2 text-center sm:text-left">
                      {language === 'en' ? 'Investment Philosophy' : '投资哲学'}
                    </h4>
                    <p className="text-white text-sm text-center sm:text-left">
                      {selectedMethodology === 'academic' ? 
                        (language === 'en' ? 'Academic School - Based on rigorous financial theory and long-term value investment principles' : '学院派 - 基于严谨金融理论和长期价值投资原则') :
                       selectedMethodology === 'business' ? 
                        (language === 'en' ? 'Business Practical School - Focus on market timing and quantitative trading strategies' : '商业实践派 - 专注于市场时机和量化交易策略') : 
                        (language === 'en' ? 'Psychological History School - Leveraging market sentiment and behavioral finance insights' : '心理史学派 - 利用市场情绪和行为金融洞察')}
                    </p>
                  </div>
                  
                  <div className="bg-green-800/20 p-3 sm:p-4 rounded-lg border border-green-600/30">
                    <h4 className="font-semibold text-green-300 mb-2 text-center sm:text-left">
                      {language === 'en' ? 'Risk Profile' : '风险档案'}
                    </h4>
                    <p className="text-white text-sm text-center sm:text-left">
                      {selectedRiskLevel === 'low' ? 
                        (language === 'en' ? 'Conservative Strategy - Capital preservation with stable returns' : '保守策略 - 资本保值，稳定收益') :
                       selectedRiskLevel === 'medium' ? 
                        (language === 'en' ? 'Balanced Strategy - Moderate risk with growth potential' : '平衡策略 - 适度风险，增长潜力') : 
                        (language === 'en' ? 'Aggressive Strategy - Higher risk for maximum growth' : '激进策略 - 较高风险，最大增长')}
                    </p>
                  </div>
                </div>

                {/* 年龄风险调整建议 - 优化手机端显示 */}
                <div className="bg-blue-800/20 p-3 sm:p-4 rounded-lg border border-blue-600/30 mb-4">
                  <h4 className="font-semibold text-blue-300 mb-3 text-center sm:text-left">
                    {language === 'en' ? 'Age-Based Risk Adjustment' : '基于年龄的风险调整'}
                  </h4>
                  
                  {/* 年龄选择 - 改进的UI，优化手机端 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    {ageGroups.map((ageGroup) => (
                      <label 
                        key={ageGroup.value} 
                        className={`relative p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedAgeGroup === ageGroup.value
                            ? 'border-blue-500 bg-blue-900/30 shadow-lg'
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="ageGroup"
                          value={ageGroup.value}
                          checked={selectedAgeGroup === ageGroup.value}
                          onChange={(e) => setSelectedAgeGroup(e.target.value)}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-white font-semibold text-sm mb-1">
                            {language === 'en' ? ageGroup.label.en : ageGroup.label.zh}
                          </div>
                          <div className="text-blue-200 text-xs leading-tight">
                            {language === 'en' ? ageGroup.description.en : ageGroup.description.zh}
                          </div>
                        </div>
                        {/* 选中状态指示器 */}
                        {selectedAgeGroup === ageGroup.value && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        )}
                      </label>
                    ))}
                  </div>

                  {/* 年龄调整说明 - 优化手机端布局 */}
                  {selectedAgeGroup && (
                    <div className="bg-blue-900/30 p-3 rounded-lg border border-blue-500/30">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                        <div className="text-blue-200 text-sm text-center sm:text-left">
                          <span className="font-semibold">
                            {language === 'en' ? 'Age Parameters:' : '年龄参数:'}
                          </span>
                          <span className="text-white ml-2">
                            {selectedAgeGroup === 'young' ? (language === 'en' ? 'Young Professional' : '年轻专业人士') :
                             selectedAgeGroup === 'middle' ? (language === 'en' ? 'Mid-Career' : '职业生涯中期') :
                             selectedAgeGroup === 'senior' ? (language === 'en' ? 'Pre-Retirement' : '退休前') : 
                             (language === 'en' ? 'Retirement Age' : '退休年龄')}
                          </span>
                        </div>
                        <button
                          onClick={() => setIgnoreAgeRecommendation(!ignoreAgeRecommendation)}
                          className={`px-3 py-2 rounded text-xs font-medium transition-colors ${
                            ignoreAgeRecommendation
                              ? 'bg-yellow-600 text-white'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          {language === 'en' ? 'Ignore Age' : '忽略年龄'}
                        </button>
                      </div>
                      {!ignoreAgeRecommendation && (
                        <p className="text-blue-200 text-xs mt-2 text-center sm:text-left">
                          {language === 'en' 
                            ? 'Age-based adjustments will optimize asset allocation parameters for your life stage'
                            : '基于年龄的调整将根据您的人生阶段优化资产配置参数'
                          }
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* 策略特点总结 - 优化手机端显示 */}
                <div className="bg-purple-800/20 p-3 sm:p-4 rounded-lg border border-purple-600/30">
                  <h4 className="font-semibold text-purple-300 mb-3 text-center sm:text-left">
                    {language === 'en' ? 'Strategy Highlights' : '策略特点总结'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    <div className="text-center sm:text-left">
                      <span className="font-semibold text-purple-200">
                        {language === 'en' ? 'Crypto Allocation:' : '加密货币配置:'}
                      </span>
                      <span className="text-white ml-2">
                        {selectedMethodology === 'academic' ? '1%' : 
                         selectedMethodology === 'business' ? '5%' : '7%'}
                      </span>
                    </div>
                    <div className="text-center sm:text-left">
                      <span className="font-semibold text-purple-200">
                        {language === 'en' ? 'Focus Area:' : '重点领域:'}
                      </span>
                      <span className="text-white ml-2">
                        {selectedMethodology === 'academic' ? (language === 'en' ? 'Long-term value, CAPM theory' : '长期价值，CAPM理论') : 
                         selectedMethodology === 'business' ? (language === 'en' ? 'Market timing, quantitative' : '市场时机，量化分析') : 
                         (language === 'en' ? 'Sentiment analysis, contrarian' : '情绪分析，逆向投资')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 资产配置说明 - 优化手机端显示 */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 sm:p-6 rounded-2xl border border-blue-600/30 mb-8">
          <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0">
            <InformationCircleIcon className="w-6 h-6 text-blue-400 mr-0 sm:mr-3 mt-1 flex-shrink-0 self-center sm:self-start" />
            <div className="text-blue-200 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-semibold mb-2">
                {language === 'en' ? '💡 Asset Classification Guide' : '💡 资产分类指南'}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                {language === 'en' 
                  ? 'Please accurately input your asset allocation according to the following categories. Each input field has detailed descriptions and examples to help you correctly classify various assets. The system will provide precise rate-cut scenario analysis based on your configuration.'
                  : '请根据以下类别准确输入您的资产配置。每个输入字段都有详细描述和示例，帮助您正确分类各种资产。系统将根据您的配置提供精确的降息情景分析。'
                }
              </p>
            </div>
          </div>
        </div>

        {/* 资产配置表单 - 优化手机端布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* 左侧：基础资产 */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-blue-300 mb-4 sm:mb-6 text-center lg:text-left">
              🏠 {language === 'en' ? 'Core Assets' : '核心资产'}
            </h3>
            
            {assetCategories.slice(0, 3).map((category) => (
              <div key={category.id} className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium text-gray-300 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                  <div className="flex items-center justify-center sm:justify-start">
                    <category.icon className={`w-5 h-5 mr-2 text-${category.color.split('-')[1]}-400`} />
                    <span className="text-center sm:text-left">
                      {category.name} {language === 'en' ? '(USD)' : '(美元)'}
                    </span>
                  </div>
                  <button
                    onMouseEnter={() => setShowTooltip(category.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="text-gray-400 hover:text-white transition-colors self-center sm:self-start"
                  >
                    <InformationCircleIcon className="w-4 h-4" />
                  </button>
                </label>
                
                {showTooltip === category.id && (
                  <div className="absolute z-20 bg-gray-800 p-4 rounded-lg border border-gray-600 shadow-2xl max-w-xs left-1/2 transform -translate-x-1/2 sm:left-auto sm:transform-none">
                    <h4 className="font-semibold text-white mb-2">{category.name}</h4>
                    <p className="text-sm text-gray-300 mb-2">{category.description}</p>
                    <div className="text-sm text-gray-400">
                      <strong>{language === 'en' ? 'Contains:' : '包含:'}</strong> {category.examples.join(', ')}
                    </div>
                    <div className="text-sm text-blue-300 mt-2">
                      <strong>{language === 'en' ? 'Rate Cut Impact:' : '降息影响:'}</strong> {category.tooltip}
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
                  placeholder={language === 'en' ? `Enter ${category.name}` : `输入${category.name}`}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-center sm:text-left"
                />
              </div>
            ))}
          </div>

          {/* 右侧：扩展资产 */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-4 sm:mb-6 text-center lg:text-left">
              🚀 {language === 'en' ? 'Extended Assets' : '扩展资产'}
            </h3>
            
            {assetCategories.slice(3).map((category) => (
              <div key={category.id} className="space-y-2 sm:space-y-3">
                <label className="block text-sm font-medium text-gray-300 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
                  <div className="flex items-center justify-center sm:justify-start">
                    <category.icon className={`w-5 h-5 mr-2 text-${category.color.split('-')[1]}-400`} />
                    <span className="text-center sm:text-left">
                      {category.name} {language === 'en' ? '(USD)' : '(美元)'}
                    </span>
                  </div>
                  <button
                    onMouseEnter={() => setShowTooltip(category.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="text-gray-400 hover:text-white transition-colors self-center sm:self-start"
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
                  placeholder={language === 'en' ? `Enter ${category.name}` : `输入${category.name}`}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-center sm:text-left"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 推荐配置 */}
        <div className="bg-gradient-to-br from-green-900/20 via-emerald-900/20 to-green-800/20 border border-green-600/30 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl font-bold text-green-300">
              {language === 'en' ? 'Recommended Allocation' : '推荐配置'}
            </h3>
          </div>
          
          {/* 年龄调整状态显示 */}
          {selectedAgeGroup && !ignoreAgeRecommendation && (
            <div className="mb-4 p-4 bg-blue-900/30 rounded-xl border border-blue-600/30">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                <span className="text-blue-300 font-medium text-sm">
                  {language === 'en' ? 'Age-Based Adjustment Applied' : '已应用年龄调整'}
                </span>
              </div>
              <div className="text-blue-200 text-xs text-center sm:text-left">
                {selectedAgeGroup === 'young' && (language === 'en' ? 
                  'Young Professional: Increased risk assets, reduced conservative assets' : 
                  '年轻专业人士：增加风险资产，减少保守资产')}
                {selectedAgeGroup === 'middle' && (language === 'en' ? 
                  'Mid-Career: Balanced approach maintained' : 
                  '职业生涯中期：保持平衡策略')}
                {selectedAgeGroup === 'senior' && (language === 'en' ? 
                  'Pre-Retirement: Moderately conservative adjustments' : 
                  '退休前：适度保守调整')}
                {selectedAgeGroup === 'elderly' && (language === 'en' ? 
                  'Retirement Age: Conservative strategy applied' : 
                  '退休年龄：应用保守策略')}
              </div>
            </div>
          )}
          
          {/* 年龄调整被忽略的提示 */}
          {selectedAgeGroup && ignoreAgeRecommendation && (
            <div className="mb-4 p-4 bg-yellow-900/30 rounded-xl border border-yellow-600/30">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span className="text-yellow-300 font-medium text-sm">
                  {language === 'en' ? 'Age Adjustments Ignored' : '年龄调整已忽略'}
                </span>
              </div>
              <div className="text-yellow-200 text-xs text-center sm:text-left">
                {language === 'en' ? 
                  'Using base allocation without age-based modifications' : 
                  '使用基础配置，不应用年龄调整'}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {recommendedAllocation && Object.entries(recommendedAllocation).map(([asset, percentage]) => (
              <div key={asset} className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl p-3 sm:p-4 border border-gray-600/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 font-medium text-sm">
                    {getAssetDisplayName(asset)}
                  </span>
                  <span className="text-green-400 font-bold text-lg">
                    {percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 偏差分析 - 优化手机端布局 */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4 sm:p-8 rounded-2xl border border-purple-600/30 mb-6 sm:mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0">
            <SparklesIcon className="w-6 h-6 mr-0 sm:mr-3 text-purple-400" />
            <span className="text-center sm:text-left">
              {language === 'en' ? 'Configuration Deviation Analysis' : '配置偏差分析'}
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* 推荐配置 */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-purple-300 text-center sm:text-left">
                🎯 {language === 'en' ? 'Recommended Allocation' : '推荐配置'}
              </h4>
              <div className="space-y-4">
                {recommendedAllocation && Object.entries(recommendedAllocation).map(([asset, percentage]) => {
                  const currentValue = localInput[asset as keyof typeof localInput] || 0
                  const currentPercentage = totalAssets > 0 ? (currentValue / totalAssets) * 100 : 0
                  const deviation = ((currentPercentage - percentage) / percentage) * 100
                  
                  return (
                    <div key={asset} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300 capitalize text-sm font-medium">
                          {asset === 'realEstate' ? (language === 'en' ? 'Real Estate' : '房产') : 
                           asset === 'equity' ? (language === 'en' ? 'Equity' : '股票') : 
                           asset === 'cash' ? (language === 'en' ? 'Cash' : '现金') : 
                           asset === 'fund' ? (language === 'en' ? 'Funds' : '基金') : 
                           asset === 'crypto' ? (language === 'en' ? 'Crypto' : '加密货币') : 
                           (language === 'en' ? 'Insurance' : '保险')}
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
                      <div className="text-xs text-gray-400 ml-2 text-center sm:text-left">
                        {Math.abs(deviation) <= 10 ? 
                          (language === 'en' ? '✅ Optimal' : '✅ 最优') : 
                         Math.abs(deviation) <= 25 ? 
                          (language === 'en' ? '⚠️ Consider adjustment' : '⚠️ 考虑调整') : 
                          (language === 'en' ? '🚨 Significant deviation' : '🚨 显著偏差')}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            {/* 偏差分析 */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-purple-300 text-center sm:text-left">
                📊 {language === 'en' ? 'Configuration Deviation Analysis' : '配置偏差分析'}
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
                          {asset === 'realEstate' ? (language === 'en' ? 'Real Estate' : '房产') : 
                           asset === 'equity' ? (language === 'en' ? 'Equity' : '股票') : 
                           asset === 'cash' ? (language === 'en' ? 'Cash' : '现金') : 
                           asset === 'fund' ? (language === 'en' ? 'Funds' : '基金') : 
                           asset === 'crypto' ? (language === 'en' ? 'Crypto' : '加密货币') : 
                           (language === 'en' ? 'Insurance' : '保险')}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            Math.abs(deviation) <= 10 ? 'bg-green-400' :
                            Math.abs(deviation) <= 25 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}></div>
                          <div className="relative group">
                            <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center cursor-help">
                              <span className="text-xs text-white">i</span>
                            </div>
                            {/* 悬停提示 */}
                            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              <div className="text-center">
                                <div className={`font-medium ${
                                  Math.abs(deviation) <= 10 ? 'text-green-400' :
                                  Math.abs(deviation) <= 25 ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                  {deviation > 0 ? '+' : ''}{deviation.toFixed(1)}%
                                </div>
                                <div className="text-xs text-gray-300 mt-1">
                                  {Math.abs(deviation) <= 10 ? 
                                    (language === 'en' ? 'Excellent' : '优秀') :
                                   Math.abs(deviation) <= 25 ? 
                                    (language === 'en' ? 'Good' : '良好') : 
                                    (language === 'en' ? 'Needs Adjustment' : '需要调整')}
                                </div>
                              </div>
                              {/* 箭头 */}
                              <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* 具体金额建议 */}
                      <div className="ml-2 sm:ml-4 text-sm text-center sm:text-left">
                        {adjustmentAmount > 0 ? (
                          <div className="text-green-400">
                            {language === 'en' 
                              ? `Recommend increasing by $${adjustmentAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                              : `建议增加 $${adjustmentAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                            }
                          </div>
                        ) : adjustmentAmount < 0 ? (
                          <div className="text-red-400">
                            {language === 'en' 
                              ? `Recommend reducing by $${Math.abs(adjustmentAmount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                              : `建议减少 $${Math.abs(adjustmentAmount).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                            }
                          </div>
                        ) : (
                          <div className="text-green-400">
                            {language === 'en' ? 'Configuration optimal' : '配置最优'}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-600">
                <div className="text-sm text-gray-300 text-center sm:text-left">
                  <p className="mb-2">
                    <span className="text-green-400">●</span> 
                    {language === 'en' ? 'Deviation ≤10%: Excellent configuration' : '偏差 ≤10%: 优秀配置'}
                  </p>
                  <p className="mb-2">
                    <span className="text-yellow-400">●</span> 
                    {language === 'en' ? 'Deviation ≤25%: Good configuration' : '偏差 ≤25%: 良好配置'}
                  </p>
                  <p className="mb-2">
                    <span className="text-red-400">●</span> 
                    {language === 'en' ? 'Deviation >25%: Needs adjustment' : '偏差 >25%: 需要调整'}
                  </p>
                  {(realEstateExemption || debtBurdenLevel !== 'low') && (
                    <div className="mt-3 pt-3 border-t border-gray-600">
                      <p className="text-blue-300 font-medium">
                        {language === 'en' ? 'Smart Adjustments Applied:' : '已应用智能调整：'}
                      </p>
                      {realEstateExemption && (
                        <p className="text-blue-200 text-xs mt-1">
                          🏠 {language === 'en' ? 'Real estate allocation reduced' : '房产配置已减少'}
                        </p>
                      )}
                      {debtBurdenLevel !== 'low' && (
                        <p className="text-blue-200 text-xs mt-1">
                          💰 {language === 'en' ? `Debt burden adjustment: ${debtBurdenLevel}` : `债务负担调整：${debtBurdenLevel === 'medium' ? '中等' : '高'}`}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 智能配置选择 - 优化手机端布局 */}
        <div className="bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border border-blue-600/30 rounded-2xl p-3 sm:p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
            <div className="relative">
              <CogIcon className="w-6 h-6 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-lg font-bold text-blue-300 text-center sm:text-left">
              {language === 'en' ? 'Smart Configuration Options' : '智能配置选项'}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 房产豁免选择 */}
            <div className="space-y-3">
              <h4 className="text-base font-medium text-blue-200 flex items-center justify-center sm:justify-start">
                🏠 <span className="ml-2">{language === 'en' ? 'Real Estate Strategy' : '房产策略'}</span>
              </h4>
              <div className="space-y-2">
                <label className="flex items-start space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={realEstateExemption}
                    onChange={(e) => setRealEstateExemption(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-gray-300 text-xs leading-relaxed">
                    {language === 'en' 
                      ? 'I prefer to skip real estate investment (rent coverage/income constraint)' 
                      : '我选择跳过房产投资（房租覆盖/收入约束）'}
                  </span>
                </label>
                {realEstateExemption && (
                  <div className="ml-6 p-2 bg-blue-900/30 rounded-lg border border-blue-500/30">
                    <div className="flex items-center space-x-2 text-xs text-blue-200">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span>{language === 'en' ? 'Real estate allocation reduced by 80%' : '房产配置减少80%'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-blue-200 mt-1">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span>{language === 'en' ? 'Freed allocation redistributed to other assets' : '释放配置重新分配'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* 债务负担率选择 */}
            <div className="space-y-3">
              <h4 className="text-base font-medium text-blue-200 flex items-center justify-center sm:justify-start">
                💰 <span className="ml-2">{language === 'en' ? 'Debt Burden Level' : '债务负担水平'}</span>
              </h4>
              <div className="space-y-2">
                {[
                  { value: 'low', label: { en: 'Low or No Debt', zh: '债务负担很低或无' }, color: 'from-green-500 to-emerald-500', icon: '🟢' },
                  { value: 'medium', label: { en: 'Moderate Debt (50% income)', zh: '中等债务负担（50%收入）' }, color: 'from-yellow-500 to-orange-500', icon: '🟡' },
                  { value: 'high', label: { en: 'High Debt (Most income)', zh: '高债务负担（大部分收入）' }, color: 'from-red-500 to-pink-500', icon: '🔴' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer group hover:bg-blue-900/20 rounded-lg p-1 transition-colors">
                    <input
                      type="radio"
                      name="debtBurden"
                      value={option.value}
                      checked={debtBurdenLevel === option.value}
                      onChange={(e) => setDebtBurdenLevel(e.target.value as 'low' | 'medium' | 'high')}
                      className="w-3 h-3 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                    />
                    <span className="text-xs mr-2">{option.icon}</span>
                    <span className={`text-xs font-medium ${option.value === debtBurdenLevel ? 'text-white' : 'text-gray-300'}`}>
                      {language === 'en' ? option.label.en : option.label.zh}
                    </span>
                  </label>
                ))}
                <div className="ml-6 p-2 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <div className="flex items-center space-x-2 text-xs text-blue-200">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>{language === 'en' 
                      ? 'Higher debt burden = More cash buffer, Less risk assets' 
                      : '债务负担越高 = 现金缓冲越多，风险资产越少'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* 资产总计和风险分析 */}
        {totalAssets > 0 && (
          <div className="bg-gradient-to-br from-gray-800/90 via-gray-700/90 to-gray-600/90 p-4 sm:p-6 rounded-2xl border border-gray-500/30 mb-6 sm:mb-8 shadow-xl">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-blue-500/30">
                <span className="text-gray-300 font-medium text-base sm:text-lg">
                  {language === 'en' ? 'Total Assets:' : '总资产:'}
                </span>
                <span className="font-bold text-2xl sm:text-3xl text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  ${totalAssets.toLocaleString('en-US')}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* 核心资产 */}
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-600/50 p-3 sm:p-4 rounded-xl border border-gray-500/30">
                <h4 className="text-sm font-medium text-gray-300 mb-3 text-center">
                  🏛️ {language === 'en' ? 'Core Assets' : '核心资产'}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {language === 'en' ? 'Real Estate' : '房产'}
                    </span>
                    <span className="text-green-400 font-bold">
                      {getAssetPercentage(localInput.realEstate).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {language === 'en' ? 'Equity' : '股票'}
                    </span>
                    <span className="text-blue-400 font-bold">
                      {getAssetPercentage(localInput.equity).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {language === 'en' ? 'Cash' : '现金'}
                    </span>
                    <span className="text-yellow-400 font-bold">
                      {getAssetPercentage(localInput.cash).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 扩展资产 */}
              <div className="bg-gradient-to-br from-gray-700/50 to-gray-600/50 p-3 sm:p-4 rounded-xl border border-gray-500/30">
                <h4 className="text-sm font-medium text-gray-300 mb-3 text-center">
                  🚀 {language === 'en' ? 'Extended Assets' : '扩展资产'}
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-purple-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {language === 'en' ? 'Funds' : '基金'}
                    </span>
                    <span className="text-purple-400 font-bold">
                      {getAssetPercentage(localInput.fund).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {language === 'en' ? 'Cryptocurrency' : '加密货币'}
                    </span>
                    <span className="text-orange-400 font-bold">
                      {getAssetPercentage(localInput.crypto).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-900/20 rounded-lg">
                    <span className="text-gray-300 text-sm">
                      {language === 'en' ? 'Insurance' : '保险'}
                    </span>
                    <span className="text-red-400 font-bold">
                      {getAssetPercentage(localInput.insurance).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 风险分布 */}
              <div className="space-y-3 p-3 sm:p-4 bg-gradient-to-br from-gray-700/50 to-gray-600/50 rounded-xl border border-gray-500/30">
                <h4 className="text-sm font-medium text-gray-400 text-center">
                  {language === 'en' ? 'Risk Distribution' : '风险分布'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {language === 'en' ? 'Conservative:' : '保守:'}
                    </span>
                    <span className="text-green-400 font-medium">
                      {getAssetPercentage(localInput.cash + localInput.insurance).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {language === 'en' ? 'Balanced:' : '平衡:'}
                    </span>
                    <span className="text-blue-400 font-medium">
                      {getAssetPercentage(localInput.realEstate + localInput.fund).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {language === 'en' ? 'Aggressive:' : '激进:'}
                    </span>
                    <span className="text-orange-400 font-medium">
                      {getAssetPercentage(localInput.equity + localInput.crypto).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 综合评价与诊断服务 */}
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-gray-300 mb-3">
                    {language === 'en' ? 'Portfolio Analysis Services' : '投资组合分析服务'}
                  </h4>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${getAssessmentStyle()} border border-gray-600/50`}>
                    <div className={`text-lg font-bold ${getAssessmentColor()} mr-2`}>
                      {getAssessmentLevel()}
                    </div>
                    <span className="text-sm text-gray-400">
                      {language === 'en' ? 'Current Status' : '当前状态'}
                    </span>
                  </div>
                </div>
                
                {/* 科技感付费服务选项 - 优化手机端布局 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* 基础诊断 - 科技简约风格 */}
                  <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-4 sm:p-6 border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                        <StarIcon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-200 mb-2">
                        {language === 'en' ? 'Basic Diagnosis' : '基础诊断'}
                      </h3>
                      <div className="text-2xl font-bold text-emerald-400 mb-2">FREE</div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {language === 'en' ? 'Essential portfolio health check' : '基础投资组合健康检查'}
                      </p>
                    </div>
                    
                    {/* 悬停详细说明 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-slate-900/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-slate-700/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-sm text-slate-200 mb-2 font-medium">
                          {language === 'en' ? 'Basic Portfolio Analysis' : '基础投资组合分析'}
                        </div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <div>• {language === 'en' ? 'Basic risk assessment' : '基础风险评估'}</div>
                          <div>• {language === 'en' ? 'Simple allocation advice' : '简单配置建议'}</div>
                          <div>• {language === 'en' ? 'Standard report' : '标准报告'}</div>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                    </div>
                  </div>
                  
                  {/* 高级诊断 - 专业科技风格 */}
                  <button
                    onClick={() => setShowAssetDiagnosis(true)}
                    className="group relative w-full bg-gradient-to-br from-blue-600/90 to-blue-700/90 rounded-2xl p-4 sm:p-6 border border-blue-500/50 hover:border-blue-400/70 transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm shadow-xl hover:shadow-2xl"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                        <AcademicCapIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2">
                        {language === 'en' ? 'Premium Diagnosis' : '高级诊断'}
                      </h3>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full text-white/90 font-medium">PRO</span>
                        <span className="text-2xl font-bold text-white">$29.99</span>
                      </div>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        {language === 'en' ? 'AI-powered advanced analysis' : 'AI驱动的深度分析'}
                      </p>
                    </div>
                    
                    {/* 悬停详细说明 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-blue-900/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-blue-700/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-sm text-blue-100 mb-2 font-medium">
                          {language === 'en' ? 'Advanced AI Analysis' : 'AI智能深度分析'}
                        </div>
                        <div className="text-xs text-blue-200 space-y-1">
                          <div>• {language === 'en' ? 'AI analysis engine' : 'AI智能分析引擎'}</div>
                          <div>• {language === 'en' ? 'Advanced risk models' : '高级风险评估模型'}</div>
                          <div>• {language === 'en' ? 'Personalized optimization' : '个性化优化建议'}</div>
                          <div>• {language === 'en' ? 'Real-time market insights' : '实时市场洞察'}</div>
                          <div>• {language === 'en' ? 'Priority support' : '优先客户支持'}</div>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-900/95"></div>
                    </div>
                  </button>
                  
                  {/* 企业级诊断 - 高端科技风格 */}
                  <div className="group relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl p-4 sm:p-6 border border-slate-600/40 hover:border-slate-500/60 transition-all duration-300 cursor-pointer backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-slate-500/20 to-slate-600/20 rounded-xl flex items-center justify-center border border-slate-500/30">
                        <BuildingLibraryIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <h3 className="text-base font-semibold text-slate-200 mb-2">
                        {language === 'en' ? 'Enterprise Solution' : '企业级方案'}
                      </h3>
                      <div className="text-2xl font-bold text-slate-300 mb-2">$199.99</div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {language === 'en' ? 'Custom institutional strategies' : '定制化机构策略'}
                      </p>
                    </div>
                    
                    {/* 悬停详细说明 */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-slate-900/95 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 border border-slate-700/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-sm text-slate-200 mb-2 font-medium">
                          {language === 'en' ? 'Enterprise-Grade Solutions' : '企业级定制解决方案'}
                        </div>
                        <div className="text-xs text-slate-300 space-y-1">
                          <div>• {language === 'en' ? 'Custom investment strategies' : '定制化投资策略'}</div>
                          <div>• {language === 'en' ? 'Institutional risk management' : '机构级风险管理'}</div>
                          <div>• {language === 'en' ? 'Professional team support' : '专业团队支持'}</div>
                          <div>• {language === 'en' ? 'API integration services' : 'API集成服务'}</div>
                          <div>• {language === 'en' ? 'Dedicated account manager' : '专属客户经理'}</div>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 继续按钮 - 优化手机端显示 */}
        <div className="text-center">
          <button
            onClick={onNext}
            disabled={totalAssets === 0 || !selectedMethodology}
            className={`group relative inline-flex items-center justify-center px-6 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-hidden ${
              totalAssets > 0 && selectedMethodology
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center">
              {language === 'en' ? 'Start Rate Cut Analysis' : '开始降息分析'}
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-base sm:text-lg px-4">
            {!selectedMethodology ? 
              (language === 'en' ? 'Please select investment philosophy and risk level first' : '请先选择投资哲学和风险等级') :
             totalAssets === 0 ? 
              (language === 'en' ? 'Please input asset configuration first' : '请先输入资产配置') : 
              (language === 'en' ? 'Configuration complete, start 4-basis point rate cut analysis' : '配置完成，开始4基点降息分析')}
          </p>
          
          {/* 策略匹配提示 - 优化手机端显示 */}
          {totalAssets > 0 && recommendedAllocation && deviations && (
            <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-600/30">
              <p className="text-sm text-blue-200 text-center mb-3">
                💡 {language === 'en' 
                  ? 'System has generated personalized configuration recommendations based on your investment philosophy and risk level.'
                  : '系统已根据您的投资哲学和风险等级生成个性化配置建议。'}
                {Object.values(deviations).some(d => Math.abs(d) > 25) && 
                  (language === 'en' 
                    ? ' Some asset allocation deviations are significant, consider adjusting based on recommended ratios.'
                    : ' 部分资产配置偏差显著，建议根据推荐比例进行调整。')}
              </p>
              <div className="text-xs text-blue-300/80 text-center p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <p className="mb-2">
                  <span className="font-medium">⚠️ {language === 'en' ? 'Important Notice:' : '重要提示:'}</span> 
                  {language === 'en' 
                    ? ' System parameters are dynamically adjusted based on market environment changes.'
                    : ' 系统参数根据市场环境变化动态调整。'}
                </p>
                <p>
                  {language === 'en' 
                    ? 'Parameter settings may vary over time, and the same input values may produce different results in different periods due to market fluctuations, economic conditions, and regulatory changes.'
                    : '参数设置可能随时间变化，由于市场波动、经济状况和监管变化，相同的输入值在不同时期可能产生不同结果。'}
                </p>
              </div>
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
