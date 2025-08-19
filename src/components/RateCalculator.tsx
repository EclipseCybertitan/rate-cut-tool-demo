import { useState } from 'react'
import { 
  CalculatorIcon, 
  ChartBarIcon,
  LockClosedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

interface RateCalculatorProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
  }
}

export default function RateCalculator({ assetInput }: RateCalculatorProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('25bp')
  
  // 降息档位选项
  const rateScenarios = [
    { value: '25bp', label: '25基点降息', color: 'from-blue-500 to-cyan-500' },
    { value: '50bp', label: '50基点降息', color: 'from-purple-500 to-pink-500' },
    { value: '75bp', label: '75基点降息', color: 'from-orange-500 to-red-500' },
    { value: '100bp', label: '100基点降息', color: 'from-red-500 to-pink-500' }
  ]

  // 计算不同档位的资产变化
  const calculateScenario = (scenario: string) => {
    const baseRate = parseFloat(scenario.replace('bp', ''))
    const currentTotal = assetInput.realEstate + assetInput.equity + assetInput.cash
    
    if (currentTotal === 0) return null

    // 基于回测数据的启发式计算
    const realEstateChange = (assetInput.realEstate * baseRate * 0.15) / 100
    const equityChange = (assetInput.equity * baseRate * 0.25) / 100
    const cashChange = -(assetInput.cash * baseRate * 0.08) / 100 // 现金收益率下降
    
    return {
      realEstate: realEstateChange,
      equity: equityChange,
      cash: cashChange,
      total: realEstateChange + equityChange + cashChange,
      scenario: scenario
    }
  }

  const currentScenario = calculateScenario(selectedScenario)
  const currentTotal = assetInput.realEstate + assetInput.equity + assetInput.cash

  if (currentTotal === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center py-12 text-gray-400">
          <CalculatorIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <p className="text-lg">请输入资产估值以查看计算结果</p>
          <p className="text-sm text-gray-500 mt-2">支持25-100基点降息情景分析</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <CalculatorIcon className="w-6 h-6 mr-3 text-blue-400" />
          降息情景计算器
        </h2>
        <div className="flex items-center space-x-2">
          <SparklesIcon className="w-5 h-5 text-yellow-400" />
          <span className="text-sm text-gray-300">多档位分析</span>
        </div>
      </div>

      {/* 降息情景选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          选择降息情景：
        </label>
        <div className="grid grid-cols-2 gap-3">
          {rateScenarios.map((scenario) => (
            <button
              key={scenario.value}
              onClick={() => setSelectedScenario(scenario.value)}
              className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedScenario === scenario.value
                  ? `bg-gradient-to-r ${scenario.color} text-white shadow-lg transform scale-105`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      {/* 当前情景计算结果 */}
      {currentScenario && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2 text-blue-400" />
              {selectedScenario.replace('bp', '基点')}降息情景
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">房产变化:</span>
                <span className={`font-semibold text-lg ${
                  currentScenario.realEstate >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {currentScenario.realEstate >= 0 ? '+' : ''}
                  ${currentScenario.realEstate.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">股票变化:</span>
                <span className={`font-semibold text-lg ${
                  currentScenario.equity >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {currentScenario.equity >= 0 ? '+' : ''}
                  ${currentScenario.equity.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <span className="text-gray-300">现金变化:</span>
                <span className={`font-semibold text-lg ${
                  currentScenario.cash >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {currentScenario.cash >= 0 ? '+' : ''}
                  ${currentScenario.cash.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-semibold text-lg">预期净值变化:</span>
                  <span className={`font-bold text-xl ${
                    currentScenario.total >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {currentScenario.total >= 0 ? '+' : ''}
                    ${currentScenario.total.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="text-right text-sm text-gray-400 mt-1">
                  变化率: {((currentScenario.total / currentTotal) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 高级功能提示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl border border-yellow-600/30">
        <div className="flex items-center text-yellow-400 mb-2">
          <LockClosedIcon className="w-5 h-5 mr-2" />
          <span className="font-semibold">解锁高级分析</span>
        </div>
        <p className="text-sm text-gray-300">
          付费解锁更多资产类别：信用卡账单、保险产品、基金产品、虚拟货币(BTC/ETH)等
        </p>
      </div>

      {/* 计算说明 */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
        <p className="text-xs text-gray-400 text-center">
          💡 计算基于历史回测数据和启发式模型，不构成投资建议。实际收益可能因市场环境变化而显著不同。
        </p>
      </div>
    </div>
  )
}
