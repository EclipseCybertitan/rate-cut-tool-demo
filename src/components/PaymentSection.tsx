import { useState } from 'react'

interface PaymentSectionProps {
  onPaymentSuccess: () => void
}

export default function PaymentSection({ onPaymentSuccess }: PaymentSectionProps) {
  const [selectedGateway, setSelectedGateway] = useState<'coinbase' | 'nowpayments' | 'btcpay'>('coinbase')
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // 模拟支付处理
    setTimeout(() => {
      setIsProcessing(false)
      onPaymentSuccess()
    }, 2000)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">解锁完整报告</h2>
      
      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💰 一次性付费 $29.99</h3>
          <p className="text-blue-800 text-sm">
            包含：详细分析报告、AI 投资建议、多情景模拟、PDF 导出
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900">选择支付方式</h3>
        
        {/* Coinbase Commerce */}
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
          <input
            type="radio"
            name="gateway"
            value="coinbase"
            checked={selectedGateway === 'coinbase'}
            onChange={(e) => setSelectedGateway(e.target.value as any)}
            className="mr-3"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Coinbase Commerce</div>
            <div className="text-sm text-gray-600">USDC, ETH, BTC 支付</div>
          </div>
        </label>

        {/* NOWPayments */}
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
          <input
            type="radio"
            name="gateway"
            value="nowpayments"
            checked={selectedGateway === 'nowpayments'}
            onChange={(e) => setSelectedGateway(e.target.value as any)}
            className="mr-3"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">NOWPayments</div>
            <div className="text-sm text-gray-600">USDT-TRC20, 多种加密货币</div>
          </div>
        </label>

        {/* BTCPay Server */}
        <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
          <input
            type="radio"
            name="gateway"
            value="btcpay"
            checked={selectedGateway === 'btcpay'}
            onChange={(e) => setSelectedGateway(e.target.value as any)}
            className="mr-3"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">BTCPay Server</div>
            <div className="text-sm text-gray-600">自托管，隐私保护</div>
          </div>
        </label>
      </div>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? '处理中...' : '立即支付 $29.99'}
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>⚠️ 加密货币支付不可逆，请确认金额和地址</p>
        <p>支持退款政策，详见服务条款</p>
      </div>
    </div>
  )
}
