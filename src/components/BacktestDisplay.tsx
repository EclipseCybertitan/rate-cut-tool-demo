import { useState } from 'react'
import { 
  ChartBarIcon, 
  InformationCircleIcon,
  DocumentTextIcon,
  CalendarIcon,
  LockClosedIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { BACKTEST_DATA, getFreeBacktestData } from '../lib/backtest-data'

interface BacktestDisplayProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
  }
  isUnlocked?: boolean
}

export default function BacktestDisplay({ assetInput, isUnlocked = false }: BacktestDisplayProps) {
  const [selectedAsset, setSelectedAsset] = useState<string>('all')
  const [showDetails, setShowDetails] = useState(false)
  const [showPremium, setShowPremium] = useState(false)

  const portfolio25bp = calculatePortfolioMetrics(assetInput, '25基点降息')
  const portfolio50bp = calculatePortfolioMetrics(assetInput, '50基点降息')

  // 根据解锁状态显示数据
  const displayData = isUnlocked ? BACKTEST_DATA : getFreeBacktestData()

  const filteredData = selectedAsset === 'all' 
    ? displayData 
    : displayData.filter(data => data.assetType === selectedAsset)

  // 计算投资组合指标的函数
  function calculatePortfolioMetrics(assetAllocation: any, scenario: string) {
    const realEstateData = BACKTEST_DATA.find(d => d.assetType === '美国房价' && d.scenario === scenario)
    const equityData = BACKTEST_DATA.find(d => d.assetType === '美国股票' && d.scenario === scenario)
    const bondData = BACKTEST_DATA.find(d => d.assetType === '美国债券' && d.scenario === scenario)
    
    if (!realEstateData || !equityData || !bondData) return null
    
    const totalAssets = assetAllocation.realEstate + assetAllocation.equity + assetAllocation.cash
    if (totalAssets === 0) return null
    
    const weightedReturn = (
      (assetAllocation.realEstate / totalAssets) * realEstateData.historicalReturn +
      (assetAllocation.equity / totalAssets) * equityData.historicalReturn +
      (assetAllocation.cash / totalAssets) * bondData.historicalReturn
    )
    
    const weightedVolatility = (
      (assetAllocation.realEstate / totalAssets) * realEstateData.volatility +
      (assetAllocation.equity / totalAssets) * equityData.volatility +
      (assetAllocation.cash / totalAssets) * bondData.volatility
    )
    
    return {
      expectedReturn: weightedReturn,
      expectedVolatility: weightedVolatility,
      sharpeRatio: weightedReturn / weightedVolatility,
      scenario: scenario
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-3 text-blue-400" />
          美国资产利率回测分析
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            {showDetails ? '隐藏详情' : '显示详情'}
          </button>
          {!isUnlocked && (
            <button
              onClick={() => setShowPremium(!showPremium)}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors flex items-center"
            >
              <LockClosedIcon className="w-4 h-4 mr-1" />
              付费内容
            </button>
          )}
        </div>
      </div>

      {/* 数据来源说明 */}
      <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 rounded-xl mb-6 border border-blue-600/30">
        <div className="flex items-start">
          <InformationCircleIcon className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-200">
            <p className="font-semibold mb-1">📊 回测数据说明</p>
            <p>基于2001-2003、2007-2009、2020年美联储降息周期的历史数据，截止2025年6月30日。</p>
            <p className="mt-1">数据来源：Case-Shiller房价指数、S&P 500指数、Bloomberg债券指数、联邦基金利率</p>
          </div>
        </div>
      </div>

      {/* 资产类型选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          选择资产类型查看回测数据：
        </label>
        <div className="flex flex-wrap gap-2">
          {['all', '美国房价', '美国股票', '美国债券'].map((asset) => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedAsset === asset
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {asset === 'all' ? '全部资产' : asset}
            </button>
          ))}
        </div>
      </div>

      {/* 回测数据表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                资产类型
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                降息情景
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                历史回报
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                波动率
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                夏普比率
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                最大回撤
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            {filteredData.map((data, index) => (
              <tr key={index} className="hover:bg-gray-800 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {data.assetType}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                  {data.scenario}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${
                    data.historicalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {data.historicalReturn > 0 ? '+' : ''}{data.historicalReturn}%
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">
                  {data.volatility}%
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className={`font-semibold ${
                    data.sharpeRatio >= 1 ? 'text-green-400' : 
                    data.sharpeRatio >= 0.5 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {data.sharpeRatio.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span className="font-semibold text-red-400">
                    {data.maxDrawdown}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 付费内容预览 */}
      {!isUnlocked && showPremium && (
        <div className="mt-6 p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl border border-yellow-600/30">
          <div className="flex items-center text-yellow-400 mb-4">
            <LockClosedIcon className="w-6 h-6 mr-2" />
            <h3 className="text-lg font-semibold">🔒 付费解锁高级资产分析</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300">💳 信用卡账单分析</h4>
              <p className="text-sm text-gray-300">降息对信用卡利率和还款压力的影响分析</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300">🛡️ 保险产品分析</h4>
              <p className="text-sm text-gray-300">保险资金投资收益和保费定价策略变化</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300">📊 基金产品分析</h4>
              <p className="text-sm text-gray-300">各类基金在降息环境下的表现差异</p>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300">₿ 虚拟货币分析</h4>
              <p className="text-sm text-gray-300">BTC/ETH在降息周期中的历史表现</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
            <p className="text-sm text-yellow-200 text-center">
              💎 解锁所有高级功能，获得完整的降息周期资产配置分析报告
            </p>
          </div>
        </div>
      )}

      {/* 详细说明 */}
      {showDetails && (
        <div className="mt-6 space-y-4">
          {filteredData.map((data, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-white mb-2">
                {data.assetType} - {data.scenario}
              </h4>
              <p className="text-gray-300 text-sm mb-2">{data.description}</p>
              <div className="flex items-center text-xs text-gray-400">
                <DocumentTextIcon className="w-4 h-4 mr-1" />
                <span className="mr-4">数据源: {data.dataSource}</span>
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span>更新: {data.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 投资组合回测结果 */}
      {portfolio25bp && portfolio50bp && (
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <SparklesIcon className="w-5 h-5 mr-2 text-blue-400" />
            🎯 基于您当前资产配置的投资组合回测预期
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h4 className="font-medium text-white mb-3">25基点降息情景</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">预期年化回报:</span>
                  <span className="font-semibold text-green-400">
                    +{portfolio25bp.expectedReturn.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">预期波动率:</span>
                  <span className="font-semibold text-gray-300">
                    {portfolio25bp.expectedVolatility.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">夏普比率:</span>
                  <span className="font-semibold text-blue-400">
                    {portfolio25bp.sharpeRatio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600">
              <h4 className="font-medium text-white mb-3">50基点降息情景</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">预期年化回报:</span>
                  <span className="font-semibold text-green-400">
                    +{portfolio50bp.expectedReturn.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">预期波动率:</span>
                  <span className="font-semibold text-gray-300">
                    {portfolio50bp.expectedVolatility.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">夏普比率:</span>
                  <span className="font-semibold text-blue-400">
                    {portfolio50bp.sharpeRatio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
            <p className="text-sm text-yellow-200 text-center">
              ⚠️ 免责声明：以上回测数据基于历史表现，不构成投资建议。投资有风险，决策需谨慎。
              实际收益可能因市场环境变化而显著不同。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
