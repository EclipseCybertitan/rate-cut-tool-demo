/**
 * 支付模拟组件
 * 生成测试支付回执
 * 遵循RULES.md：三主题CSS变量、无内联样式、无障碍
 * @author @eclipsecybertitan
 */

import { useState } from 'react'
import { 
  CreditCardIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
// import { useTheme } from '../contexts/ThemeContext'
import { PaymentInfo } from '../api/types'

interface PaymentSimulatorProps {
  className?: string
  onPaymentComplete?: (payment: PaymentInfo) => void
  onPaymentFailed?: (error: string) => void
  defaultAmount?: number
  defaultMethod?: PaymentInfo['method']
}

interface PaymentStatus {
  status: PaymentInfo['status']
  message: string
  icon: any
  color: string
}

export default function PaymentSimulator({
  className = '',
  onPaymentComplete,
  onPaymentFailed,
  defaultAmount = 29.99,
  defaultMethod = 'credit_card'
}: PaymentSimulatorProps) {
  // const { theme: currentTheme } = useTheme()
  const [amount, setAmount] = useState(defaultAmount)
  const [method, setMethod] = useState<PaymentInfo['method']>(defaultMethod)
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<PaymentInfo | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)

  // 支付方法配置
  const paymentMethods = [
    {
      id: 'credit_card' as const,
      name: '信用卡',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, American Express',
      processingTime: 2000
    },
    {
      id: 'crypto' as const,
      name: '加密货币',
      icon: CurrencyDollarIcon,
      description: 'Bitcoin, Ethereum, USDC',
      processingTime: 5000
    },
    {
      id: 'apple_pay' as const,
      name: 'Apple Pay',
      icon: CreditCardIcon,
      description: 'Apple 移动支付',
      processingTime: 1500
    },
    {
      id: 'google_pay' as const,
      name: 'Google Pay',
      icon: CreditCardIcon,
      description: 'Google 移动支付',
      processingTime: 1500
    }
  ]

  // 获取支付状态信息
  const getPaymentStatus = (status: PaymentInfo['status']): PaymentStatus => {
    switch (status) {
      case 'pending':
        return {
          status: 'pending',
          message: '处理中...',
          icon: ClockIcon,
          color: 'text-yellow-500'
        }
      case 'completed':
        return {
          status: 'completed',
          message: '支付成功',
          icon: CheckCircleIcon,
          color: 'text-green-500'
        }
      case 'failed':
        return {
          status: 'failed',
          message: '支付失败',
          icon: XCircleIcon,
          color: 'text-red-500'
        }
      case 'cancelled':
        return {
          status: 'cancelled',
          message: '已取消',
          icon: ExclamationTriangleIcon,
          color: 'text-gray-500'
        }
    }
  }

  // 模拟支付处理
  const processPayment = async () => {
    if (isProcessing) return

    setIsProcessing(true)
    
    // 创建支付记录
    const payment: PaymentInfo = {
      id: generatePaymentId(),
      amount,
      currency: 'USD',
      method,
      status: 'pending',
      timestamp: new Date().toISOString(),
      transactionHash: method === 'crypto' ? generateTransactionHash() : undefined
    }

    setCurrentPayment(payment)

    // 获取支付方法配置
    const methodConfig = paymentMethods.find(m => m.id === method)
    const processingTime = methodConfig?.processingTime || 2000

    // 模拟支付处理延迟
    await new Promise(resolve => setTimeout(resolve, processingTime))

    // 模拟支付结果（90%成功率）
    const isSuccess = Math.random() > 0.1
    
    if (isSuccess) {
      payment.status = 'completed'
      // payment.completedAt = new Date().toISOString() // 暂时注释，需要更新类型定义
      onPaymentComplete?.(payment)
    } else {
      payment.status = 'failed'
      onPaymentFailed?.('支付处理失败，请重试')
    }

    setCurrentPayment(payment)
    setIsProcessing(false)
    
    if (isSuccess) {
      setShowReceipt(true)
    }
  }

  // 取消支付
  const cancelPayment = () => {
    if (currentPayment && currentPayment.status === 'pending') {
      currentPayment.status = 'cancelled'
      setCurrentPayment({ ...currentPayment })
      setIsProcessing(false)
    }
  }

  // 重新开始
  const resetPayment = () => {
    setCurrentPayment(null)
    setShowReceipt(false)
    setIsProcessing(false)
  }

  // 生成支付ID
  const generatePaymentId = (): string => {
    return `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // 生成交易哈希
  const generateTransactionHash = (): string => {
    return `0x${Math.random().toString(16).substr(2, 64)}`
  }

  // 格式化金额
  const formatAmount = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }

  // 格式化时间
  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('zh-CN')
  }

  // 渲染支付方法选择
  const renderPaymentMethods = () => (
    <div className="space-y-3">
      {paymentMethods.map((methodConfig) => (
        <label
          key={methodConfig.id}
          className={`
            flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
            ${method === methodConfig.id 
              ? 'border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10' 
              : 'border-[var(--color-border)] bg-[var(--color-bg-primary)] hover:border-[var(--color-accent-primary)]/50'
            }
          `}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={methodConfig.id}
            checked={method === methodConfig.id}
            onChange={(e) => setMethod(e.target.value as PaymentInfo['method'])}
            className="mr-3"
            aria-label={`选择${methodConfig.name}支付方式`}
          />
          <div className="flex items-center space-x-3">
            <methodConfig.icon className="w-6 h-6 text-[var(--color-accent-primary)]" />
            <div>
              <div className="font-semibold text-[var(--color-text-primary)]">
                {methodConfig.name}
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">
                {methodConfig.description}
              </div>
            </div>
          </div>
        </label>
      ))}
    </div>
  )

  // 渲染支付处理状态
  const renderPaymentStatus = () => {
    if (!currentPayment) return null

    const statusInfo = getPaymentStatus(currentPayment.status)
    const StatusIcon = statusInfo.icon

    return (
      <div className="bg-[var(--color-bg-primary)] rounded-lg p-6 text-center">
        <StatusIcon className={`w-16 h-16 mx-auto mb-4 ${statusInfo.color}`} />
        <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
          {statusInfo.message}
        </h3>
        <p className="text-[var(--color-text-secondary)] mb-4">
          支付ID: {currentPayment.id}
        </p>
        
        {currentPayment.status === 'pending' && (
          <div className="space-y-3">
            <div className="animate-pulse bg-[var(--color-accent-primary)]/20 h-2 rounded-full"></div>
            <div className="animate-pulse bg-[var(--color-accent-primary)]/20 h-2 rounded-full w-3/4 mx-auto"></div>
            <button
              onClick={cancelPayment}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              aria-label="取消支付"
            >
              取消支付
            </button>
          </div>
        )}
        
        {currentPayment.status === 'completed' && (
          <button
            onClick={() => setShowReceipt(true)}
            className="px-6 py-2 bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            aria-label="查看收据"
          >
            查看收据
          </button>
        )}
        
        {currentPayment.status === 'failed' && (
          <button
            onClick={resetPayment}
            className="px-6 py-2 bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            aria-label="重新支付"
          >
            重新支付
          </button>
        )}
      </div>
    )
  }

  // 渲染支付收据
  const renderReceipt = () => {
    if (!currentPayment || !showReceipt) return null

    return (
      <div className="bg-[var(--color-bg-primary)] rounded-lg p-6 border border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center">
            <DocumentTextIcon className="w-6 h-6 mr-2 text-[var(--color-accent-primary)]" />
            支付收据
          </h3>
          <button
            onClick={() => setShowReceipt(false)}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            aria-label="关闭收据"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">支付ID:</span>
            <span className="text-[var(--color-text-primary)] font-mono text-sm">
              {currentPayment.id}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">金额:</span>
            <span className="text-[var(--color-text-primary)] font-bold">
              {formatAmount(currentPayment.amount)}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">支付方式:</span>
            <span className="text-[var(--color-text-primary)]">
              {paymentMethods.find(m => m.id === currentPayment.method)?.name}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">状态:</span>
            <span className="text-green-500 font-semibold">已完成</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-[var(--color-text-secondary)]">时间:</span>
            <span className="text-[var(--color-text-primary)]">
              {formatTime(currentPayment.timestamp)}
            </span>
          </div>
          
          {currentPayment.transactionHash && (
            <div className="flex justify-between">
              <span className="text-[var(--color-text-secondary)]">交易哈希:</span>
              <span className="text-[var(--color-text-primary)] font-mono text-xs">
                {currentPayment.transactionHash}
              </span>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
          <button
            onClick={resetPayment}
            className="w-full px-6 py-3 bg-[var(--color-accent-primary)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            aria-label="完成支付"
          >
            完成
          </button>
        </div>
      </div>
    )
  }

  // 主界面
  if (showReceipt) {
    return renderReceipt()
  }

  if (currentPayment) {
    return renderPaymentStatus()
  }

  return (
    <div className={`
      payment-simulator bg-[var(--color-bg-secondary)] rounded-xl p-6 border border-[var(--color-border)]
      ${className}
    `}>
      {/* 标题 */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          支付模拟器
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          模拟各种支付方式的处理流程
        </p>
      </div>

      {/* 金额输入 */}
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
          支付金额 (USD)
        </label>
        <div className="relative">
          <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--color-text-secondary)]" />
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            min="0.01"
            step="0.01"
            className="
              w-full pl-10 pr-4 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-border)]
              rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]
              focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)]
              transition-all
            "
            placeholder="输入金额"
            aria-describedby="amount-help"
          />
        </div>
        <p id="amount-help" className="mt-1 text-xs text-[var(--color-text-secondary)]">
          支持 0.01 到 9999.99 美元
        </p>
      </div>

      {/* 支付方式选择 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-3">
          选择支付方式
        </label>
        {renderPaymentMethods()}
      </div>

      {/* 支付按钮 */}
      <div className="space-y-3">
        <button
          onClick={processPayment}
          disabled={isProcessing || amount <= 0}
          className="
            w-full px-6 py-4 bg-[var(--color-accent-primary)] text-white rounded-lg
            hover:bg-[var(--color-accent-hover)] transition-all font-semibold text-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:ring-2 focus:ring-[var(--color-accent-primary)] focus:ring-offset-2
          "
          aria-label={`使用${paymentMethods.find(m => m.id === method)?.name}支付${formatAmount(amount)}`}
        >
          {isProcessing ? '处理中...' : `支付 ${formatAmount(amount)}`}
        </button>
        
        <p className="text-xs text-[var(--color-text-secondary)] text-center">
          这是一个模拟支付系统，不会产生真实的金融交易
        </p>
      </div>

      {/* 无障碍信息 */}
      <div className="mt-6 text-xs text-[var(--color-text-secondary)] text-center">
        <span className="sr-only">
          支付模拟器，当前选择金额 {formatAmount(amount)}，
          支付方式 {paymentMethods.find(m => m.id === method)?.name}
        </span>
        模拟支付 • 仅供测试使用
      </div>
    </div>
  )
}

// 开发者签名: @eclipsecybertitan
