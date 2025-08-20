/**
 * 资产配置模拟引擎
 * 每回合=1个月，支持利率/通胀/黑天鹅事件参数
 * 遵循RULES.md：引擎纯函数、无外部状态依赖
 * @author @eclipsecybertitan
 */

import { MacroData, SimulationParams } from '../api/types'

// 资产类型定义
export type AssetType = 'realEstate' | 'equity' | 'cash' | 'fund' | 'crypto' | 'insurance'

export interface AssetPortfolio {
  realEstate: number
  equity: number
  cash: number
  fund: number
  crypto: number
  insurance: number
}

export interface MonthlyReturn {
  month: number
  returns: Record<AssetType, number>
  totalReturn: number
  portfolioValue: number
  riskMetrics: RiskMetrics
}

export interface RiskMetrics {
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  var95: number
  beta: number
}

export interface SimulationResult {
  monthlyReturns: MonthlyReturn[]
  totalReturn: number
  annualizedReturn: number
  finalPortfolioValue: number
  riskMetrics: RiskMetrics
  assetPerformance: Record<AssetType, AssetPerformance>
  macroImpact: MacroImpact
}

export interface AssetPerformance {
  totalReturn: number
  annualizedReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
}

export interface MacroImpact {
  interestRateEffect: number
  inflationEffect: number
  blackSwanEffect: number
  marketVolatilityEffect: number
}

/**
 * 模拟年度资产配置
 * 每回合=1个月，支持利率/通胀/黑天鹅事件参数
 * 
 * @param params 模拟参数
 * @returns 模拟结果
 */
export function simulateYear(params: SimulationParams): SimulationResult {
  const { assets, macroData, timeHorizon } = params
  
  // 验证输入
  if (timeHorizon <= 0 || timeHorizon > 60) {
    throw new Error('时间周期必须在1-60个月之间')
  }
  
  if (Object.values(assets).every(value => value === 0)) {
    throw new Error('资产组合不能全为零')
  }
  
  const monthlyReturns: MonthlyReturn[] = []
  let currentPortfolio = { ...assets }
  let totalReturn = 0
  let maxPortfolioValue = getTotalAssets(currentPortfolio)
  let minPortfolioValue = maxPortfolioValue
  
  // 逐月模拟
  for (let month = 1; month <= timeHorizon; month++) {
    const monthlyReturn = calculateMonthlyReturn(currentPortfolio, macroData, month)
    monthlyReturns.push(monthlyReturn)
    
    // 更新资产组合
    currentPortfolio = updatePortfolio(currentPortfolio, monthlyReturn.returns)
    totalReturn += monthlyReturn.totalReturn
    
    // 更新最大/最小值
    const currentValue = monthlyReturn.portfolioValue
    maxPortfolioValue = Math.max(maxPortfolioValue, currentValue)
    minPortfolioValue = Math.min(minPortfolioValue, currentValue)
  }
  
  // 计算年化收益率
  const annualizedReturn = calculateAnnualizedReturn(totalReturn, timeHorizon)
  
  // 计算整体风险指标
  const riskMetrics = calculateOverallRiskMetrics(monthlyReturns, maxPortfolioValue, minPortfolioValue)
  
  // 计算各类资产表现
  const assetPerformance = calculateAssetPerformance(monthlyReturns, assets)
  
  // 计算宏观影响
  const macroImpact = calculateMacroImpact(macroData, monthlyReturns)
  
  return {
    monthlyReturns,
    totalReturn,
    annualizedReturn,
    finalPortfolioValue: monthlyReturns[monthlyReturns.length - 1]?.portfolioValue || 0,
    riskMetrics,
    assetPerformance,
    macroImpact
  }
}

/**
 * 计算月度收益率
 */
function calculateMonthlyReturn(
  portfolio: AssetPortfolio,
  macroData: MacroData,
  month: number
): MonthlyReturn {
  const returns: Record<AssetType, number> = {
    realEstate: calculateRealEstateReturn(macroData, month),
    equity: calculateEquityReturn(macroData, month),
    cash: calculateCashReturn(macroData, month),
    fund: calculateFundReturn(macroData, month),
    crypto: calculateCryptoReturn(macroData, month),
    insurance: calculateInsuranceReturn(macroData, month)
  }
  
  // 计算总收益率
  const totalReturn = Object.entries(returns).reduce((sum, [asset, returnRate]) => {
    const weight = portfolio[asset as AssetType] / getTotalAssets(portfolio)
    return sum + weight * returnRate
  }, 0)
  
  // 计算投资组合价值
  const portfolioValue = getTotalAssets(portfolio) * (1 + totalReturn)
  
  // 计算月度风险指标
  const riskMetrics = calculateMonthlyRiskMetrics(returns, macroData)
  
  return {
    month,
    returns,
    totalReturn,
    portfolioValue,
    riskMetrics
  }
}

/**
 * 计算房产收益率
 */
function calculateRealEstateReturn(macroData: MacroData, month: number): number {
  const { interestRate, inflation, gdpGrowth } = macroData
  
  // 基础收益率
  let baseReturn = 0.06 // 年化6%
  
  // 利率影响
  const rateImpact = (5.0 - interestRate) * 0.01 // 利率下降利好房产
  
  // 通胀影响
  const inflationImpact = inflation * 0.5 // 通胀利好房产
  
  // GDP增长影响
  const gdpImpact = gdpGrowth * 0.3
  
  // 黑天鹅事件影响
  const blackSwanImpact = calculateBlackSwanImpact(macroData.blackSwanEvents, month)
  
  const monthlyReturn = (baseReturn + rateImpact + inflationImpact + gdpImpact + blackSwanImpact) / 12
  
  return Math.max(-0.1, Math.min(0.2, monthlyReturn)) // 限制在-10%到20%之间
}

/**
 * 计算股票收益率
 */
function calculateEquityReturn(macroData: MacroData, month: number): number {
  const { interestRate, inflation, gdpGrowth, marketVolatility } = macroData
  
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
  const blackSwanImpact = calculateBlackSwanImpact(macroData.blackSwanEvents, month)
  
  const monthlyReturn = (baseReturn + rateImpact + inflationImpact + gdpImpact + volatilityImpact + blackSwanImpact) / 12
  
  return Math.max(-0.15, Math.min(0.25, monthlyReturn)) // 限制在-15%到25%之间
}

/**
 * 计算现金收益率
 */
function calculateCashReturn(macroData: MacroData, _month: number): number {
  const { interestRate, inflation } = macroData
  
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
function calculateFundReturn(macroData: MacroData, month: number): number {
  // 基金收益率介于股票和债券之间
  const equityReturn = calculateEquityReturn(macroData, month)
  const bondReturn = calculateBondReturn(macroData, month)
  
  return (equityReturn * 0.6 + bondReturn * 0.4) * 0.9 // 扣除管理费
}

/**
 * 计算虚拟货币收益率
 */
function calculateCryptoReturn(macroData: MacroData, month: number): number {
  const { marketVolatility, blackSwanEvents } = macroData
  
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
function calculateInsuranceReturn(macroData: MacroData, month: number): number {
  const { inflation, blackSwanEvents } = macroData
  
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
function calculateBondReturn(macroData: MacroData, _month: number): number {
  const { interestRate, inflation } = macroData
  
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
function calculateBlackSwanImpact(events: MacroData['blackSwanEvents'], month: number): number {
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
  returns: Record<AssetType, number>
): AssetPortfolio {
  const updated: AssetPortfolio = {} as AssetPortfolio
  
  Object.keys(portfolio).forEach(asset => {
    const key = asset as AssetType
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
  returns: Record<AssetType, number>,
  _macroData: MacroData
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
    var95: mean - 1.645 * volatility, // 95%置信度下的VaR
    beta: 1.0 // 默认beta值
  }
}

/**
 * 计算整体风险指标
 */
function calculateOverallRiskMetrics(
  monthlyReturns: MonthlyReturn[],
  maxValue: number,
  minValue: number
): RiskMetrics {
  const totalReturns = monthlyReturns.map(mr => mr.totalReturn)
  const mean = totalReturns.reduce((sum, r) => sum + r, 0) / totalReturns.length
  
  const variance = totalReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / totalReturns.length
  const volatility = Math.sqrt(variance)
  
  // 计算最大回撤
  const maxDrawdown = (maxValue - minValue) / maxValue
  
  return {
    volatility,
    sharpeRatio: mean / (volatility + 0.0001),
    maxDrawdown,
    var95: mean - 1.645 * volatility, // 95%置信度下的VaR
    beta: 1.0
  }
}

/**
 * 计算各类资产表现
 */
function calculateAssetPerformance(
  monthlyReturns: MonthlyReturn[], 
  initialPortfolio: AssetPortfolio
): Record<AssetType, AssetPerformance> {
  const performance: Record<AssetType, AssetPerformance> = {} as any
  
  Object.keys(initialPortfolio).forEach(asset => {
    const key = asset as AssetType
    const initialValue = initialPortfolio[key]
    
    if (initialValue > 0) {
      const assetReturns = monthlyReturns.map(mr => mr.returns[key])
      const totalReturn = assetReturns.reduce((sum, r) => sum + r, 0)
      const annualizedReturn = calculateAnnualizedReturn(totalReturn, monthlyReturns.length)
      
      // 计算波动率
      const mean = assetReturns.reduce((sum, r) => sum + r, 0) / assetReturns.length
      const variance = assetReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / assetReturns.length
      const volatility = Math.sqrt(variance)
      
      // 计算最大回撤
      let maxValue = initialValue
      let minValue = initialValue
      let currentValue = initialValue
      
      for (const returnRate of assetReturns) {
        currentValue *= (1 + returnRate)
        maxValue = Math.max(maxValue, currentValue)
        minValue = Math.min(minValue, currentValue)
      }
      
      const maxDrawdown = (maxValue - minValue) / maxValue
      
      performance[key] = {
        totalReturn,
        annualizedReturn,
        volatility,
        sharpeRatio: mean / (volatility + 0.0001),
        maxDrawdown
      }
    } else {
      performance[key] = {
        totalReturn: 0,
        annualizedReturn: 0,
        volatility: 0,
        sharpeRatio: 0,
        maxDrawdown: 0
      }
    }
  })
  
  return performance
}

/**
 * 计算宏观影响
 */
function calculateMacroImpact(
  macroData: MacroData,
  _monthlyReturns: MonthlyReturn[]
): MacroImpact {
  // const totalReturns = monthlyReturns.map(mr => mr.totalReturn)
  // const avgReturn = totalReturns.reduce((sum, r) => sum + r, 0) / totalReturns.length
  
  // 计算各种宏观因素的影响
  const interestRateEffect = (5.0 - macroData.interestRate) * 0.01
  const inflationEffect = macroData.inflation * 0.005
  const blackSwanEffect = macroData.blackSwanEvents.reduce((sum, event) => sum + event.impact * event.probability, 0)
  const marketVolatilityEffect = macroData.marketVolatility * 0.02
  
  return {
    interestRateEffect,
    inflationEffect,
    blackSwanEffect,
    marketVolatilityEffect
  }
}

// 开发者签名: @eclipsecybertitan
