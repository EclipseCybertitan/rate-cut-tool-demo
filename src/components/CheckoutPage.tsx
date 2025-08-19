import { useState } from 'react'
import {
  CreditCardIcon,
  CurrencyDollarIcon,
  DevicePhoneMobileIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  BellAlertIcon,
  DocumentTextIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import CreditCardPayment from './payment/CreditCardPayment'
import CryptoPayment from './payment/CryptoPayment'

interface CheckoutPageProps {
  onPaymentSuccess: () => void
  onBack: () => void
}

type PaymentMethod = 'credit_card' | 'crypto' | 'apple_pay' | 'google_pay'

export default function CheckoutPage({ onPaymentSuccess, onBack }: CheckoutPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [language, setLanguage] = useState<'zh' | 'en'>('zh')
  const amount = 29.99 // Fixed price

  const handlePaymentSuccess = () => {
    onPaymentSuccess()
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
    alert(`支付失败: ${error}`)
  }

  const handlePaymentCancel = () => {
    setSelectedMethod(null)
  }

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'zh' ? 'en' : 'zh'))
  }

  const features = [
    {
      icon: ChartBarIcon,
      zh: '自动分析信用卡账单',
      en: 'Automated Credit Card Bill Analysis'
    },
    {
      icon: ShieldCheckIcon,
      zh: '保险产品收益率分析',
      en: 'Insurance Product Yield Analysis'
    },
    {
      icon: DocumentTextIcon,
      zh: '基金/投资组合分析',
      en: 'Fund/Portfolio Analysis'
    },
    {
      icon: BellAlertIcon,
      zh: '动态收益率追踪（带提醒）',
      en: 'Dynamic Yield Tracking (with Alerts)'
    },
    {
      icon: DocumentTextIcon,
      zh: '完整 AI 投资建议报告（支持 PDF 导出）',
      en: 'Full AI Investment Advice Report (PDF Export)'
    },
  ]

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case 'credit_card':
        return (
          <CreditCardPayment
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        )
      case 'crypto':
        return (
          <CryptoPayment
            amount={amount}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
            onCancel={handlePaymentCancel}
          />
        )
      case 'apple_pay':
      case 'google_pay':
        return (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'zh' ? '移动支付' : 'Mobile Payment'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'zh' ? '即将集成 Apple Pay / Google Pay' : 'Apple Pay / Google Pay integration coming soon'}
            </p>
            <button
              onClick={handlePaymentCancel}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              {language === 'zh' ? '返回选择支付方式' : 'Back to Payment Methods'}
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {language === 'zh' ? '解锁完整分析' : 'Unlock Full Analysis'}
          </h1>
          <p className="text-xl text-gray-600">
            {language === 'zh' ? '一次性付费，获取专业投资洞察' : 'One-time payment for professional investment insights'}
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 underline flex items-center mr-4"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              {language === 'zh' ? '返回资产输入' : 'Back to Asset Input'}
            </button>
            <button
              onClick={toggleLanguage}
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              <GlobeAltIcon className="w-4 h-4 mr-1" />
              {language === 'zh' ? 'English' : '中文'}
            </button>
          </div>
        </header>

        {selectedMethod ? (
          renderPaymentForm()
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* 左侧：功能对比 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'zh' ? '高级功能一览' : 'Premium Features Overview'}
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {language === 'zh' ? feature.zh : feature.en}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold">
                  {language === 'zh' ? '一次性支付，终身享受所有高级功能及未来更新！' : 'One-time payment for lifetime access to all premium features and future updates!'}
                </p>
              </div>
            </div>

            {/* 右侧：支付选项 */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {language === 'zh' ? '选择支付方式' : 'Choose Payment Method'}
              </h2>
              <div className="space-y-4">
                {/* 信用卡/借记卡 */}
                <button
                  onClick={() => setSelectedMethod('credit_card')}
                  className="w-full flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <CreditCardIcon className="w-8 h-8 text-blue-600 mr-4" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">
                      {language === 'zh' ? '信用卡 / 借记卡' : 'Credit / Debit Card'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Visa, Mastercard, American Express
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* Placeholder for card logos */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-5" />
                  </div>
                </button>

                {/* 数字货币 */}
                <button
                  onClick={() => setSelectedMethod('crypto')}
                  className="w-full flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-500 hover:shadow-md transition-all"
                >
                  <CurrencyDollarIcon className="w-8 h-8 text-orange-600 mr-4" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">
                      {language === 'zh' ? '虚拟货币支付' : 'Crypto Payment'}
                    </div>
                    <div className="text-sm text-gray-600">
                      BTC, ETH, USDT, USDC (Coinbase Commerce, NOWPayments)
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* Placeholder for crypto logos */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt="BTC" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2021.svg/1200px-Ethereum_logo_2021.svg.png" alt="ETH" className="h-5" />
                  </div>
                </button>

                {/* 移动支付 */}
                <button
                  onClick={() => setSelectedMethod('apple_pay')} // Or 'google_pay'
                  className="w-full flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-green-500 hover:shadow-md transition-all"
                >
                  <DevicePhoneMobileIcon className="w-8 h-8 text-green-600 mr-4" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">
                      {language === 'zh' ? '移动支付' : 'Mobile Payment'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Apple Pay, Google Pay
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {/* Placeholder for mobile pay logos */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" alt="Apple Pay" className="h-5" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-5" />
                  </div>
                </button>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  {language === 'zh' ? '完成支付后自动解锁高级功能。' : 'Unlock premium features automatically after payment.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="text-center mt-16 text-gray-500">
          <p>
            {language === 'zh' ? '开发者: @eclipsecybertitan' : 'Developer: @eclipsecybertitan'}
          </p>
          <p className="text-sm mt-2">
            {language === 'zh' ? '免责声明：本工具提供的分析结果基于历史数据和启发式模型，不构成投资建议。投资有风险，决策需谨慎。' : 'Disclaimer: The analysis results provided by this tool are based on historical data and heuristic models, and do not constitute investment advice. Investments carry risks, and decisions should be made with caution.'}
          </p>
          <p className="text-sm mt-1">
            {language === 'zh' ? '退款政策和制裁地区限制请参阅服务条款。' : 'For refund policy and sanctioned region restrictions, please refer to the terms of service.'}
          </p>
        </footer>
      </div>
    </div>
  )
}
