import { useState } from 'react'
import { 
  HomeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  CalculatorIcon
} from '@heroicons/react/24/outline'

interface AssetInputProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
  }
  onAssetChange: (assets: { realEstate: number; equity: number; cash: number }) => void
}

export default function AssetInput({ assetInput, onAssetChange }: AssetInputProps) {
  const [localInput, setLocalInput] = useState(assetInput)

  const handleInputChange = (field: keyof typeof assetInput, value: string) => {
    const numValue = parseFloat(value) || 0
    const newInput = { ...localInput, [field]: numValue }
    setLocalInput(newInput)
    onAssetChange(newInput)
  }

  const totalAssets = localInput.realEstate + localInput.equity + localInput.cash

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
      <div className="flex items-center mb-6">
        <CalculatorIcon className="w-6 h-6 mr-3 text-blue-400" />
        <h2 className="text-2xl font-bold text-white">资产配置输入</h2>
      </div>
      
      <div className="space-y-6">
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

        {/* 资产总计 */}
        {totalAssets > 0 && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-xl border border-gray-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-semibold text-lg">资产总计:</span>
              <span className="font-bold text-2xl text-white">
                ${totalAssets.toLocaleString('en-US')}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">房产占比:</span>
                <span className="text-green-400 font-medium">
                  {((localInput.realEstate / totalAssets) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">股票占比:</span>
                <span className="text-blue-400 font-medium">
                  {((localInput.equity / totalAssets) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">现金占比:</span>
                <span className="text-yellow-400 font-medium">
                  {((localInput.cash / totalAssets) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 输入提示 */}
        <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-4 rounded-xl border border-blue-600/30">
          <p className="text-sm text-blue-200 text-center">
            💡 请输入您的真实资产配置，系统将基于历史回测数据为您提供专业的降息情景分析
          </p>
        </div>
      </div>
    </div>
  )
}
