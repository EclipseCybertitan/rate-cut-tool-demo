import { useState } from 'react'
import './App.css'
import RateCalculator from './components/RateCalculator'
import AssetInput from './components/AssetInput'
import AIAdvice from './components/AIAdvice'
import CheckoutPage from './components/CheckoutPage'

function App() {
  const [assetInput, setAssetInput] = useState({
    realEstate: 0,
    equity: 0,
    cash: 0
  })
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [currentStep, setCurrentStep] = useState<'input' | 'checkout' | 'complete'>('input')

  const handlePaymentSuccess = () => {
    setIsUnlocked(true)
    setCurrentStep('complete')
  }

  const handleContinueToCheckout = () => {
    setCurrentStep('checkout')
  }

  const handleBackToInput = () => {
    setCurrentStep('input')
  }

  if (currentStep === 'checkout') {
    return (
      <CheckoutPage 
        onPaymentSuccess={handlePaymentSuccess}
        onBack={handleBackToInput}
      />
    )
  }

  if (currentStep === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🎉 支付成功！</h1>
            <p className="text-gray-600">现在您可以访问完整的分析报告和 AI 建议</p>
          </header>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <AIAdvice assetInput={assetInput} isUnlocked={true} />
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 完整报告</h2>
              <div className="space-y-4">
                <button className="w-full btn-primary">
                  📥 下载 PDF 报告
                </button>
                <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  📈 查看详细图表
                </button>
                <button 
                  onClick={() => setCurrentStep('input')}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  🔄 重新开始评估
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            降息资产配置博弈工具
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            专业的降息情景资产配置分析工具，为投资者提供数据驱动的决策支持
          </p>
          <div className="bg-blue-50 p-6 rounded-xl max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">为什么现在？</h2>
            <p className="text-blue-800">
              2025年下半年美联储降息预期上升，市场环境变化将显著影响资产配置策略。
              提前评估您的投资组合，把握降息带来的投资机会。
            </p>
          </div>
        </header>

        <main className="grid lg:grid-cols-2 gap-8 mb-8">
          <AssetInput 
            assetInput={assetInput} 
            onAssetChange={setAssetInput} 
          />
          <RateCalculator assetInput={assetInput} />
        </main>

        {assetInput.realEstate + assetInput.equity + assetInput.cash > 0 && (
          <div className="text-center mb-8">
            <button
              onClick={handleContinueToCheckout}
              className="btn-primary text-lg px-8 py-3"
            >
              继续获取完整分析 →
            </button>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <AIAdvice assetInput={assetInput} isUnlocked={isUnlocked} />
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 工具特色</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-semibold text-gray-900">精准计算</h3>
                  <p className="text-sm text-gray-600">基于历史数据和启发式模型的降息情景分析</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🤖</div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI 建议</h3>
                  <p className="text-sm text-gray-600">个性化投资策略建议，助您做出明智决策</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-gray-900">详细报告</h3>
                  <p className="text-sm text-gray-600">完整的分析报告，支持 PDF 导出和分享</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-16 text-gray-500">
          <p>开发者: @eclipsecybertitan</p>
          <p className="text-sm mt-2">
            免责声明：本工具提供的分析结果基于历史数据和启发式模型，
            不构成投资建议。投资有风险，决策需谨慎。
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
