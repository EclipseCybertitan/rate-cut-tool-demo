/**
 * 金融参数配置文件
 * 集中管理所有金融计算相关的参数，避免硬编码
 */

export interface FinancialParameters {
  // 基准利率相关
  baseInterestRate: number
  
  // 通胀影响系数
  inflationImpactCoefficient: number
  
  // 利率影响系数
  interestRateImpactCoefficient: {
    realEstate: number
    equity: number
    general: number
  }
  
  // GDP影响系数
  gdpImpactCoefficient: number
  
  // 黑天鹅事件影响系数
  blackSwanImpactCoefficient: number
  
  // 资产基础收益率
  assetBaseReturns: {
    equity: number
    realEstate: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  
  // 资产波动率
  assetVolatility: {
    equity: number
    realEstate: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  
  // 月度收益率范围限制
  monthlyReturnLimits: {
    equity: { min: number; max: number }
    realEstate: { min: number; max: number }
    cash: { min: number; max: number }
    fund: { min: number; max: number }
    crypto: { min: number; max: number }
    insurance: { min: number; max: number }
  }
  
  // 降息影响系数（用于RateCutAnalysisPage）
  rateCutImpactCoefficients: {
    equity: number
    realEstate: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
}

/**
 * 默认金融参数配置
 * 基于历史数据和金融理论设定的合理值
 */
export const DEFAULT_FINANCIAL_PARAMS: FinancialParameters = {
  // 基准利率：基于当前美联储基准利率
  baseInterestRate: 5.25,
  
  // 通胀影响系数：基于历史数据拟合
  inflationImpactCoefficient: 0.3,
  
  // 利率影响系数：不同资产对利率变化的敏感度
  interestRateImpactCoefficient: {
    realEstate: 0.01,    // 房产对利率变化敏感
    equity: 0.015,       // 股票对利率变化敏感
    general: 0.01        // 一般资产对利率变化敏感
  },
  
  // GDP影响系数：经济增长对资产收益的影响
  gdpImpactCoefficient: 0.4,
  
  // 黑天鹅事件影响系数：极端事件的影响程度
  blackSwanImpactCoefficient: 0.3,
  
  // 资产基础收益率：基于历史平均年化收益率
  assetBaseReturns: {
    equity: 0.10,        // 股票历史平均年化10%
    realEstate: 0.08,    // 房产历史平均年化8%
    cash: 0.03,          // 现金历史平均年化3%
    fund: 0.07,          // 基金历史平均年化7%
    crypto: 0.15,        // 加密货币历史平均年化15%
    insurance: 0.04      // 保险历史平均年化4%
  },
  
  // 资产波动率：基于历史波动率数据
  assetVolatility: {
    equity: 0.18,        // 股票年化波动率18%
    realEstate: 0.12,    // 房产年化波动率12%
    cash: 0.02,          // 现金年化波动率2%
    fund: 0.14,          // 基金年化波动率14%
    crypto: 0.80,        // 加密货币年化波动率80%
    insurance: 0.08      // 保险年化波动率8%
  },
  
  // 月度收益率范围限制：基于历史数据的95%置信区间
  monthlyReturnLimits: {
    equity: { min: -0.12, max: 0.15 },      // 股票月度-12%到15%
    realEstate: { min: -0.08, max: 0.10 },  // 房产月度-8%到10%
    cash: { min: -0.05, max: 0.08 },        // 现金月度-5%到8%
    fund: { min: -0.10, max: 0.12 },        // 基金月度-10%到12%
    crypto: { min: -0.25, max: 0.30 },      // 加密货币月度-25%到30%
    insurance: { min: -0.05, max: 0.08 }    // 保险月度-5%到8%
  },
  
  // 降息影响系数：基于历史降息周期的资产表现
  rateCutImpactCoefficients: {
    equity: 0.15,        // 股票受益于降息
    realEstate: 0.12,    // 房产受益于低利率
    cash: -0.05,         // 现金收益下降
    fund: 0.08,          // 基金混合影响
    crypto: 0.25,        // 加密货币高波动
    insurance: -0.02     // 保险轻微负面
  }
}

/**
 * 金融参数管理器
 * 提供参数的获取、更新和验证功能
 */
export class FinancialParamsManager {
  private params: FinancialParameters
  
  constructor(initialParams?: Partial<FinancialParameters>) {
    this.params = { ...DEFAULT_FINANCIAL_PARAMS, ...initialParams }
  }
  
  /**
   * 获取当前参数配置
   */
  getParams(): FinancialParameters {
    return { ...this.params }
  }
  
  /**
   * 更新特定参数
   */
  updateParams(updates: Partial<FinancialParameters>): void {
    this.params = { ...this.params, ...updates }
  }
  
  /**
   * 重置为默认参数
   */
  resetToDefaults(): void {
    this.params = { ...DEFAULT_FINANCIAL_PARAMS }
  }
  
  /**
   * 验证参数的有效性
   */
  validateParams(): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    // 检查基准利率是否为正数
    if (this.params.baseInterestRate <= 0) {
      errors.push('基准利率必须为正数')
    }
    
    // 检查影响系数是否在合理范围内
    if (this.params.inflationImpactCoefficient < 0 || this.params.inflationImpactCoefficient > 1) {
      errors.push('通胀影响系数必须在0-1之间')
    }
    
    // 检查收益率范围是否合理
    Object.entries(this.params.monthlyReturnLimits).forEach(([asset, limits]) => {
      if (limits.min >= limits.max) {
        errors.push(`${asset}的月度收益率下限必须小于上限`)
      }
      if (limits.min < -0.5 || limits.max > 0.5) {
        errors.push(`${asset}的月度收益率范围超出合理范围(-50%到50%)`)
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }
  
  /**
   * 获取特定资产的月度收益率限制
   */
  getMonthlyReturnLimits(assetType: keyof FinancialParameters['monthlyReturnLimits']) {
    return this.params.monthlyReturnLimits[assetType]
  }
  
  /**
   * 获取特定资产的降息影响系数
   */
  getRateCutImpactCoefficient(assetType: keyof FinancialParameters['rateCutImpactCoefficients']) {
    return this.params.rateCutImpactCoefficients[assetType]
  }
  
  /**
   * 获取特定资产的基础收益率和波动率
   */
  getAssetMetrics(assetType: keyof FinancialParameters['assetBaseReturns']) {
    return {
      baseReturn: this.params.assetBaseReturns[assetType],
      volatility: this.params.assetVolatility[assetType]
    }
  }
}

// 导出默认实例
export const financialParamsManager = new FinancialParamsManager()
