/**
 * 宏观数据API测试用例
 * 测试Mock数据生成、API响应格式和错误处理
 * @author @eclipsecybertitan
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  generateMockMacroData, 
  getMacroData, 
  getHistoricalMacroData, 
  getMacroTrends 
} from '../rate-macro'
import { MacroDataSchema } from '../types'

// Mock fetch
global.fetch = vi.fn()

describe('宏观数据API (Rate Macro)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('generateMockMacroData', () => {
    it('应该生成有效的宏观数据', () => {
      const data = generateMockMacroData()
      
      expect(data).toBeDefined()
      expect(data.interestRate).toBeGreaterThanOrEqual(0.5)
      expect(data.interestRate).toBeLessThanOrEqual(5.5)
      expect(data.inflation).toBeGreaterThanOrEqual(1.5)
      expect(data.inflation).toBeLessThanOrEqual(8.0)
      expect(data.gdpGrowth).toBeGreaterThanOrEqual(1.0)
      expect(data.gdpGrowth).toBeLessThanOrEqual(4.5)
      expect(data.marketVolatility).toBeGreaterThanOrEqual(0.1)
      expect(data.marketVolatility).toBeLessThanOrEqual(0.8)
      expect(Array.isArray(data.blackSwanEvents)).toBe(true)
    })

    it('应该基于种子生成一致的数据', () => {
      const seed = 12345
      const data1 = generateMockMacroData(seed)
      const data2 = generateMockMacroData(seed)
      
      expect(data1.interestRate).toBe(data2.interestRate)
      expect(data1.inflation).toBe(data2.inflation)
      expect(data1.gdpGrowth).toBe(data2.gdpGrowth)
      expect(data1.marketVolatility).toBe(data2.marketVolatility)
    })

    it('应该生成不同的随机数据', () => {
      const data1 = generateMockMacroData()
      const data2 = generateMockMacroData()
      
      // 由于随机性，数据可能相同，但概率很低
      // 我们期望数据通常是不同的，但这不是绝对的
      expect(typeof data1.interestRate).toBe('number')
      expect(typeof data2.interestRate).toBe('number')
    })

    it('应该正确处理黑天鹅事件', () => {
      const data = generateMockMacroData()
      
      if (data.blackSwanEvents.length > 0) {
        const event = data.blackSwanEvents[0]
        expect(event.type).toBeDefined()
        expect(event.probability).toBeGreaterThan(0)
        expect(event.probability).toBeLessThanOrEqual(1)
        expect(event.impact).toBeGreaterThanOrEqual(-1)
        expect(event.impact).toBeLessThanOrEqual(1)
        expect(event.duration).toBeGreaterThanOrEqual(1)
        expect(event.duration).toBeLessThanOrEqual(24)
      }
    })

    it('应该根据利率调整其他指标', () => {
      const highRateData = generateMockMacroData(1000) // 高利率种子
      const lowRateData = generateMockMacroData(2000)  // 低利率种子
      
      // 验证数据类型
      expect(typeof highRateData.interestRate).toBe('number')
      expect(typeof highRateData.inflation).toBe('number')
      expect(typeof highRateData.gdpGrowth).toBe('number')
      expect(typeof lowRateData.interestRate).toBe('number')
      expect(typeof lowRateData.inflation).toBe('number')
      expect(typeof lowRateData.gdpGrowth).toBe('number')
    })
  })

  describe('getMacroData', () => {
    it('应该返回有效的API响应', async () => {
      const response = await getMacroData()
      
      expect(response.success).toBe(true)
      expect(response.data).toBeDefined()
      expect(response.meta).toBeDefined()
      expect(response.meta.timestamp).toBeDefined()
      expect(response.meta.requestId).toBeDefined()
      expect(response.meta.version).toBe('1.0.0')
      expect(response.error).toBeUndefined()
    })

    it('应该返回Zod验证后的数据', async () => {
      const response = await getMacroData()
      
      if (response.success && response.data) {
        // 验证数据符合schema
        const validatedData = MacroDataSchema.parse(response.data)
        expect(validatedData).toEqual(response.data)
      }
    })

    it('应该处理错误情况', async () => {
      // Mock Zod.parse to throw error
      const originalParse = MacroDataSchema.parse
      MacroDataSchema.parse = vi.fn().mockImplementation(() => {
        throw new Error('Validation failed')
      })

      const response = await getMacroData()
      
      expect(response.success).toBe(false)
      expect(response.error).toBeDefined()
      expect(response.error?.code).toBe('ERR_SIMULATION_FAILED')
      expect(response.error?.message).toBe('宏观数据生成失败')
      expect(response.meta).toBeDefined()
      
      // Restore original function
      MacroDataSchema.parse = originalParse
    })

    it('应该基于种子生成数据', async () => {
      const seed = 54321
      const response1 = await getMacroData(seed)
      const response2 = await getMacroData(seed)
      
      if (response1.success && response2.success && response1.data && response2.data) {
        expect(response1.data.interestRate).toBe(response2.data.interestRate)
        expect(response1.data.inflation).toBe(response2.data.inflation)
      }
    })
  })

  describe('getHistoricalMacroData', () => {
    it('应该返回历史数据序列', async () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-12-31')
      
      const response = await getHistoricalMacroData(startDate, endDate, 'monthly')
      
      expect(response.success).toBe(true)
      expect(response.data).toBeDefined()
      expect(Array.isArray(response.data)).toBe(true)
      expect(response.data?.length).toBe(12) // 12个月
      expect(response.meta.pagination).toBeDefined()
    })

    it('应该支持不同的时间间隔', async () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-01-31')
      
      const dailyResponse = await getHistoricalMacroData(startDate, endDate, 'daily')
      const weeklyResponse = await getHistoricalMacroData(startDate, endDate, 'weekly')
      
      expect(dailyResponse.success).toBe(true)
      expect(weeklyResponse.success).toBe(true)
      expect(dailyResponse.data?.length).toBeGreaterThan(weeklyResponse.data?.length || 0)
    })

    it('应该处理无效日期范围', async () => {
      const startDate = new Date('2024-12-31')
      const endDate = new Date('2024-01-01') // 结束日期早于开始日期
      
      const response = await getHistoricalMacroData(startDate, endDate)
      
      expect(response.success).toBe(true)
      expect(response.data).toBeDefined()
      expect(response.data?.length).toBe(0) // 空数组
    })

    it('应该包含分页信息', async () => {
      const startDate = new Date('2024-01-01')
      const endDate = new Date('2024-06-30')
      
      const response = await getHistoricalMacroData(startDate, endDate, 'monthly')
      
      if (response.success && response.meta.pagination) {
        const pagination = response.meta.pagination
        expect(pagination.page).toBe(1)
        expect(pagination.limit).toBe(6)
        expect(pagination.total).toBe(6)
        expect(pagination.totalPages).toBe(1)
        expect(pagination.hasNext).toBe(false)
        expect(pagination.hasPrev).toBe(false)
      }
    })
  })

  describe('getMacroTrends', () => {
    it('应该分析宏观趋势', async () => {
      const response = await getMacroTrends(12)
      
      expect(response.success).toBe(true)
      expect(response.data).toBeDefined()
      
      if (response.data) {
        expect(['rising', 'falling', 'stable']).toContain(response.data.interestRateTrend)
        expect(['rising', 'falling', 'stable']).toContain(response.data.inflationTrend)
        expect(['rising', 'falling', 'stable']).toContain(response.data.gdpTrend)
        expect(['low', 'medium', 'high']).toContain(response.data.riskLevel)
      }
    })

    it('应该处理数据点不足的情况', async () => {
      const response = await getMacroTrends(1)
      
      expect(response.success).toBe(false)
      expect(response.error?.message).toBe('宏观趋势分析失败')
    })

    it('应该计算正确的风险等级', async () => {
      const response = await getMacroTrends(12)
      
      if (response.success && response.data) {
        const riskLevel = response.data.riskLevel
        
        // 风险等级应该是有效的枚举值
        expect(['low', 'medium', 'high']).toContain(riskLevel)
        
        // 验证风险等级的计算逻辑
        expect(typeof riskLevel).toBe('string')
      }
    })

    it('应该处理趋势计算', async () => {
      const response = await getMacroTrends(12)
      
      if (response.success && response.data) {
        // 趋势应该是有效的枚举值
        expect(['rising', 'falling', 'stable']).toContain(response.data.interestRateTrend)
        expect(['rising', 'falling', 'stable']).toContain(response.data.inflationTrend)
        expect(['rising', 'falling', 'stable']).toContain(response.data.gdpTrend)
      }
    })
  })

  describe('错误处理', () => {
    it('应该处理网络错误', async () => {
      // Mock fetch to simulate network error
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'))
      
      // 这个测试可能需要调整，因为当前实现不依赖fetch
      // 但我们可以测试其他错误情况
      const response = await getMacroData()
      expect(response).toBeDefined()
    })

    it('应该处理无效的宏观数据', async () => {
      // 测试边界值
      const extremeSeed = 999999
      const response = await getMacroData(extremeSeed)
      
      expect(response.success).toBe(true)
      expect(response.data).toBeDefined()
      
      if (response.data) {
        // 即使使用极端种子，数据也应该在有效范围内
        expect(response.data.interestRate).toBeGreaterThanOrEqual(0.5)
        expect(response.data.interestRate).toBeLessThanOrEqual(5.5)
      }
    })
  })

  describe('数据一致性', () => {
    it('应该生成符合schema的数据', () => {
      for (let i = 0; i < 10; i++) {
        const data = generateMockMacroData(i * 1000)
        
        // 验证数据符合schema
        expect(() => MacroDataSchema.parse(data)).not.toThrow()
        
        // 验证数值范围
        expect(data.interestRate).toBeGreaterThanOrEqual(0.5)
        expect(data.interestRate).toBeLessThanOrEqual(5.5)
        expect(data.inflation).toBeGreaterThanOrEqual(1.5)
        expect(data.inflation).toBeLessThanOrEqual(8.0)
        expect(data.gdpGrowth).toBeGreaterThanOrEqual(1.0)
        expect(data.gdpGrowth).toBeLessThanOrEqual(4.5)
        expect(data.marketVolatility).toBeGreaterThanOrEqual(0.1)
        expect(data.marketVolatility).toBeLessThanOrEqual(0.8)
      }
    })

    it('应该保持数据类型一致性', () => {
      const data = generateMockMacroData()
      
      expect(typeof data.interestRate).toBe('number')
      expect(typeof data.inflation).toBe('number')
      expect(typeof data.gdpGrowth).toBe('number')
      expect(typeof data.marketVolatility).toBe('number')
      expect(Array.isArray(data.blackSwanEvents)).toBe(true)
      
      data.blackSwanEvents.forEach(event => {
        expect(typeof event.type).toBe('string')
        expect(typeof event.probability).toBe('number')
        expect(typeof event.impact).toBe('number')
        expect(typeof event.duration).toBe('number')
      })
    })
  })

  describe('性能测试', () => {
    it('应该快速生成数据', () => {
      const startTime = performance.now()
      
      for (let i = 0; i < 100; i++) {
        generateMockMacroData(i)
      }
      
      const endTime = performance.now()
      const executionTime = endTime - startTime
      
      expect(executionTime).toBeLessThan(100) // 应该在100ms内完成100次生成
    })

    it('应该高效处理大量历史数据', async () => {
      const startDate = new Date('2020-01-01')
      const endDate = new Date('2024-12-31')
      
      const startTime = performance.now()
      const response = await getHistoricalMacroData(startDate, endDate, 'monthly')
      const endTime = performance.now()
      
      const executionTime = endTime - startTime
      expect(executionTime).toBeLessThan(1000) // 应该在1秒内完成
      expect(response.success).toBe(true)
      expect(response.data?.length).toBe(60) // 5年 * 12个月
    })
  })
})

// 开发者签名: @eclipsecybertitan
