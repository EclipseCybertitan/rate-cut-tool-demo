import { useState } from 'react'
import './App.css'
import RateCalculator from './components/RateCalculator'
import AssetInput from './components/AssetInput'
import AIAdvice from './components/AIAdvice'
import CheckoutPage from './components/CheckoutPage'
import BacktestDisplay from './components/BacktestDisplay'
import InvestmentMethodology from './components/InvestmentMethodology'

function App() {
  const [assetInput, setAssetInput] = useState({
    realEstate: 0,
    equity: 0,
    cash: 0,
    fund: 0,
    crypto: 0,
    insurance: 0
  })
  const [currentStep, setCurrentStep] = useState<'input' | 'checkout' | 'complete'>('input')

  const handlePaymentSuccess = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">🎉 支付成功！</h1>
            <p className="text-gray-300">现在您可以访问完整的分析报告和 AI 建议</p>
          </header>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <AIAdvice assetInput={assetInput} isUnlocked={true} />
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">📊 完整报告</h2>
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold shadow-lg">
                  📥 下载 PDF 报告
                </button>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg">
                  📈 查看详细图表
                </button>
                <button 
                  onClick={() => setCurrentStep('input')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            降息资产配置博弈工具
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            专业的降息情景资产配置分析工具，为投资者提供数据驱动的决策支持
          </p>
          <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl max-w-2xl mx-auto border border-blue-600/30">
            <h2 className="text-lg font-semibold text-blue-300 mb-2">为什么现在？</h2>
            <p className="text-blue-200">
              2025年下半年美联储降息预期上升，市场环境变化将显著影响资产配置策略。
              提前评估您的投资组合，把握降息带来的投资机会。
            </p>
          </div>
        </header>

        {/* 投资方法论 */}
        <div className="mb-8">
          <InvestmentMethodology 
            assetInput={assetInput} 
            onAssetChange={setAssetInput} 
          />
        </div>

        <main className="grid lg:grid-cols-2 gap-8 mb-8">
          <AssetInput 
            assetInput={assetInput} 
            onAssetChange={setAssetInput} 
          />
          <RateCalculator assetInput={assetInput} />
        </main>

        {/* 美国资产利率回测分析 */}
        <div className="mb-8">
          <BacktestDisplay assetInput={assetInput} />
        </div>

        {Object.values(assetInput).some(value => value > 0) && (
          <div className="text-center">
            <button
              onClick={handleContinueToCheckout}
              className="btn-primary text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🔓 解锁完整分析报告
            </button>
            <p className="text-gray-400 mt-3">
              获取专业的 AI 投资建议、详细图表分析和 PDF 报告导出
            </p>
          </div>
        )}

        <footer className="text-center mt-16 text-gray-500">
          <p className="text-gray-400">开发者: @eclipsecybertitan</p>
          <p className="text-sm mt-2 text-gray-500">
            免责声明：本工具提供的分析结果基于历史数据和启发式模型，不构成投资建议。投资有风险，决策需谨慎。
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
