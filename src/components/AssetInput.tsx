import { useState } from 'react'
import { 
  HomeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  CalculatorIcon,
  BuildingLibraryIcon,
  CurrencyDollarIcon as CryptoIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline'

interface AssetInputProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
    fund?: number
    crypto?: number
    insurance?: number
  }
  onAssetChange: (assets: any) => void
}

export default function AssetInput({ assetInput, onAssetChange }: AssetInputProps) {
  const [localInput, setLocalInput] = useState({
    realEstate: assetInput.realEstate || 0,
    equity: assetInput.equity || 0,
    cash: assetInput.cash || 0,
    fund: assetInput.fund || 0,
    crypto: assetInput.crypto || 0,
    insurance: assetInput.insurance || 0
  })

  const handleInputChange = (field: keyof typeof localInput, value: string) => {
    const numValue = parseFloat(value) || 0
    const newInput = { ...localInput, [field]: numValue }
    setLocalInput(newInput)
    onAssetChange(newInput)
  }

  const totalAssets = Object.values(localInput).reduce((sum, value) => sum + value, 0)

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <CalculatorIcon className="w-6 h-6 mr-3 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">资产配置输入</h2>
        <div className="ml-auto">
          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
            支持6类资产配置
          </span>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* 左侧：基础资产 */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-4">🏠 基础资产</h3>
          
          {/* 房产估值 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <HomeIcon className="w-5 h-5 mr-2 text-green-400" />
              房产估值 (USD)
            </label>
            <input
              type="number"
              value={localInput.realEstate || ''}
              onChange={(e) => handleInputChange('realEstate', e.target.value)}
              placeholder="输入房产总价值"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* 股票估值 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <ChartBarIcon className="w-5 h-5 mr-2 text-blue-400" />
              股票估值 (USD)
            </label>
            <input
              type="number"
              value={localInput.equity || ''}
              onChange={(e) => handleInputChange('equity', e.target.value)}
              placeholder="输入股票投资组合价值"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* 现金估值 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2 text-yellow-400" />
              现金估值 (USD)
            </label>
            <input
              type="number"
              value={localInput.cash || ''}
              onChange={(e) => handleInputChange('cash', e.target.value)}
              placeholder="输入现金及现金等价物价值"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {/* 右侧：扩展资产 */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-purple-300 mb-4">🚀 扩展资产</h3>
          
          {/* 基金产品 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <BuildingLibraryIcon className="w-5 h-5 mr-2 text-purple-400" />
              基金产品 (USD)
            </label>
            <input
              type="number"
              value={localInput.fund || ''}
              onChange={(e) => handleInputChange('fund', e.target.value)}
              placeholder="输入基金投资价值"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* 虚拟货币 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <CryptoIcon className="w-5 h-5 mr-2 text-orange-400" />
              虚拟货币 (USD)
            </label>
            <input
              type="number"
              value={localInput.crypto || ''}
              onChange={(e) => handleInputChange('crypto', e.target.value)}
              placeholder="输入BTC/ETH等价值"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* 保险产品 */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex items-center">
              <ShieldCheckIcon className="w-5 h-5 mr-2 text-red-400" />
              保险产品 (USD)
            </label>
            <input
              type="number"
              value={localInput.insurance || ''}
              onChange={(e) => handleInputChange('insurance', e.target.value)}
              placeholder="输入保险产品价值"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* 资产总计 */}
      {totalAssets > 0 && (
        <div className="mt-8 bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-300 font-semibold text-xl">资产总计:</span>
            <span className="font-bold text-3xl text-white">
              ${totalAssets.toLocaleString('en-US')}
            </span>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">基础资产</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">房产:</span>
                  <span className="text-green-400 font-medium">
                    {((localInput.realEstate / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">股票:</span>
                  <span className="text-blue-400 font-medium">
                    {((localInput.equity / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">现金:</span>
                  <span className="text-yellow-400 font-medium">
                    {((localInput.cash / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">扩展资产</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">基金:</span>
                  <span className="text-purple-400 font-medium">
                    {((localInput.fund / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">虚拟货币:</span>
                  <span className="text-orange-400 font-medium">
                    {((localInput.crypto / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">保险:</span>
                  <span className="text-red-400 font-medium">
                    {((localInput.insurance / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">风险分布</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">保守:</span>
                  <span className="text-green-400 font-medium">
                    {(((localInput.cash + localInput.insurance) / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">平衡:</span>
                  <span className="text-blue-400 font-medium">
                    {(((localInput.realEstate + localInput.fund) / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">激进:</span>
                  <span className="text-orange-400 font-medium">
                    {(((localInput.equity + localInput.crypto) / totalAssets) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 输入提示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-xl border border-blue-600/30">
        <p className="text-sm text-blue-200 text-center">
          💡 请输入您的真实资产配置，系统将基于历史回测数据为您提供专业的降息情景分析。
          扩展资产类别支持更精准的投资组合分析。
        </p>
      </div>
    </div>
  )
}
