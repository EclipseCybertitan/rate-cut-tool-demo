interface AssetInput {
  realEstate: number
  equity: number
  cash: number
}

interface RateCalculatorProps {
  assetInput: AssetInput
}

export default function RateCalculator({ assetInput }: RateCalculatorProps) {
  const calculateScenario = (rateChange: -25 | -50) => {
    const { realEstate, equity, cash } = assetInput
    
    // 启发式计算参数
    const realEstateElasticity = 0.15
    const equityElasticity = 0.25
    const cashOpportunityCost = 0.08
    
    // 计算变化
    const mortgageCostChange = rateChange === -25 ? -0.15 : -0.30
    const equityRiskChange = rateChange === -25 ? -0.10 : -0.20
    const cashYieldChange = rateChange === -25 ? -0.25 : -0.50
    
    const realEstateChange = mortgageCostChange * realEstateElasticity
    const equityChange = equityRiskChange * equityElasticity
    const cashChange = cashYieldChange * cashOpportunityCost
    
    return {
      realEstate: realEstateChange,
      equity: equityChange,
      cash: cashChange,
      total: realEstate * (1 + realEstateChange) + equity * (1 + equityChange) + cash * (1 + cashChange)
    }
  }

  const scenario25 = calculateScenario(-25)
  const scenario50 = calculateScenario(-50)
  const currentTotal = assetInput.realEstate + assetInput.equity + assetInput.cash

  if (currentTotal === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">降息情景计算</h2>
        <div className="text-center py-12 text-gray-500">
          <p>请输入资产估值以查看计算结果</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">降息情景计算</h2>
      
      <div className="space-y-6">
        {/* 25基点降息情景 */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">25基点降息情景</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">房产变化:</span>
              <span className={`font-semibold ${scenario25.realEstate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scenario25.realEstate >= 0 ? '+' : ''}
                {(scenario25.realEstate * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">股票变化:</span>
              <span className={`font-semibold ${scenario25.equity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scenario25.equity >= 0 ? '+' : ''}
                {(scenario25.equity * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">现金变化:</span>
              <span className={`font-semibold ${scenario25.cash >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scenario25.cash >= 0 ? '+' : ''}
                {(scenario25.cash * 100).toFixed(2)}%
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">预期净值:</span>
                <span className={`font-bold text-lg ${scenario25.total >= currentTotal ? 'text-green-600' : 'text-red-600'}`}>
                  ${scenario25.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 50基点降息情景 */}
        <div className="border border-gray-200 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">50基点降息情景</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">房产变化:</span>
              <span className={`font-semibold ${scenario50.realEstate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scenario50.realEstate >= 0 ? '+' : ''}
                {(scenario50.realEstate * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">股票变化:</span>
              <span className={`font-semibold ${scenario50.equity >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scenario50.equity >= 0 ? '+' : ''}
                {(scenario50.equity * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">现金变化:</span>
              <span className={`font-semibold ${scenario50.cash >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {scenario50.cash >= 0 ? '+' : ''}
                {(scenario50.cash * 100).toFixed(2)}%
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-600 font-semibold">预期净值:</span>
                <span className={`font-semibold text-lg ${scenario50.total >= currentTotal ? 'text-green-600' : 'text-red-600'}`}>
                  ${scenario50.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 免责声明 */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            ⚠️ 免责声明：此计算结果基于历史数据和启发式模型，
            不构成投资建议。实际结果可能因市场条件而异。
          </p>
        </div>
      </div>
    </div>
  )
}
