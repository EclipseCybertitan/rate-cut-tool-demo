import { useState } from 'react'
import { CurrencyDollarIcon, QrCodeIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'

interface CryptoPaymentProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
  onCancel: () => void
}

interface CryptoOption {
  symbol: string
  name: string
  address: string
  qrCode: string
  exchangeRate: number
  networkFee: number
  minConfirmations: number
}

const cryptoOptions: CryptoOption[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QlRDPC90ZXh0Pjwvc3ZnPg==',
    exchangeRate: 45000,
    networkFee: 0.0001,
    minConfirmations: 3
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RVQ8L3RleHQ+PC9zdmc+',
    exchangeRate: 2800,
    networkFee: 0.005,
    minConfirmations: 12
  },
  {
    symbol: 'USDT',
    name: 'Tether (TRC20)',
    address: 'TQn9Y2khDD95J42FQtQTdwVVRKjLwWzFJm',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VXN0PC90ZXh0Pjwvc3ZnPg==',
    exchangeRate: 1,
    networkFee: 1,
    minConfirmations: 1
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+VXNjPC90ZXh0Pjwvc3ZnPg==',
    exchangeRate: 1,
    networkFee: 0.005,
    minConfirmations: 12
  }
]

export default function CryptoPayment({ amount, onSuccess, onCancel }: CryptoPaymentProps) {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoOption>(cryptoOptions[0])
  const [copiedAddress, setCopiedAddress] = useState(false)
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(selectedCrypto.address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = selectedCrypto.address
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    }
  }

  const getCryptoAmount = () => {
    return (amount / selectedCrypto.exchangeRate).toFixed(8)
  }

  const startPaymentCheck = () => {
    setIsCheckingPayment(true)
    
    // 模拟检查支付状态
    setTimeout(() => {
      setIsCheckingPayment(false)
      // 模拟支付成功
      const transactionId = 'crypto_' + Math.random().toString(36).substr(2, 9)
      onSuccess(transactionId)
    }, 3000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CurrencyDollarIcon className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">加密货币支付</h2>
        <p className="text-gray-600">选择您偏好的数字货币进行支付</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 左侧：币种选择 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">选择币种</h3>
          <div className="space-y-3">
            {cryptoOptions.map((crypto) => (
              <div
                key={crypto.symbol}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedCrypto.symbol === crypto.symbol
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedCrypto(crypto)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{crypto.symbol}</div>
                    <div className="text-sm text-gray-600">{crypto.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">网络费</div>
                    <div className="text-sm font-medium text-gray-900">
                      {crypto.networkFee} {crypto.symbol}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：支付信息 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">支付信息</h3>
          
          {/* 金额信息 */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">支付金额 (USD)</span>
                <span className="font-semibold">${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">兑换汇率</span>
                <span className="font-semibold">1 USD = {selectedCrypto.exchangeRate} {selectedCrypto.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">需支付</span>
                <span className="text-lg font-bold text-orange-600">
                  {getCryptoAmount()} {selectedCrypto.symbol}
                </span>
              </div>
            </div>
          </div>

          {/* 收款地址 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              收款地址 ({selectedCrypto.symbol})
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={selectedCrypto.address}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
              />
              <button
                onClick={copyAddress}
                className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                title="复制地址"
              >
                {copiedAddress ? (
                  <CheckIcon className="w-4 h-4" />
                ) : (
                  <ClipboardDocumentIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* QR码 */}
          <div className="text-center mb-4">
            <div className="bg-gray-100 p-4 rounded-lg inline-block">
              <img 
                src={selectedCrypto.qrCode} 
                alt={`${selectedCrypto.symbol} QR Code`}
                className="w-32 h-32"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              使用钱包扫描二维码
            </p>
          </div>

          {/* 支付按钮 */}
          <button
            onClick={startPaymentCheck}
            disabled={isCheckingPayment}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isCheckingPayment ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                检查支付状态...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <QrCodeIcon className="w-5 h-5 mr-2" />
                我已完成支付
              </div>
            )}
          </button>

          {/* 取消按钮 */}
          <button
            onClick={onCancel}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors mt-3"
          >
            取消
          </button>
        </div>
      </div>

      {/* 重要提示 */}
      <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-start space-x-3">
          <div className="text-red-600 text-lg">⚠️</div>
          <div>
            <h4 className="font-semibold text-red-800 text-sm">重要提示</h4>
            <ul className="text-xs text-red-700 mt-1 space-y-1">
              <li>• 请确保发送到正确的地址，错误地址可能导致资金丢失</li>
              <li>• 建议支付金额略高于显示金额，以覆盖网络费用</li>
              <li>• 支付完成后需要等待 {selectedCrypto.minConfirmations} 个网络确认</li>
              <li>• 加密货币支付不可逆，请仔细核对信息</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
