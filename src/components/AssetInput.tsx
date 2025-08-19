interface AssetInputProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
  }
  onAssetChange: (assets: { realEstate: number; equity: number; cash: number }) => void
}

export default function AssetInput({ assetInput, onAssetChange }: AssetInputProps) {
  const handleChange = (field: keyof typeof assetInput, value: string) => {
    const numValue = parseFloat(value) || 0
    onAssetChange({
      ...assetInput,
      [field]: numValue
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">输入您的资产估值</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            房产估值 (USD)
          </label>
          <input
            type="number"
            value={assetInput.realEstate || ''}
            onChange={(e) => handleChange('realEstate', e.target.value)}
            placeholder="例如：500000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            股票估值 (USD)
          </label>
          <input
            type="number"
            value={assetInput.equity || ''}
            onChange={(e) => handleChange('equity', e.target.value)}
            placeholder="例如：300000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            现金估值 (USD)
          </label>
          <input
            type="number"
            value={assetInput.cash || ''}
            onChange={(e) => handleChange('cash', e.target.value)}
            placeholder="例如：200000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          当前总净值: <span className="font-bold">${(assetInput.realEstate + assetInput.equity + assetInput.cash).toLocaleString()}</span>
        </p>
      </div>
    </div>
  )
}
