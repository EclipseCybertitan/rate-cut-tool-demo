import { useState } from 'react'
import './App.css'
import IntroductionPage from './components/IntroductionPage'
import MethodologyPage from './components/MethodologyPage'
import AssetConfigurationPage from './components/AssetConfigurationPage'
import RateCalculator from './components/RateCalculator'
import AIAdvice from './components/AIAdvice'
import CheckoutPage from './components/CheckoutPage'
import BacktestDisplay from './components/BacktestDisplay'
import MVPDemo from './components/MVPDemo'
import SupabaseTest from './components/SupabaseTest'
// import InvestmentMethodology from './components/InvestmentMethodology'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { LanguageProvider } from './contexts/LanguageContext'

type PageStep = 'introduction' | 'methodology' | 'configuration' | 'analysis' | 'checkout' | 'complete' | 'mvp' | 'supabase-test'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageStep>('introduction')
  const [assetInput, setAssetInput] = useState({
    realEstate: 0,
    equity: 0,
    cash: 0,
    fund: 0,
    crypto: 0,
    insurance: 0
  })

  const handleNextPage = () => {
    switch (currentPage) {
      case 'introduction':
        setCurrentPage('methodology')
        break
      case 'methodology':
        setCurrentPage('configuration')
        break
      case 'configuration':
        setCurrentPage('analysis')
        break
      default:
        break
    }
  }

  const handleBackPage = () => {
    switch (currentPage) {
      case 'methodology':
        setCurrentPage('introduction')
        break
      case 'configuration':
        setCurrentPage('methodology')
        break
      case 'analysis':
        setCurrentPage('configuration')
        break
      default:
        break
    }
  }

  const handlePaymentSuccess = () => {
    setCurrentPage('complete')
  }

  const handleContinueToCheckout = () => {
    setCurrentPage('checkout')
  }

  const handleBackToAnalysis = () => {
    setCurrentPage('analysis')
  }

  // 渲染不同页面
  switch (currentPage) {
    case 'introduction':
      return <IntroductionPage onNext={handleNextPage} />
    
    case 'methodology':
      return (
        <MethodologyPage 
          onBack={handleBackPage}
          onNext={handleNextPage}
          onAssetChange={setAssetInput}
        />
      )
    
    case 'configuration':
      return (
        <AssetConfigurationPage 
          onBack={handleBackPage}
          onNext={handleNextPage}
          assetInput={assetInput}
          onAssetChange={setAssetInput}
        />
      )
    
    case 'checkout':
      return (
        <CheckoutPage 
          onPaymentSuccess={handlePaymentSuccess}
          onBack={handleBackToAnalysis}
        />
      )
    
    case 'mvp':
      return <MVPDemo onNavigateToSupabaseTest={() => setCurrentPage('supabase-test')} />
    
    case 'supabase-test':
      return <SupabaseTest />
    
    case 'complete':
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
                    onClick={() => setCurrentPage('introduction')}
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
    
    default:
      // 分析页面 - 主要功能页面
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
          {/* 投资方法论条 - 固定置顶 */}
          <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm border-b border-gray-700">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">当前投资哲学</h2>
                <button
                  onClick={() => setCurrentPage('methodology')}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  切换哲学 →
                </button>
              </div>
            </div>
          </div>

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

            <main className="grid lg:grid-cols-2 gap-8 mb-8">
              <RateCalculator assetInput={assetInput} />
              
              {/* 资产配置概览 - 增加彩色环形图 */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">📊 资产配置概览</h2>
                
                {/* 环形图 */}
                <div className="mb-6 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: '房产', value: assetInput.realEstate, color: '#10B981' },
                          { name: '股票', value: assetInput.equity, color: '#3B82F6' },
                          { name: '现金', value: assetInput.cash, color: '#F59E0B' },
                          { name: '基金', value: assetInput.fund, color: '#8B5CF6' },
                          { name: '虚拟货币', value: assetInput.crypto, color: '#F97316' },
                          { name: '保险', value: assetInput.insurance, color: '#EF4444' }
                        ].filter(item => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {[
                          { name: '房产', value: assetInput.realEstate, color: '#10B981' },
                          { name: '股票', value: assetInput.equity, color: '#3B82F6' },
                          { name: '现金', value: assetInput.cash, color: '#F59E0B' },
                          { name: '基金', value: assetInput.fund, color: '#8B5CF6' },
                          { name: '虚拟货币', value: assetInput.crypto, color: '#F97316' },
                          { name: '保险', value: assetInput.insurance, color: '#EF4444' }
                        ].filter(item => item.value > 0).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any, name: any) => [`$${value.toLocaleString('en-US')}`, name]}
                        contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* 详细配置列表 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">房产:</span>
                    <span className="font-semibold text-green-400">
                      ${assetInput.realEstate.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">股票:</span>
                    <span className="font-semibold text-blue-400">
                      ${assetInput.equity.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">现金:</span>
                    <span className="font-semibold text-yellow-400">
                      ${assetInput.cash.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">基金:</span>
                    <span className="font-semibold text-purple-400">
                      ${assetInput.fund.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">虚拟货币:</span>
                    <span className="font-semibold text-orange-400">
                      ${assetInput.crypto.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">保险:</span>
                    <span className="font-semibold text-red-400">
                      ${assetInput.insurance.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>

                {/* 简短提示文本 */}
                <div className="mt-6 p-4 bg-gray-800/50 rounded-xl border border-gray-600">
                  <p className="text-sm text-gray-400 text-center">
                    💡 现金包含美联储产品、定期存款、货币基金等。基金包括股票、债券、ETF等。
                    虚拟货币基金属于虚拟货币类别。保险仅指投资型保险产品。
                  </p>
                </div>
              </div>
            </main>

            {/* 美国资产利率回测分析 */}
            <div className="mb-8">
              <BacktestDisplay assetInput={assetInput} />
            </div>

            {/* 推荐下一步操作 */}
            {Object.values(assetInput).some(value => value > 0) && (
              <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 p-6 rounded-2xl border border-blue-600/30">
                <h3 className="text-xl font-bold text-blue-300 mb-4">🎯 推荐下一步操作</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">尝试高风险组合</h4>
                    <p className="text-sm text-gray-300">观察潜在收益，了解风险承受能力</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">调整资产配置</h4>
                    <p className="text-sm text-gray-300">基于降息预期，优化投资组合结构</p>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                    <h4 className="font-semibold text-white mb-2">获取专业建议</h4>
                    <p className="text-sm text-gray-300">解锁AI投资建议和详细分析报告</p>
                  </div>
                </div>
              </div>
            )}

            {Object.values(assetInput).some(value => value > 0) && (
              <div className="text-center space-y-4">
                <button
                  onClick={handleContinueToCheckout}
                  className="btn-primary text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  🔓 解锁完整分析报告
                </button>
                <p className="text-gray-400 mt-3">
                  获取专业的 AI 投资建议、详细图表分析和 PDF 报告导出
                </p>
                
                <div className="border-t border-gray-700 pt-4">
                  <button
                    onClick={() => setCurrentPage('mvp')}
                    className="btn-secondary text-lg px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                  🚀 体验MVP功能演示
                  </button>
                  <p className="text-gray-400 mt-3">
                    体验完整的投资分析工具，包括用户权限控制、订阅计划等功能
                  </p>
                </div>
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
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
