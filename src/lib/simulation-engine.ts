import { AssetPortfolio } from '../types/api'

/**
 * 宏观环境参数
 * @author @eclipsecybertitan
 */
export interface MacroEnvironment {
  interestRate: number // 基准利率 (%)
  inflation: number // 通胀率 (%)
  gdpGrowth: number // GDP增长率 (%)
  marketVolatility: number // 市场波动性 (0-1)
  blackSwanEvents: BlackSwanEvent[]
  timeHorizon: number // 模拟月数
}

/**
 * 黑天鹅事件
 */
export interface BlackSwanEvent {
  type: 'financial_crisis' | 'pandemic' | 'war' | 'natural_disaster' | 'policy_change'
  probability: number // 发生概率 (0-1)
  impact: number // 影响程度 (-1 到 1)
  duration: number // 持续月数
}

/**
 * 月度收益率
 */
export interface MonthlyReturn {
  month: number
  returns: {
    [K in keyof AssetPortfolio]: number
  }
  totalReturn: number
  riskMetrics: RiskMetrics
}

/**
 * 风险指标
 */
export interface RiskMetrics {
  volatility: number // 波动率
  sharpeRatio: number // 夏普比率
  maxDrawdown: number // 最大回撤
  var95: number // 95%置信度下的风险价值
}

/**
 * 模拟输出结果
 */
export interface SimulationOutput {
  monthlyReturns: MonthlyReturn[]
  totalReturn: number
  annualizedReturn: number
  riskMetrics: RiskMetrics
  assetPerformance: {
    [K in keyof AssetPortfolio]: {
      totalReturn: number
      annualizedReturn: number
      volatility: number
      sharpeRatio: number
    }
  }
}

/**
 * 资产配置模拟引擎
 * 每个回合代表一个月，基于宏观环境参数计算各类资产收益率
 * 
 * @param assets 用户资产组合
 * @param macroEnv 宏观环境参数
 * @returns 模拟结果
 * @author @eclipsecybertitan
 */
export function simulatePortfolio(
  assets: AssetPortfolio, 
  macroEnv: MacroEnvironment
): SimulationOutput {
  const { timeHorizon } = macroEnv
  const monthlyReturns: MonthlyReturn[] = []
  
  let currentPortfolio = { ...assets }
  let totalReturn = 0
  
  // 逐月模拟
  for (let month = 1; month <= timeHorizon; month++) {
    const monthlyReturn = calculateMonthlyReturn(currentPortfolio, macroEnv, month)
    monthlyReturns.push(monthlyReturn)
    
    // 更新资产组合
    currentPortfolio = updatePortfolio(currentPortfolio, monthlyReturn.returns)
    totalReturn += monthlyReturn.totalReturn
  }
  
  // 计算年化收益率
  const annualizedReturn = calculateAnnualizedReturn(totalReturn, timeHorizon)
  
  // 计算整体风险指标
  const riskMetrics = calculateOverallRiskMetrics(monthlyReturns)
  
  // 计算各类资产表现
  const assetPerformance = calculateAssetPerformance(monthlyReturns, assets)
  
  return {
    monthlyReturns,
    totalReturn,
    annualizedReturn,
    riskMetrics,
    assetPerformance
  }
}

/**
 * 计算月度收益率
 */
function calculateMonthlyReturn(
  portfolio: AssetPortfolio,
  macroEnv: MacroEnvironment,
  month: number
): MonthlyReturn {
  const returns: { [K in keyof AssetPortfolio]: number } = {
    realEstate: calculateRealEstateReturn(macroEnv, month),
    equity: calculateEquityReturn(macroEnv, month),
    cash: calculateCashReturn(macroEnv, month),
    fund: calculateFundReturn(macroEnv, month),
    crypto: calculateCryptoReturn(macroEnv, month),
    insurance: calculateInsuranceReturn(macroEnv, month)
  }
  
  // 计算总收益率
  const totalReturn = Object.entries(returns).reduce((sum, [asset, returnRate]) => {
    const weight = portfolio[asset as keyof AssetPortfolio] / getTotalAssets(portfolio)
    return sum + weight * returnRate
  }, 0)
  
  // 计算月度风险指标
  const riskMetrics = calculateMonthlyRiskMetrics(returns, macroEnv)
  
  return {
    month,
    returns,
    totalReturn,
    riskMetrics
  }
}

/**
 * 计算房产收益率
 */
function calculateRealEstateReturn(macroEnv: MacroEnvironment, month: number): number {
  const { interestRate, inflation, gdpGrowth } = macroEnv
  
  // 基础收益率
  let baseReturn = 0.06 // 年化6%
  
  // 利率影响
  const rateImpact = (5.0 - interestRate) * 0.01 // 利率下降利好房产
  
  // 通胀影响
  const inflationImpact = inflation * 0.5 // 通胀利好房产
  
  // GDP增长影响
  const gdpImpact = gdpGrowth * 0.3
  
  // 黑天鹅事件影响
  const blackSwanImpact = calculateBlackSwanImpact(macroEnv.blackSwanEvents, month)
  
  const monthlyReturn = (baseReturn + rateImpact + inflationImpact + gdpImpact + blackSwanImpact) / 12
  
  return Math.max(-0.1, Math.min(0.2, monthlyReturn)) // 限制在-10%到20%之间
}

/**
 * 计算股票收益率
 */
function calculateEquityReturn(macroEnv: MacroEnvironment, month: number): number {
  const { interestRate, inflation, gdpGrowth, marketVolatility } = macroEnv
  
  // 基础收益率
  let baseReturn = 0.08 // 年化8%
  
  // 利率影响
  const rateImpact = (5.0 - interestRate) * 0.015 // 降息利好股票
  
  // 通胀影响
  const inflationImpact = inflation * 0.4
  
  // GDP增长影响
  const gdpImpact = gdpGrowth * 0.5
  
  // 市场波动性影响
  const volatilityImpact = (1 - marketVolatility) * 0.02
  
  // 黑天鹅事件影响
  const blackSwanImpact = calculateBlackSwanImpact(macroEnv.blackSwanEvents, month)
  
  const monthlyReturn = (baseReturn + rateImpact + inflationImpact + gdpImpact + volatilityImpact + blackSwanImpact) / 12
  
  return Math.max(-0.15, Math.min(0.25, monthlyReturn)) // 限制在-15%到25%之间
}

/**
 * 计算现金收益率
 */
function calculateCashReturn(macroEnv: MacroEnvironment, _month: number): number {
  const { interestRate, inflation } = macroEnv
  
  // 现金收益率主要受利率影响
  const baseReturn = interestRate / 100
  
  // 通胀侵蚀
  const inflationErosion = -inflation / 100
  
  const monthlyReturn = (baseReturn + inflationErosion) / 12
  
  return Math.max(-0.05, Math.min(0.1, monthlyReturn)) // 限制在-5%到10%之间
}

/**
 * 计算基金收益率
 */
function calculateFundReturn(macroEnv: MacroEnvironment, month: number): number {
  // 基金收益率介于股票和债券之间
  const equityReturn = calculateEquityReturn(macroEnv, month)
  const bondReturn = calculateBondReturn(macroEnv, month)
  
  return (equityReturn * 0.6 + bondReturn * 0.4) * 0.9 // 扣除管理费
}

/**
 * 计算虚拟货币收益率
 */
function calculateCryptoReturn(macroEnv: MacroEnvironment, month: number): number {
  const { marketVolatility, blackSwanEvents } = macroEnv
  
  // 基础收益率
  let baseReturn = 0.12 // 年化12%
  
  // 市场波动性影响（高波动性可能带来高收益）
  const volatilityImpact = marketVolatility * 0.1
  
  // 黑天鹅事件影响（加密货币对风险事件敏感）
  const blackSwanImpact = calculateBlackSwanImpact(blackSwanEvents, month) * 2
  
  const monthlyReturn = (baseReturn + volatilityImpact + blackSwanImpact) / 12
  
  return Math.max(-0.3, Math.min(0.4, monthlyReturn)) // 限制在-30%到40%之间
}

/**
 * 计算保险收益率
 */
function calculateInsuranceReturn(macroEnv: MacroEnvironment, month: number): number {
  const { inflation, blackSwanEvents } = macroEnv
  
  // 保险收益率相对稳定
  let baseReturn = 0.04 // 年化4%
  
  // 通胀影响
  const inflationImpact = inflation * 0.3
  
  // 黑天鹅事件影响（保险可能受益于风险事件）
  const blackSwanImpact = calculateBlackSwanImpact(blackSwanEvents, month) * 0.5
  
  const monthlyReturn = (baseReturn + inflationImpact + blackSwanImpact) / 12
  
  return Math.max(-0.05, Math.min(0.15, monthlyReturn)) // 限制在-5%到15%之间
}

/**
 * 计算债券收益率（辅助函数）
 */
function calculateBondReturn(macroEnv: MacroEnvironment, _month: number): number {
  const { interestRate, inflation } = macroEnv
  
  // 债券收益率与利率负相关
  const baseReturn = interestRate / 100
  
  // 通胀影响
  const inflationImpact = -inflation * 0.3 / 100
  
  const monthlyReturn = (baseReturn + inflationImpact) / 12
  
  return Math.max(-0.08, Math.min(0.12, monthlyReturn))
}

/**
 * 计算黑天鹅事件影响
 */
function calculateBlackSwanImpact(events: BlackSwanEvent[], month: number): number {
  return events.reduce((totalImpact, event) => {
    // 检查事件是否在当前月份生效
    if (month >= 1 && month <= event.duration) {
      // 根据概率和影响计算实际影响
      const actualImpact = event.impact * event.probability
      return totalImpact + actualImpact
    }
    return totalImpact
  }, 0)
}

/**
 * 更新资产组合
 */
function updatePortfolio(
  portfolio: AssetPortfolio, 
  returns: { [K in keyof AssetPortfolio]: number }
): AssetPortfolio {
  const updated: AssetPortfolio = {} as AssetPortfolio
  
  Object.keys(portfolio).forEach(asset => {
    const key = asset as keyof AssetPortfolio
    const currentValue = portfolio[key]
    const returnRate = returns[key]
    updated[key] = currentValue * (1 + returnRate)
  })
  
  return updated
}

/**
 * 计算总资产
 */
function getTotalAssets(portfolio: AssetPortfolio): number {
  return Object.values(portfolio).reduce((sum, value) => sum + value, 0)
}

/**
 * 计算年化收益率
 */
function calculateAnnualizedReturn(totalReturn: number, months: number): number {
  if (months === 0) return 0
  return Math.pow(1 + totalReturn, 12 / months) - 1
}

/**
 * 计算月度风险指标
 */
function calculateMonthlyRiskMetrics(
  returns: { [K in keyof AssetPortfolio]: number },
  _macroEnv: MacroEnvironment
): RiskMetrics {
  const returnValues = Object.values(returns)
  const mean = returnValues.reduce((sum, r) => sum + r, 0) / returnValues.length
  
  // 计算波动率
  const variance = returnValues.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returnValues.length
  const volatility = Math.sqrt(variance)
  
  // 简化计算，实际应用中需要更复杂的风险指标
  return {
    volatility,
    sharpeRatio: mean / (volatility + 0.0001), // 避免除零
    maxDrawdown: 0, // 需要历史数据计算
    var95: 0 // 需要历史数据计算
  }
}

/**
 * 计算整体风险指标
 */
function calculateOverallRiskMetrics(monthlyReturns: MonthlyReturn[]): RiskMetrics {
  const totalReturns = monthlyReturns.map(mr => mr.totalReturn)
  const mean = totalReturns.reduce((sum, r) => sum + r, 0) / totalReturns.length
  
  const variance = totalReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / totalReturns.length
  const volatility = Math.sqrt(variance)
  
  // 计算最大回撤
  let maxDrawdown = 0
  let peak = 1
  let current = 1
  
  totalReturns.forEach(returnRate => {
    current *= (1 + returnRate)
    if (current > peak) {
      peak = current
    }
    const drawdown = (peak - current) / peak
    maxDrawdown = Math.max(maxDrawdown, drawdown)
  })
  
  return {
    volatility,
    sharpeRatio: mean / (volatility + 0.0001),
    maxDrawdown,
    var95: mean - 1.645 * volatility // 95%置信度下的VaR
  }
}

/**
 * 计算各类资产表现
 */
function calculateAssetPerformance(
  monthlyReturns: MonthlyReturn[], 
  initialPortfolio: AssetPortfolio
): SimulationOutput['assetPerformance'] {
  const performance: any = {}
  
  Object.keys(initialPortfolio).forEach(asset => {
    const key = asset as keyof AssetPortfolio
    const initialValue = initialPortfolio[key]
    
    if (initialValue > 0) {
      const assetReturns = monthlyReturns.map(mr => mr.returns[key])
      const totalReturn = assetReturns.reduce((sum, r) => sum + r, 0)
      const annualizedReturn = calculateAnnualizedReturn(totalReturn, monthlyReturns.length)
      
      // 计算波动率
      const mean = assetReturns.reduce((sum, r) => sum + r, 0) / assetReturns.length
      const variance = assetReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / assetReturns.length
      const volatility = Math.sqrt(variance)
      
      performance[key] = {
        totalReturn,
        annualizedReturn,
        volatility,
        sharpeRatio: mean / (volatility + 0.0001)
      }
    } else {
      performance[key] = {
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0
      }
    }
  })
  
  return performance
}

// 开发者签名: @eclipsecybertitan
