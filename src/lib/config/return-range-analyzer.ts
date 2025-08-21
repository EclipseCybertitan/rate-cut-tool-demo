/**
 * 收益率范围分析器
 * 基于历史数据动态计算合理的收益率范围
 */

import { BACKTEST_DATA } from '../backtest-data'

export interface ReturnRangeAnalysis {
  assetType: string
  monthlyRange: {
    min: number
    max: number
    mean: number
    stdDev: number
  }
  confidenceInterval: {
    lower95: number
    upper95: number
  }
  recommendation: string
}

/**
 * 基于历史数据计算收益率范围
 */
export class ReturnRangeAnalyzer {
  /**
   * 分析特定资产的收益率范围
   */
  static analyzeAssetReturnRange(assetType: string): ReturnRangeAnalysis {
    // 过滤相关历史数据
    const relevantData = BACKTEST_DATA.filter(data => 
      data.assetType.includes(assetType) || 
      this.mapAssetType(assetType).some(type => data.assetType.includes(type))
    )
    
    if (relevantData.length === 0) {
      // 如果没有历史数据，使用默认配置
      return this.getDefaultRange(assetType)
    }
    
    // 计算历史收益率的统计特征
    const returns = relevantData.map(data => data.historicalReturn / 100) // 转换为小数
    const monthlyReturns = returns.map(annualReturn => annualReturn / 12) // 转换为月度
    
    const mean = this.calculateMean(monthlyReturns)
    const stdDev = this.calculateStdDev(monthlyReturns, mean)
    
    // 计算95%置信区间
    const lower95 = mean - 1.96 * stdDev
    const upper95 = mean + 1.96 * stdDev
    
    // 基于历史数据确定合理范围
    const min = Math.max(-0.3, lower95) // 限制在-30%以上
    const max = Math.min(0.3, upper95)  // 限制在30%以下
    
    return {
      assetType,
      monthlyRange: {
        min,
        max,
        mean,
        stdDev
      },
      confidenceInterval: {
        lower95,
        upper95
      },
      recommendation: this.generateRecommendation(assetType, min, max, stdDev)
    }
  }
  
  /**
   * 计算平均值
   */
  private static calculateMean(values: number[]): number {
    return values.reduce((sum, val) => sum + val, 0) / values.length
  }
  
  /**
   * 计算标准差
   */
  private static calculateStdDev(values: number[], mean: number): number {
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length
    return Math.sqrt(variance)
  }
  
  /**
   * 映射资产类型到历史数据中的名称
   */
  private static mapAssetType(assetType: string): string[] {
    const mapping: Record<string, string[]> = {
      'equity': ['股票', '纳斯达克', 'S&P', '道琼斯'],
      'realEstate': ['房价', '房产', '房地产'],
      'cash': ['现金', '存款', '货币'],
      'fund': ['基金', 'ETF', '共同基金'],
      'crypto': ['比特币', '加密货币', '数字货币'],
      'insurance': ['保险', '年金', '寿险']
    }
    
    return mapping[assetType] || []
  }
  
  /**
   * 获取默认收益率范围（当没有历史数据时使用）
   */
  private static getDefaultRange(assetType: string): ReturnRangeAnalysis {
    const defaultRanges: Record<string, { min: number; max: number }> = {
      'equity': { min: -0.12, max: 0.15 },
      'realEstate': { min: -0.08, max: 0.10 },
      'cash': { min: -0.02, max: 0.04 },
      'fund': { min: -0.10, max: 0.12 },
      'crypto': { min: -0.25, max: 0.30 },
      'insurance': { min: -0.05, max: 0.08 }
    }
    
    const range = defaultRanges[assetType] || { min: -0.10, max: 0.10 }
    
    return {
      assetType,
      monthlyRange: {
        ...range,
        mean: (range.min + range.max) / 2,
        stdDev: (range.max - range.min) / 4
      },
      confidenceInterval: {
        lower95: range.min,
        upper95: range.max
      },
      recommendation: `使用默认配置的收益率范围：${(range.min * 100).toFixed(1)}% 到 ${(range.max * 100).toFixed(1)}%`
    }
  }
  
  /**
   * 生成收益率范围建议
   */
  private static generateRecommendation(
    assetType: string, 
    min: number, 
    max: number, 
    stdDev: number
  ): string {
    const volatility = stdDev * 12 // 转换为年化波动率
    
    if (volatility > 0.3) {
      return `${assetType}波动性较高，建议收益率范围：${(min * 100).toFixed(1)}% 到 ${(max * 100).toFixed(1)}%`
    } else if (volatility > 0.15) {
      return `${assetType}波动性中等，建议收益率范围：${(min * 100).toFixed(1)}% 到 ${(max * 100).toFixed(1)}%`
    } else {
      return `${assetType}波动性较低，建议收益率范围：${(min * 100).toFixed(1)}% 到 ${(max * 100).toFixed(1)}%`
    }
  }
  
  /**
   * 批量分析所有资产的收益率范围
   */
  static analyzeAllAssetRanges(): Record<string, ReturnRangeAnalysis> {
    const assetTypes = ['equity', 'realEstate', 'cash', 'fund', 'crypto', 'insurance']
    const results: Record<string, ReturnRangeAnalysis> = {}
    
    assetTypes.forEach(assetType => {
      results[assetType] = this.analyzeAssetReturnRange(assetType)
    })
    
    return results
  }
  
  /**
   * 验证收益率范围的合理性
   */
  static validateReturnRange(_assetType: string, min: number, max: number): {
    isValid: boolean
    warnings: string[]
    suggestions: string[]
  } {
    const warnings: string[] = []
    const suggestions: string[] = []
    
    // 检查范围是否合理
    if (min >= max) {
      warnings.push('收益率下限必须小于上限')
    }
    
    if (min < -0.5) {
      warnings.push('月度收益率下限不应低于-50%')
      suggestions.push('考虑将下限调整为-30%到-40%之间')
    }
    
    if (max > 0.5) {
      warnings.push('月度收益率上限不应超过50%')
      suggestions.push('考虑将上限调整为30%到40%之间')
    }
    
    // 检查范围是否过宽
    const range = max - min
    if (range > 0.6) {
      warnings.push('收益率范围过宽，可能影响模拟的准确性')
      suggestions.push('建议将范围控制在40%以内')
    }
    
    // 检查是否过于保守
    if (range < 0.1) {
      warnings.push('收益率范围过窄，可能无法反映真实的市场波动')
      suggestions.push('建议扩大范围以包含更多市场情景')
    }
    
    return {
      isValid: warnings.length === 0,
      warnings,
      suggestions
    }
  }
}

// 分析器类已在顶部导出
