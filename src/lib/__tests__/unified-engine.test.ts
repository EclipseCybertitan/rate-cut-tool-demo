/**
 * 统一资产配置模拟引擎测试用例
 * 确保覆盖率≥80%，测试UnifiedAssetEngine类和各种边界条件
 * @author @eclipsecybertitan
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { unifiedAssetEngine } from '../engine/unified-engine'
import type { SimulationParams, MacroData, AssetPortfolio } from '../engine/unified-engine'

describe('统一资产配置模拟引擎 (UnifiedAssetEngine)', () => {
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
      timeHorizon: 12,
      riskTolerance: 'medium',
      investmentPhilosophy: 'balanced'
    }
  })

  describe('simulateYear 方法', () => {
    it('应该成功模拟12个月的资产配置', () => {
      const result = unifiedAssetEngine.simulateYear(validParams)

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

      const shortResult = unifiedAssetEngine.simulateYear(shortParams)
      const longResult = unifiedAssetEngine.simulateYear(longParams)

      expect(shortResult.monthlyReturns).toHaveLength(6)
      expect(longResult.monthlyReturns).toHaveLength(24)
    })

    it('应该计算正确的资产表现', () => {
      const result = unifiedAssetEngine.simulateYear(validParams)

      // 验证每种资产都有表现数据
      Object.keys(validParams.assets).forEach(assetType => {
        const assetKey = assetType as keyof AssetPortfolio
        if (validParams.assets[assetKey] > 0) {
          expect(result.assetPerformance[assetKey]).toBeDefined()
          expect(result.assetPerformance[assetKey].totalReturn).toBeDefined()
          expect(result.assetPerformance[assetKey].annualizedReturn).toBeDefined()
          expect(result.assetPerformance[assetKey].volatility).toBeGreaterThanOrEqual(0)
          expect(result.assetPerformance[assetKey].maxDrawdown).toBeLessThanOrEqual(0)
          expect(result.assetPerformance[assetKey].contribution).toBeDefined()
        }
      })
    })

    it('应该计算正确的风险指标', () => {
      const result = unifiedAssetEngine.simulateYear(validParams)

      expect(result.riskMetrics.volatility).toBeGreaterThanOrEqual(0)
      expect(result.riskMetrics.maxDrawdown).toBeLessThanOrEqual(0)
      expect(result.riskMetrics.maxDrawdown).toBeLessThanOrEqual(1)
      expect(result.riskMetrics.var95).toBeDefined()
      expect(result.riskMetrics.beta).toBe(1.0) // 默认值
      expect(result.riskMetrics.correlation).toBeDefined()
    })

    it('应该计算正确的宏观影响', () => {
      const result = unifiedAssetEngine.simulateYear(validParams)

      expect(result.macroImpact.interestRateEffect).toBeDefined()
      expect(result.macroImpact.inflationEffect).toBeDefined()
      expect(result.macroImpact.blackSwanEffect).toBeDefined()
      expect(result.macroImpact.marketVolatilityEffect).toBeDefined()
      expect(result.macroImpact.gdpEffect).toBeDefined()
    })
  })

  describe('边界条件测试', () => {
    it('应该拒绝无效的时间周期', () => {
      const invalidParams1 = { ...validParams, timeHorizon: 0 }
      const invalidParams2 = { ...validParams, timeHorizon: 61 }

      expect(() => unifiedAssetEngine.simulateYear(invalidParams1)).toThrow('时间周期必须在1-60个月之间')
      expect(() => unifiedAssetEngine.simulateYear(invalidParams2)).toThrow('时间周期必须在1-60个月之间')
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

      expect(() => unifiedAssetEngine.simulateYear(zeroAssetsParams)).toThrow('资产组合不能全为零')
    })

    it('应该处理部分资产为零的情况', () => {
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

      const result = unifiedAssetEngine.simulateYear(partialAssetsParams)
      expect(result).toBeDefined()
      expect(result.monthlyReturns).toHaveLength(12)
    })
  })

  describe('风险偏好和投资哲学测试', () => {
    it('应该根据风险偏好调整收益率', () => {
      const lowRiskParams = { ...validParams, riskTolerance: 'low' as const }
      const highRiskParams = { ...validParams, riskTolerance: 'high' as const }

      const lowRiskResult = unifiedAssetEngine.simulateYear(lowRiskParams)
      const highRiskResult = unifiedAssetEngine.simulateYear(highRiskParams)

      // 高风险应该产生更高的波动性
      expect(highRiskResult.riskMetrics.volatility).toBeGreaterThanOrEqual(lowRiskResult.riskMetrics.volatility)
    })

    it('应该根据投资哲学调整收益率', () => {
      const conservativeParams = { ...validParams, investmentPhilosophy: 'conservative' as const }
      const aggressiveParams = { ...validParams, investmentPhilosophy: 'aggressive' as const }

      const conservativeResult = unifiedAssetEngine.simulateYear(conservativeParams)
      const aggressiveResult = unifiedAssetEngine.simulateYear(aggressiveParams)

      // 激进策略应该产生更高的波动性
      expect(aggressiveResult.riskMetrics.volatility).toBeGreaterThanOrEqual(conservativeResult.riskMetrics.volatility)
    })
  })

  describe('宏观环境影响测试', () => {
    it('应该正确计算利率变化的影响', () => {
      const lowRateParams = {
        ...validParams,
        macroData: { ...validMacroData, interestRate: 2.0 }
      }
      const highRateParams = {
        ...validParams,
        macroData: { ...validMacroData, interestRate: 5.0 }
      }

      const lowRateResult = unifiedAssetEngine.simulateYear(lowRateParams)
      const highRateResult = unifiedAssetEngine.simulateYear(highRateParams)

      expect(lowRateResult.macroImpact.interestRateEffect).not.toBe(highRateResult.macroImpact.interestRateEffect)
    })

    it('应该正确计算通胀变化的影响', () => {
      const lowInflationParams = {
        ...validParams,
        macroData: { ...validMacroData, inflation: 1.0 }
      }
      const highInflationParams = {
        ...validParams,
        macroData: { ...validMacroData, inflation: 4.0 }
      }

      const lowInflationResult = unifiedAssetEngine.simulateYear(lowInflationParams)
      const highInflationResult = unifiedAssetEngine.simulateYear(highInflationParams)

      expect(lowInflationResult.macroImpact.inflationEffect).not.toBe(highInflationResult.macroImpact.inflationEffect)
    })

    it('应该处理黑天鹅事件', () => {
      const blackSwanParams = {
        ...validParams,
        macroData: {
          ...validMacroData,
          blackSwanEvents: [
            {
              type: 'financial_crisis' as const,
              probability: 0.1,
              impact: -0.3,
              duration: 6
            }
          ]
        }
      }

      const result = unifiedAssetEngine.simulateYear(blackSwanParams)
      expect(result.macroImpact.blackSwanEffect).toBeDefined()
      expect(result.macroImpact.blackSwanEffect).toBeLessThan(0)
    })
  })

  describe('资产类型特定测试', () => {
    it('应该正确处理股票资产', () => {
      const equityOnlyParams = {
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

      const result = unifiedAssetEngine.simulateYear(equityOnlyParams)
      expect(result.assetPerformance.equity).toBeDefined()
      expect(result.assetPerformance.equity.totalReturn).toBeDefined()
    })

    it('应该正确处理现金资产', () => {
      const cashOnlyParams = {
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

      const result = unifiedAssetEngine.simulateYear(cashOnlyParams)
      expect(result.assetPerformance.cash).toBeDefined()
      expect(result.assetPerformance.cash.totalReturn).toBeDefined()
    })
  })

  describe('性能测试', () => {
    it('应该在合理时间内完成模拟', () => {
      const startTime = performance.now()
      unifiedAssetEngine.simulateYear(validParams)
      const endTime = performance.now()
      const executionTime = endTime - startTime

      // 模拟应该在100ms内完成
      expect(executionTime).toBeLessThan(100)
    })

    it('应该能够处理较长的模拟周期', () => {
      const longParams = { ...validParams, timeHorizon: 60 }
      
      const startTime = performance.now()
      const result = unifiedAssetEngine.simulateYear(longParams)
      const endTime = performance.now()
      const executionTime = endTime - startTime

      expect(result.monthlyReturns).toHaveLength(60)
      expect(executionTime).toBeLessThan(500) // 60个月模拟应该在500ms内完成
    })
  })
})
