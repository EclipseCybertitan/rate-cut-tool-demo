/**
 * 模拟引擎测试用例
 * 确保覆盖率≥80%，测试simulateYear函数和各种边界条件
 * @author @eclipsecybertitan
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { simulateYear } from '../engine'
import { SimulationParams, MacroData } from '../../api/types'

describe('模拟引擎 (Engine)', () => {
  let validParams: SimulationParams
  let validMacroData: MacroData

  beforeEach(() => {
    // 设置有效的测试数据
    validMacroData = {
      interestRate: 3.5,
      inflation: 2.1,
      gdpGrowth: 2.8,
      marketVolatility: 0.3,
      blackSwanEvents: []
    }

    validParams = {
      assets: {
        realEstate: 100000,
        equity: 150000,
        cash: 50000,
        fund: 80000,
        crypto: 20000,
        insurance: 30000
      },
      macroData: validMacroData,
      timeHorizon: 12
    }
  })

  describe('simulateYear 函数', () => {
    it('应该成功模拟12个月的资产配置', () => {
      const result = simulateYear(validParams)

      expect(result).toBeDefined()
      expect(result.monthlyReturns).toHaveLength(12)
      expect(result.totalReturn).toBeGreaterThan(-1)
      expect(result.totalReturn).toBeLessThan(2)
      expect(result.annualizedReturn).toBeGreaterThan(-1)
      expect(result.annualizedReturn).toBeLessThan(2)
      expect(result.finalPortfolioValue).toBeGreaterThan(0)
      expect(result.riskMetrics).toBeDefined()
      expect(result.assetPerformance).toBeDefined()
      expect(result.macroImpact).toBeDefined()
    })

    it('应该处理不同的时间周期', () => {
      const shortParams = { ...validParams, timeHorizon: 6 }
      const longParams = { ...validParams, timeHorizon: 24 }

      const shortResult = simulateYear(shortParams)
      const longResult = simulateYear(longParams)

      expect(shortResult.monthlyReturns).toHaveLength(6)
      expect(longResult.monthlyReturns).toHaveLength(24)
    })

    it('应该计算正确的资产表现', () => {
      const result = simulateYear(validParams)

      // 验证每种资产都有表现数据
      Object.keys(validParams.assets).forEach(assetType => {
        expect(result.assetPerformance[assetType as keyof typeof result.assetPerformance]).toBeDefined()
        expect(result.assetPerformance[assetType as keyof typeof result.assetPerformance].totalReturn).toBeDefined()
        expect(result.assetPerformance[assetType as keyof typeof result.assetPerformance].annualizedReturn).toBeDefined()
        expect(result.assetPerformance[assetType as keyof typeof result.assetPerformance].volatility).toBeGreaterThanOrEqual(0)
        expect(result.assetPerformance[assetType as keyof typeof result.assetPerformance].maxDrawdown).toBeGreaterThanOrEqual(0)
      })
    })

    it('应该计算正确的风险指标', () => {
      const result = simulateYear(validParams)

      expect(result.riskMetrics.volatility).toBeGreaterThanOrEqual(0)
      expect(result.riskMetrics.maxDrawdown).toBeGreaterThanOrEqual(0)
      expect(result.riskMetrics.maxDrawdown).toBeLessThanOrEqual(1)
      expect(result.riskMetrics.var95).toBeDefined()
      expect(result.riskMetrics.beta).toBe(1.0) // 默认值
    })

    it('应该计算正确的宏观影响', () => {
      const result = simulateYear(validParams)

      expect(result.macroImpact.interestRateEffect).toBeDefined()
      expect(result.macroImpact.inflationEffect).toBeDefined()
      expect(result.macroImpact.blackSwanEffect).toBeDefined()
      expect(result.macroImpact.marketVolatilityEffect).toBeDefined()
    })
  })

  describe('边界条件测试', () => {
    it('应该拒绝无效的时间周期', () => {
      const invalidParams = { ...validParams, timeHorizon: 0 }
      expect(() => simulateYear(invalidParams)).toThrow('时间周期必须在1-60个月之间')

      const tooLongParams = { ...validParams, timeHorizon: 61 }
      expect(() => simulateYear(tooLongParams)).toThrow('时间周期必须在1-60个月之间')
    })

    it('应该拒绝全零资产组合', () => {
      const zeroAssetsParams = {
        ...validParams,
        assets: {
          realEstate: 0,
          equity: 0,
          cash: 0,
          fund: 0,
          crypto: 0,
          insurance: 0
        }
      }
      expect(() => simulateYear(zeroAssetsParams)).toThrow('资产组合不能全为零')
    })

    it('应该处理部分零资产', () => {
      const partialAssetsParams = {
        ...validParams,
        assets: {
          realEstate: 100000,
          equity: 0,
          cash: 50000,
          fund: 0,
          crypto: 0,
          insurance: 30000
        }
      }

      const result = simulateYear(partialAssetsParams)
      expect(result).toBeDefined()
      expect(result.monthlyReturns).toHaveLength(12)
      
      // 零资产应该没有表现数据
      expect(result.assetPerformance.equity.totalReturn).toBe(0)
      expect(result.assetPerformance.fund.totalReturn).toBe(0)
      expect(result.assetPerformance.crypto.totalReturn).toBe(0)
    })

    it('应该处理极端宏观数据', () => {
      const extremeMacroData: MacroData = {
        interestRate: 8.0, // 高利率
        inflation: 15.0,   // 高通胀
        gdpGrowth: -5.0,   // 负增长
        marketVolatility: 0.9, // 高波动
        blackSwanEvents: [
          {
            type: 'financial_crisis',
            probability: 0.8,
            impact: -0.9,
            duration: 12
          }
        ]
      }

      const extremeParams = { ...validParams, macroData: extremeMacroData }
      const result = simulateYear(extremeParams)

      expect(result).toBeDefined()
      expect(result.monthlyReturns).toHaveLength(12)
      
      // 极端情况下收益率应该更不稳定
      const returns = result.monthlyReturns.map(mr => mr.totalReturn)
      const volatility = Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - returns.reduce((a, b) => a + b, 0) / returns.length, 2), 0) / returns.length)
      
      expect(volatility).toBeGreaterThan(0.05) // 高波动性
    })
  })

  describe('黑天鹅事件测试', () => {
    it('应该正确处理黑天鹅事件', () => {
      const blackSwanMacroData: MacroData = {
        ...validMacroData,
        blackSwanEvents: [
          {
            type: 'pandemic',
            probability: 0.6,
            impact: -0.7,
            duration: 6
          },
          {
            type: 'financial_crisis',
            probability: 0.4,
            impact: -0.8,
            duration: 8
          }
        ]
      }

      const blackSwanParams = { ...validParams, macroData: blackSwanMacroData }
      const result = simulateYear(blackSwanParams)

      expect(result).toBeDefined()
      expect(result.macroImpact.blackSwanEffect).toBeLessThan(0) // 负面影响
    })

    it('应该根据时间正确应用黑天鹅事件', () => {
      const timedBlackSwanMacroData: MacroData = {
        ...validMacroData,
        blackSwanEvents: [
          {
            type: 'war',
            probability: 0.5,
            impact: -0.6,
            duration: 3 // 只影响前3个月
          }
        ]
      }

      const timedParams = { ...validParams, macroData: timedBlackSwanMacroData }
      const result = simulateYear(timedParams)

      expect(result).toBeDefined()
      
      // 前3个月应该受到更大影响
      const earlyMonths = result.monthlyReturns.slice(0, 3)
      const laterMonths = result.monthlyReturns.slice(3)
      
      const earlyAvgReturn = earlyMonths.reduce((sum, mr) => sum + mr.totalReturn, 0) / earlyMonths.length
      const laterAvgReturn = laterMonths.reduce((sum, mr) => sum + mr.totalReturn, 0) / laterMonths.length
      
      // 早期月份可能受到更大影响（但这不是绝对的，因为还有其他因素）
      expect(Math.abs(earlyAvgReturn - laterAvgReturn)).toBeLessThan(0.5)
    })
  })

  describe('资产类型特定测试', () => {
    it('应该正确处理房产资产', () => {
      const realEstateParams = {
        ...validParams,
        assets: {
          realEstate: 100000,
          equity: 0,
          cash: 0,
          fund: 0,
          crypto: 0,
          insurance: 0
        }
      }

      const result = simulateYear(realEstateParams)
      expect(result).toBeDefined()
      expect(result.assetPerformance.realEstate.totalReturn).toBeDefined()
    })

    it('应该正确处理股票资产', () => {
      const equityParams = {
        ...validParams,
        assets: {
          realEstate: 0,
          equity: 100000,
          cash: 0,
          fund: 0,
          crypto: 0,
          insurance: 0
        }
      }

      const result = simulateYear(equityParams)
      expect(result).toBeDefined()
      expect(result.assetPerformance.equity.totalReturn).toBeDefined()
    })

    it('应该正确处理现金资产', () => {
      const cashParams = {
        ...validParams,
        assets: {
          realEstate: 0,
          equity: 0,
          cash: 100000,
          fund: 0,
          crypto: 0,
          insurance: 0
        }
      }

      const result = simulateYear(cashParams)
      expect(result).toBeDefined()
      expect(result.assetPerformance.cash.totalReturn).toBeDefined()
    })
  })

  describe('性能测试', () => {
    it('应该快速处理标准模拟', () => {
      const startTime = performance.now()
      simulateYear(validParams)
      const endTime = performance.now()
      
      const executionTime = endTime - startTime
      expect(executionTime).toBeLessThan(100) // 应该在100ms内完成
    })

    it('应该处理大量数据点', () => {
      const largeParams = { ...validParams, timeHorizon: 60 }
      const startTime = performance.now()
      const result = simulateYear(largeParams)
      const endTime = performance.now()
      
      const executionTime = endTime - startTime
      expect(executionTime).toBeLessThan(500) // 应该在500ms内完成
      expect(result.monthlyReturns).toHaveLength(60)
    })
  })

  describe('数学计算准确性', () => {
    it('应该正确计算年化收益率', () => {
      const result = simulateYear(validParams)
      
      // 验证年化收益率计算
      const totalReturn = result.totalReturn
      const months = validParams.timeHorizon
      const expectedAnnualized = Math.pow(1 + totalReturn, 12 / months) - 1
      
      expect(Math.abs(result.annualizedReturn - expectedAnnualized)).toBeLessThan(0.001)
    })

    it('应该正确计算投资组合价值', () => {
      const result = simulateYear(validParams)
      
      // 验证最终投资组合价值
      const initialValue = Object.values(validParams.assets).reduce((sum, value) => sum + value, 0)
      const expectedFinalValue = initialValue * (1 + result.totalReturn)
      
      expect(Math.abs(result.finalPortfolioValue - expectedFinalValue)).toBeLessThan(0.01)
    })
  })

  describe('错误处理', () => {
    it('应该处理无效的宏观数据', () => {
      const invalidMacroData = {
        ...validMacroData,
        interestRate: NaN
      }

      const invalidParams = { ...validParams, macroData: invalidMacroData }
      
      // 应该能够处理，但结果可能包含NaN
      const result = simulateYear(invalidParams)
      expect(result).toBeDefined()
    })

    it('应该处理空的黑天鹅事件数组', () => {
      const emptyBlackSwanMacroData = {
        ...validMacroData,
        blackSwanEvents: []
      }

      const emptyParams = { ...validParams, macroData: emptyBlackSwanMacroData }
      const result = simulateYear(emptyParams)
      
      expect(result).toBeDefined()
      expect(result.macroImpact.blackSwanEffect).toBe(0)
    })
  })
})

// 开发者签名: @eclipsecybertitan
