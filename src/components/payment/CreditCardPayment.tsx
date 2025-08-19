import { useState } from 'react'
import { CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface CreditCardPaymentProps {
  amount: number
  onSuccess: (transactionId: string) => void
  onError: (error: string) => void
  onCancel: () => void
}

export default function CreditCardPayment({ amount, onSuccess, onError, onCancel }: CreditCardPaymentProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardholderName, setCardholderName] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const detectCardType = (number: string) => {
    const cleanNumber = number.replace(/\s/g, '')
    if (/^4/.test(cleanNumber)) return 'Visa'
    if (/^5[1-5]/.test(cleanNumber)) return 'Mastercard'
    if (/^3[47]/.test(cleanNumber)) return 'American Express'
    return 'Unknown'
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // 模拟 Stripe 支付处理
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟成功
      const transactionId = 'txn_' + Math.random().toString(36).substr(2, 9)
      onSuccess(transactionId)
    } catch (error) {
      onError('支付处理失败，请重试')
    } finally {
      setIsProcessing(false)
    }
  }

  const cardType = detectCardType(cardNumber)

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCardIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">信用卡支付</h2>
        <p className="text-gray-600">安全加密，支持所有主流卡种</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 卡号 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            卡号
          </label>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
              required
            />
            {cardType !== 'Unknown' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {cardType}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 持卡人姓名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            持卡人姓名
          </label>
          <input
            type="text"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            placeholder="JOHN DOE"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* 有效期和CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              有效期
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CVV
            </label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
              placeholder="123"
              maxLength={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* 金额显示 */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">支付金额</span>
            <span className="text-2xl font-bold text-gray-900">${amount.toFixed(2)}</span>
          </div>
        </div>

        {/* 支付按钮 */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              处理中...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <LockClosedIcon className="w-5 h-5 mr-2" />
              安全支付 ${amount.toFixed(2)}
            </div>
          )}
        </button>

        {/* 取消按钮 */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          取消
        </button>
      </form>

      {/* 安全提示 */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2">
          <LockClosedIcon className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-800">
            所有支付都经过 SSL 加密保护，您的信息绝对安全
          </span>
        </div>
      </div>
    </div>
  )
}
