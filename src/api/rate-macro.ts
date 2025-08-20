/**
 * 宏观数据Mock API
 * 提供利率、通胀、GDP等宏观经济数据
 * @author @eclipsecybertitan
 */

import { MacroData, MacroDataSchema, ApiResponse, ErrorCode } from './types'

/**
 * 生成模拟宏观数据
 * 基于当前时间和随机种子生成合理的宏观经济数据
 */
export function generateMockMacroData(seed?: number): MacroData {
  const now = new Date()
  const timeSeed = seed || now.getTime()
  const random = (min: number, max: number) => {
    const x = Math.sin(timeSeed) * 10000
    return min + (x - Math.floor(x)) * (max - min)
  }

  // 生成基础宏观数据
  const baseData: MacroData = {
    interestRate: random(0.5, 5.5), // 0.5% - 5.5%
    inflation: random(1.5, 8.0),    // 1.5% - 8.0%
    gdpGrowth: random(1.0, 4.5),    // 1.0% - 4.5%
    marketVolatility: random(0.1, 0.8), // 0.1 - 0.8
    blackSwanEvents: []
  }

  // 生成黑天鹅事件（低概率）
  if (random(0, 1) < 0.15) {
    const eventTypes = ['financial_crisis', 'pandemic', 'war', 'natural_disaster', 'policy_change']
    const eventType = eventTypes[Math.floor(random(0, eventTypes.length))]
    
    baseData.blackSwanEvents.push({
      type: eventType as any,
      probability: random(0.05, 0.3),
      impact: random(-0.8, -0.2),
      duration: Math.floor(random(3, 18))
    })
  }

  // 根据利率调整其他指标
  if (baseData.interestRate > 4.0) {
    baseData.inflation = Math.max(1.5, baseData.inflation - random(0.5, 2.0))
    baseData.gdpGrowth = Math.max(0.5, baseData.gdpGrowth - random(0.3, 1.5))
  } else if (baseData.interestRate < 1.5) {
    baseData.inflation = Math.min(8.0, baseData.inflation + random(0.3, 1.5))
    baseData.gdpGrowth = Math.min(4.5, baseData.gdpGrowth + random(0.2, 1.0))
  }

  return baseData
}

/**
 * 获取宏观数据API
 * 返回标准化的API响应格式
 */
export async function getMacroData(seed?: number): Promise<ApiResponse<MacroData>> {
  try {
    const macroData = generateMockMacroData(seed)
    
    // Zod校验
    const validatedData = MacroDataSchema.parse(macroData)
    
    return {
      success: true,
      data: validatedData,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        version: '1.0.0'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: ErrorCode.ERR_SIMULATION_FAILED,
        message: '宏观数据生成失败',
        details: error instanceof Error ? error.message : '未知错误',
        stack: error instanceof Error ? error.stack : undefined
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        version: '1.0.0'
      }
    }
  }
}

/**
 * 获取历史宏观数据
 * 返回指定时间段的宏观数据序列
 */
export async function getHistoricalMacroData(
  startDate: Date,
  endDate: Date,
  interval: 'daily' | 'weekly' | 'monthly' = 'monthly'
): Promise<ApiResponse<MacroData[]>> {
  try {
    const data: MacroData[] = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= endDate) {
      const seed = currentDate.getTime()
      const macroData = generateMockMacroData(seed)
      data.push(macroData)
      
      // 根据间隔调整日期
      switch (interval) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + 1)
          break
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 7)
          break
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1)
          break
      }
    }
    
    return {
      success: true,
      data: data,
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        version: '1.0.0',
        pagination: {
          page: 1,
          limit: data.length,
          total: data.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: ErrorCode.ERR_SIMULATION_FAILED,
        message: '历史宏观数据生成失败',
        details: error instanceof Error ? error.message : '未知错误',
        stack: error instanceof Error ? error.stack : undefined
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        version: '1.0.0'
      }
    }
  }
}

/**
 * 获取宏观数据趋势
 * 分析宏观数据的变化趋势
 */
export async function getMacroTrends(
  dataPoints: number = 12
): Promise<ApiResponse<{
  interestRateTrend: 'rising' | 'falling' | 'stable'
  inflationTrend: 'rising' | 'falling' | 'stable'
  gdpTrend: 'rising' | 'falling' | 'stable'
  riskLevel: 'low' | 'medium' | 'high'
}>> {
  try {
    const historicalData = await getHistoricalMacroData(
      new Date(Date.now() - dataPoints * 30 * 24 * 60 * 60 * 1000),
      new Date(),
      'monthly'
    )
    
    if (!historicalData.success || !historicalData.data) {
      throw new Error('无法获取历史数据')
    }
    
    const data = historicalData.data
    if (data.length < 2) {
      throw new Error('数据点不足，无法分析趋势')
    }
    
    // 计算趋势
    const first = data[0]
    const last = data[data.length - 1]
    
    const interestRateTrend = getTrend(first.interestRate, last.interestRate)
    const inflationTrend = getTrend(first.inflation, last.inflation)
    const gdpTrend = getTrend(first.gdpGrowth, last.gdpGrowth)
    
    // 计算风险等级
    const riskLevel = calculateRiskLevel(last)
    
    return {
      success: true,
      data: {
        interestRateTrend,
        inflationTrend,
        gdpTrend,
        riskLevel
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        version: '1.0.0'
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: ErrorCode.ERR_SIMULATION_FAILED,
        message: '宏观趋势分析失败',
        details: error instanceof Error ? error.message : '未知错误',
        stack: error instanceof Error ? error.stack : undefined
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId(),
        version: '1.0.0'
      }
    }
  }
}

/**
 * 辅助函数：判断趋势
 */
function getTrend(start: number, end: number): 'rising' | 'falling' | 'stable' {
  const change = end - start
  const threshold = Math.abs(start) * 0.05 // 5%变化阈值
  
  if (Math.abs(change) < threshold) return 'stable'
  return change > 0 ? 'rising' : 'falling'
}

/**
 * 辅助函数：计算风险等级
 */
function calculateRiskLevel(data: MacroData): 'low' | 'medium' | 'high' {
  let riskScore = 0
  
  // 利率风险
  if (data.interestRate > 4.0) riskScore += 2
  else if (data.interestRate < 1.0) riskScore += 1
  
  // 通胀风险
  if (data.inflation > 6.0) riskScore += 3
  else if (data.inflation < 2.0) riskScore += 1
  
  // GDP风险
  if (data.gdpGrowth < 1.0) riskScore += 2
  else if (data.gdpGrowth > 4.0) riskScore += 1
  
  // 市场波动风险
  if (data.marketVolatility > 0.6) riskScore += 2
  
  // 黑天鹅事件风险
  riskScore += data.blackSwanEvents.length * 3
  
  if (riskScore <= 3) return 'low'
  if (riskScore <= 7) return 'medium'
  return 'high'
}

/**
 * 生成请求ID
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 开发者签名: @eclipsecybertitan
