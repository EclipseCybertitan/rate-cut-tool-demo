import { useState } from 'react'
import { 
  ChartBarIcon, 
  InformationCircleIcon,
  DocumentTextIcon,
  CalendarIcon
} from '@heroicons/react/24/outline'
import { BACKTEST_DATA, calculatePortfolioMetrics } from '../lib/backtest-data'

interface BacktestDisplayProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
  }
}

export default function BacktestDisplay({ assetInput }: BacktestDisplayProps) {
  const [selectedAsset, setSelectedAsset] = useState<string>('all')
  const [showDetails, setShowDetails] = useState(false)

  const portfolio25bp = calculatePortfolioMetrics(assetInput, '25基点降息')
  const portfolio50bp = calculatePortfolioMetrics(assetInput, '50基点降息')

  const filteredData = selectedAsset === 'all' 
    ? BACKTEST_DATA 
    : BACKTEST_DATA.filter(data => data.assetType === selectedAsset)

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <ChartBarIcon className="w-6 h-6 mr-2 text-blue-600" />
          美国资产利率回测分析
        </h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showDetails ? '隐藏详情' : '显示详情'}
        </button>
      </div>

      {/* 数据来源说明 */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
        <div className="flex items-start">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">📊 回测数据说明</p>
            <p>基于2001-2003、2007-2009、2020年美联储降息周期的历史数据，截止2025年6月30日。</p>
            <p className="mt-1">数据来源：Case-Shiller房价指数、S&P 500指数、Bloomberg债券指数、联邦基金利率</p>
          </div>
        </div>
      </div>

      {/* 资产类型选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          选择资产类型查看回测数据：
        </label>
        <div className="flex flex-wrap gap-2">
          {['all', '美国房价', '美国股票', '美国债券'].map((asset) => (
            <button
              key={asset}
              onClick={() => setSelectedAsset(asset)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedAsset === asset
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {asset === 'all' ? '全部资产' : asset}
            </button>
          ))}
        </div>
      </div>

      {/* 回测数据表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                资产类型
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                降息情景
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                历史回报
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                波动率
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                夏普比率
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                最大回撤
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((data, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {data.assetType}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {data.scenario}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`font-semibold ${
                    data.historicalReturn >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {data.historicalReturn > 0 ? '+' : ''}{data.historicalReturn}%
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {data.volatility}%
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`font-semibold ${
                    data.sharpeRatio >= 1 ? 'text-green-600' : 
                    data.sharpeRatio >= 0.5 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {data.sharpeRatio.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="font-semibold text-red-600">
                    {data.maxDrawdown}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 详细说明 */}
      {showDetails && (
        <div className="mt-6 space-y-4">
          {filteredData.map((data, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {data.assetType} - {data.scenario}
              </h4>
              <p className="text-gray-700 text-sm mb-2">{data.description}</p>
              <div className="flex items-center text-xs text-gray-500">
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
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎯 基于您当前资产配置的投资组合回测预期
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 mb-3">25基点降息情景</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">预期年化回报:</span>
                  <span className="font-semibold text-green-600">
                    +{portfolio25bp.expectedReturn.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">预期波动率:</span>
                  <span className="font-semibold text-gray-900">
                    {portfolio25bp.expectedVolatility.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">夏普比率:</span>
                  <span className="font-semibold text-blue-600">
                    {portfolio25bp.sharpeRatio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium text-gray-900 mb-3">50基点降息情景</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">预期年化回报:</span>
                  <span className="font-semibold text-green-600">
                    +{portfolio50bp.expectedReturn.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">预期波动率:</span>
                  <span className="font-semibold text-gray-900">
                    {portfolio50bp.expectedVolatility.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">夏普比率:</span>
                  <span className="font-semibold text-blue-600">
                    {portfolio50bp.sharpeRatio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ 免责声明：以上回测数据基于历史表现，不构成投资建议。投资有风险，决策需谨慎。
              实际收益可能因市场环境变化而显著不同。
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
