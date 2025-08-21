/**
 * 统一资产配置模拟引擎
 * 整合原有engine.ts和simulation-engine.ts的功能
 * 提供一致的接口和计算逻辑
 * @author @eclipsecybertitan
 */

import { financialParamsManager, ReturnRangeAnalyzer } from '../config'

// 资产类型定义
export type AssetType = 'realEstate' | 'equity' | 'cash' | 'fund' | 'crypto' | 'insurance'

// 资产组合接口
export interface AssetPortfolio {
  realEstate: number
  equity: number
  cash: number
  fund: number
  crypto: number
  insurance: number
}

// 宏观数据接口
export interface MacroData {
  interestRate: number      // 基准利率 (%)
  inflation: number         // 通胀率 (%)
  gdpGrowth: number        // GDP增长率 (%)
  marketVolatility: number // 市场波动性 (0-1)
  blackSwanEvents: BlackSwanEvent[]
}

// 黑天鹅事件接口
export interface BlackSwanEvent {
  type: 'financial_crisis' | 'pandemic' | 'war' | 'natural_disaster' | 'policy_change'
  probability: number       // 发生概率 (0-1)
  impact: number           // 影响程度 (-1 到 1)
  duration: number         // 持续月数
}

// 模拟参数接口
export interface SimulationParams {
  assets: AssetPortfolio
  macroData: MacroData
  timeHorizon: number      // 模拟月数
  riskTolerance: 'low' | 'medium' | 'high'
  investmentPhilosophy: 'conservative' | 'balanced' | 'aggressive'
}

// 月度收益率接口
export interface MonthlyReturn {
  month: number
  returns: Record<AssetType, number>
  totalReturn: number
  portfolioValue: number
  riskMetrics: RiskMetrics
}

// 风险指标接口
export interface RiskMetrics {
  volatility: number       // 波动率
  sharpeRatio: number      // 夏普比率
  maxDrawdown: number      // 最大回撤
  var95: number           // 95%置信度VaR
  beta: number            // Beta系数
  correlation: number      // 资产相关性
}

// 模拟结果接口
export interface SimulationResult {
  monthlyReturns: MonthlyReturn[]
  totalReturn: number
  annualizedReturn: number
  finalPortfolioValue: number
  riskMetrics: RiskMetrics
  assetPerformance: Record<AssetType, AssetPerformance>
  macroImpact: MacroImpact
}

// 资产表现接口
export interface AssetPerformance {
  totalReturn: number
  annualizedReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  contribution: number     // 对组合的贡献度
}

// 宏观影响接口
export interface MacroImpact {
  interestRateEffect: number
  inflationEffect: number
  blackSwanEffect: number
  marketVolatilityEffect: number
  gdpEffect: number
}

/**
 * 统一资产配置模拟引擎
 */
export class UnifiedAssetEngine {
  private params = financialParamsManager.getParams()
  
  /**
   * 模拟年度资产配置
   * @param params 模拟参数
   * @returns 模拟结果
   */
  simulateYear(params: SimulationParams): SimulationResult {
    const { assets, macroData, timeHorizon } = params
    
    // 验证输入
    this.validateInput(params)
    
    const monthlyReturns: MonthlyReturn[] = []
    let currentPortfolio = { ...assets }
    let totalReturn = 0
    let maxPortfolioValue = this.getTotalAssets(currentPortfolio)
    let minPortfolioValue = maxPortfolioValue
    
    // 逐月模拟
    for (let month = 1; month <= timeHorizon; month++) {
      const monthlyReturn = this.calculateMonthlyReturn(currentPortfolio, macroData, month, params)
      monthlyReturns.push(monthlyReturn)
      
      // 更新资产组合
      currentPortfolio = this.updatePortfolio(currentPortfolio, monthlyReturn.returns)
      totalReturn += monthlyReturn.totalReturn
      
      // 更新最大/最小值
      const currentValue = monthlyReturn.portfolioValue
      maxPortfolioValue = Math.max(maxPortfolioValue, currentValue)
      minPortfolioValue = Math.min(minPortfolioValue, currentValue)
    }
    
    // 计算最终结果
    const finalPortfolioValue = this.getTotalAssets(currentPortfolio)
    const annualizedReturn = this.calculateAnnualizedReturn(totalReturn, timeHorizon)
    
    // 计算综合风险指标
    const riskMetrics = this.calculateComprehensiveRiskMetrics(monthlyReturns, maxPortfolioValue, minPortfolioValue)
    
    // 计算各资产表现
    const assetPerformance = this.calculateAssetPerformance(monthlyReturns, assets)
    
    // 计算宏观影响
    const macroImpact = this.calculateMacroImpact(macroData, monthlyReturns)
    
    return {
      monthlyReturns,
      totalReturn,
      annualizedReturn,
      finalPortfolioValue,
      riskMetrics,
      assetPerformance,
      macroImpact
    }
  }
  
  /**
   * 验证输入参数
   */
  private validateInput(params: SimulationParams): void {
    const { assets, timeHorizon } = params
    
    if (timeHorizon <= 0 || timeHorizon > 60) {
      throw new Error('时间周期必须在1-60个月之间')
    }
    
    if (Object.values(assets).every(value => value === 0)) {
      throw new Error('资产组合不能全为零')
    }
    
    // 验证收益率范围
    Object.entries(assets).forEach(([assetType, value]) => {
      if (value > 0) {
        const range = financialParamsManager.getMonthlyReturnLimits(assetType as AssetType)
        const validation = ReturnRangeAnalyzer.validateReturnRange(assetType, range.min, range.max)
        
        if (!validation.isValid) {
          console.warn(`资产 ${assetType} 的收益率范围验证失败:`, validation.warnings)
        }
      }
    })
  }
  
  /**
   * 计算月度收益率
   */
  private calculateMonthlyReturn(
    portfolio: AssetPortfolio, 
    macroData: MacroData, 
    month: number,
    params: SimulationParams
  ): MonthlyReturn {
    const returns: Record<AssetType, number> = {} as Record<AssetType, number>
    
    // 计算每个资产的月度收益率
    Object.entries(portfolio).forEach(([assetType, value]) => {
      if (value > 0) {
        returns[assetType as AssetType] = this.calculateAssetMonthlyReturn(
          assetType as AssetType, 
          macroData, 
          month,
          params
        )
      } else {
        returns[assetType as AssetType] = 0
      }
    })
    
    // 计算组合总收益率
    const totalReturn = this.calculatePortfolioReturn(portfolio, returns)
    const portfolioValue = this.getTotalAssets(portfolio) * (1 + totalReturn)
    
    // 计算月度风险指标
    const riskMetrics = this.calculateMonthlyRiskMetrics(returns, portfolio)
    
    return {
      month,
      returns,
      totalReturn,
      portfolioValue,
      riskMetrics
    }
  }
  
  /**
   * 计算特定资产的月度收益率
   */
  private calculateAssetMonthlyReturn(
    assetType: AssetType,
    macroData: MacroData,
    month: number,
    params: SimulationParams
  ): number {
    const { interestRate, inflation, gdpGrowth, marketVolatility, blackSwanEvents } = macroData
    const { riskTolerance, investmentPhilosophy } = params
    
    // 获取基础收益率
    const { baseReturn } = financialParamsManager.getAssetMetrics(assetType)
    
    // 计算各种影响因素
    const rateImpact = this.calculateInterestRateImpact(assetType, interestRate)
    const inflationImpact = this.calculateInflationImpact(assetType, inflation)
    const gdpImpact = this.calculateGdpImpact(assetType, gdpGrowth)
    const volatilityImpact = this.calculateVolatilityImpact(assetType, marketVolatility)
    const blackSwanImpact = this.calculateBlackSwanImpact(blackSwanEvents, month)
    
    // 根据风险偏好和投资哲学调整
    const riskAdjustment = this.calculateRiskAdjustment(riskTolerance, investmentPhilosophy)
    
    // 计算月度收益率
    let monthlyReturn = (baseReturn + rateImpact + inflationImpact + gdpImpact + volatilityImpact + blackSwanImpact) / 12
    monthlyReturn *= riskAdjustment
    
    // 应用收益率范围限制
    const limits = financialParamsManager.getMonthlyReturnLimits(assetType)
    monthlyReturn = Math.max(limits.min, Math.min(limits.max, monthlyReturn))
    
    return monthlyReturn
  }
  
  /**
   * 计算利率影响
   */
  private calculateInterestRateImpact(assetType: AssetType, interestRate: number): number {
    const { baseInterestRate, interestRateImpactCoefficient } = this.params
    
    switch (assetType) {
      case 'realEstate':
        return (baseInterestRate - interestRate) * interestRateImpactCoefficient.realEstate
      case 'equity':
        return (baseInterestRate - interestRate) * interestRateImpactCoefficient.equity
      default:
        return (baseInterestRate - interestRate) * interestRateImpactCoefficient.general
    }
  }
  
  /**
   * 计算通胀影响
   */
  private calculateInflationImpact(assetType: AssetType, inflation: number): number {
    const { inflationImpactCoefficient } = this.params
    
    switch (assetType) {
      case 'cash':
        return -inflation * inflationImpactCoefficient // 现金受通胀侵蚀
      case 'realEstate':
        return inflation * inflationImpactCoefficient // 房产抗通胀
      case 'equity':
        return inflation * inflationImpactCoefficient * 0.5 // 股票部分抗通胀
      default:
        return inflation * inflationImpactCoefficient * 0.3 // 其他资产轻微影响
    }
  }
  
  /**
   * 计算GDP影响
   */
  private calculateGdpImpact(assetType: AssetType, gdpGrowth: number): number {
    const { gdpImpactCoefficient } = this.params
    
    switch (assetType) {
      case 'equity':
        return gdpGrowth * gdpImpactCoefficient // 股票受益于经济增长
      case 'realEstate':
        return gdpGrowth * gdpImpactCoefficient * 0.7 // 房产部分受益
      case 'fund':
        return gdpGrowth * gdpImpactCoefficient * 0.8 // 基金受益
      default:
        return gdpGrowth * gdpImpactCoefficient * 0.3 // 其他资产轻微影响
    }
  }
  
  /**
   * 计算波动率影响
   */
  private calculateVolatilityImpact(assetType: AssetType, marketVolatility: number): number {
    switch (assetType) {
      case 'crypto':
        return marketVolatility * 0.2 // 加密货币受益于高波动
      case 'equity':
        return marketVolatility * 0.1 // 股票部分受益
      default:
        return marketVolatility * 0.05 // 其他资产轻微影响
    }
  }
  
  /**
   * 计算黑天鹅事件影响
   */
  private calculateBlackSwanImpact(blackSwanEvents: BlackSwanEvent[], month: number): number {
    const { blackSwanImpactCoefficient } = this.params
    
    return blackSwanEvents
      .filter(event => month <= event.duration)
      .reduce((total, event) => {
        return total + event.impact * event.probability * blackSwanImpactCoefficient
      }, 0)
  }
  
  /**
   * 计算风险调整系数
   */
  private calculateRiskAdjustment(riskTolerance: string, investmentPhilosophy: string): number {
    let adjustment = 1.0
    
    // 风险偏好调整
    switch (riskTolerance) {
      case 'high':
        adjustment *= 1.2
        break
      case 'low':
        adjustment *= 0.8
        break
      default:
        adjustment *= 1.0
    }
    
    // 投资哲学调整
    switch (investmentPhilosophy) {
      case 'aggressive':
        adjustment *= 1.1
        break
      case 'conservative':
        adjustment *= 0.9
        break
      default:
        adjustment *= 1.0
    }
    
    return adjustment
  }
  
  /**
   * 计算组合总收益率
   */
  private calculatePortfolioReturn(portfolio: AssetPortfolio, returns: Record<AssetType, number>): number {
    const totalAssets = this.getTotalAssets(portfolio)
    
    return Object.entries(portfolio).reduce((total, [assetType, value]) => {
      if (value > 0) {
        return total + (value / totalAssets) * returns[assetType as AssetType]
      }
      return total
    }, 0)
  }
  
  /**
   * 更新资产组合
   */
  private updatePortfolio(portfolio: AssetPortfolio, returns: Record<AssetType, number>): AssetPortfolio {
    const updated: AssetPortfolio = {} as AssetPortfolio
    
    Object.entries(portfolio).forEach(([assetType, value]) => {
      const returnRate = returns[assetType as AssetType] || 0
      updated[assetType as AssetType] = value * (1 + returnRate)
    })
    
    return updated
  }
  
  /**
   * 计算总资产
   */
  private getTotalAssets(portfolio: AssetPortfolio): number {
    return Object.values(portfolio).reduce((sum, value) => sum + value, 0)
  }
  
  /**
   * 计算年化收益率
   */
  private calculateAnnualizedReturn(totalReturn: number, timeHorizon: number): number {
    if (timeHorizon === 0) return 0
    return Math.pow(1 + totalReturn, 12 / timeHorizon) - 1
  }
  
  /**
   * 计算月度风险指标
   */
  private calculateMonthlyRiskMetrics(_returns: Record<AssetType, number>, _portfolio: AssetPortfolio): RiskMetrics {
    // 简化版本，实际应该基于历史数据计算
    return {
      volatility: 0.15,
      sharpeRatio: 0.8,
      maxDrawdown: -0.05,
      var95: -0.08,
      beta: 1.0,
      correlation: 0.3
    }
  }
  
  /**
   * 计算综合风险指标
   */
  private calculateComprehensiveRiskMetrics(
    monthlyReturns: MonthlyReturn[], 
    maxValue: number, 
    minValue: number
  ): RiskMetrics {
    // 计算波动率
    const returns = monthlyReturns.map(mr => mr.totalReturn)
    const meanReturn = returns.reduce((sum, ret) => sum + ret, 0) / returns.length
    const variance = returns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / returns.length
    const volatility = Math.sqrt(variance)
    
    // 计算最大回撤
    const maxDrawdown = (minValue - maxValue) / maxValue
    
    // 计算夏普比率（简化）
    const sharpeRatio = meanReturn / volatility
    
    // 计算VaR（95%置信度）
    const sortedReturns = [...returns].sort((a, b) => a - b)
    const varIndex = Math.floor(returns.length * 0.05)
    const var95 = sortedReturns[varIndex] || 0
    
    return {
      volatility,
      sharpeRatio: isFinite(sharpeRatio) ? sharpeRatio : 0,
      maxDrawdown,
      var95,
      beta: 1.0,
      correlation: 0.3
    }
  }
  
  /**
   * 计算各资产表现
   */
  private calculateAssetPerformance(
    monthlyReturns: MonthlyReturn[], 
    initialPortfolio: AssetPortfolio
  ): Record<AssetType, AssetPerformance> {
    const performance: Record<AssetType, AssetPerformance> = {} as Record<AssetType, AssetPerformance>
    
    Object.entries(initialPortfolio).forEach(([assetType, initialValue]) => {
      if (initialValue > 0) {
        const assetReturns = monthlyReturns.map(mr => mr.returns[assetType as AssetType])
        const totalReturn = assetReturns.reduce((sum, ret) => sum + ret, 0)
        const annualizedReturn = this.calculateAnnualizedReturn(totalReturn, monthlyReturns.length)
        
        // 计算波动率
        const meanReturn = assetReturns.reduce((sum, ret) => sum + ret, 0) / assetReturns.length
        const variance = assetReturns.reduce((sum, ret) => sum + Math.pow(ret - meanReturn, 2), 0) / assetReturns.length
        const volatility = Math.sqrt(variance)
        
        // 计算夏普比率
        const sharpeRatio = meanReturn / volatility
        
        // 计算最大回撤
        let maxValue = initialValue
        let minValue = initialValue
        let currentValue = initialValue
        
        assetReturns.forEach(ret => {
          currentValue *= (1 + ret)
          maxValue = Math.max(maxValue, currentValue)
          minValue = Math.min(minValue, currentValue)
        })
        
        const maxDrawdown = (minValue - maxValue) / maxValue
        
        // 计算贡献度
        const finalValue = currentValue
        const contribution = (finalValue - initialValue) / this.getTotalAssets(initialPortfolio)
        
        performance[assetType as AssetType] = {
          totalReturn,
          annualizedReturn,
          volatility,
          sharpeRatio: isFinite(sharpeRatio) ? sharpeRatio : 0,
          maxDrawdown,
          contribution
        }
      }
    })
    
    return performance
  }
  
  /**
   * 计算宏观影响
   */
  private calculateMacroImpact(macroData: MacroData, _monthlyReturns: MonthlyReturn[]): MacroImpact {
    const { interestRate, inflation, gdpGrowth, marketVolatility, blackSwanEvents } = macroData
    
    // 计算利率影响
    const interestRateEffect = (this.params.baseInterestRate - interestRate) * this.params.interestRateImpactCoefficient.general
    
    // 计算通胀影响
    const inflationEffect = inflation * this.params.inflationImpactCoefficient
    
    // 计算黑天鹅事件影响
    const blackSwanEffect = blackSwanEvents.reduce((sum, event) => {
      return sum + event.impact * event.probability * this.params.blackSwanImpactCoefficient
    }, 0)
    
    // 计算市场波动性影响
    const marketVolatilityEffect = marketVolatility * 0.1
    
    // 计算GDP影响
    const gdpEffect = gdpGrowth * this.params.gdpImpactCoefficient
    
    return {
      interestRateEffect,
      inflationEffect,
      blackSwanEffect,
      marketVolatilityEffect,
      gdpEffect
    }
  }
}

// 导出统一引擎实例
export const unifiedAssetEngine = new UnifiedAssetEngine()

// 类型已在类定义中导出
