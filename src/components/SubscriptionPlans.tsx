/**
 * 订阅计划展示和选择组件
 * 支持多层级用户服务与功能对比
 * @author @eclipsecybertitan
 */

import { useState } from 'react'
import { CheckIcon, XMarkIcon, StarIcon, ShieldCheckIcon, RocketLaunchIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { SUBSCRIPTION_PLANS, SubscriptionPlan, UserType, canUserAccessFeature } from '../types/user'

interface SubscriptionPlansProps {
  currentUserType?: UserType
  onPlanSelect?: (plan: SubscriptionPlan) => void
  showComparison?: boolean
}

export default function SubscriptionPlans({ 
  currentUserType, 
  onPlanSelect, 
  showComparison = true 
}: SubscriptionPlansProps) {
  const [_selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
    onPlanSelect?.(plan)
  }

  const getPlanIcon = (plan: SubscriptionPlan) => {
    switch (plan) {
      case SubscriptionPlan.FREE:
        return <StarIcon className="w-6 h-6 text-yellow-500" />
      case SubscriptionPlan.PERSONAL_PAY_PER_USE:
        return <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
      case SubscriptionPlan.ADVANCED_MONTHLY:
      case SubscriptionPlan.ADVANCED_YEARLY:
        return <RocketLaunchIcon className="w-6 h-6 text-purple-500" />
      case SubscriptionPlan.PROFESSIONAL_MONTHLY:
      case SubscriptionPlan.PROFESSIONAL_YEARLY:
        return <BuildingOfficeIcon className="w-6 h-6 text-indigo-500" />
      case SubscriptionPlan.ENTERPRISE_CUSTOM:
        return <BuildingOfficeIcon className="w-6 h-6 text-gray-800" />
      default:
        return <StarIcon className="w-6 h-6 text-gray-400" />
    }
  }

  const getPlanColor = (plan: SubscriptionPlan) => {
    switch (plan) {
      case SubscriptionPlan.FREE:
        return 'border-yellow-200 bg-yellow-50'
      case SubscriptionPlan.PERSONAL_PAY_PER_USE:
        return 'border-blue-200 bg-blue-50'
      case SubscriptionPlan.ADVANCED_MONTHLY:
      case SubscriptionPlan.ADVANCED_YEARLY:
        return 'border-purple-200 bg-purple-50'
      case SubscriptionPlan.PROFESSIONAL_MONTHLY:
      case SubscriptionPlan.PROFESSIONAL_YEARLY:
        return 'border-indigo-200 bg-indigo-50'
      case SubscriptionPlan.ENTERPRISE_CUSTOM:
        return 'border-gray-200 bg-gray-50'
      default:
        return 'border-gray-200 bg-white'
    }
  }

  const getPlanBadge = (plan: SubscriptionPlan) => {
    switch (plan) {
      case SubscriptionPlan.FREE:
        return { text: '免费', color: 'bg-yellow-100 text-yellow-800' }
      case SubscriptionPlan.PERSONAL_PAY_PER_USE:
        return { text: '按次付费', color: 'bg-blue-100 text-blue-800' }
      case SubscriptionPlan.ADVANCED_MONTHLY:
      case SubscriptionPlan.ADVANCED_YEARLY:
        return { text: '推荐', color: 'bg-purple-100 text-purple-800' }
      case SubscriptionPlan.PROFESSIONAL_MONTHLY:
      case SubscriptionPlan.PROFESSIONAL_YEARLY:
        return { text: '专业', color: 'bg-indigo-100 text-indigo-800' }
      case SubscriptionPlan.ENTERPRISE_CUSTOM:
        return { text: '企业', color: 'bg-gray-100 text-gray-800' }
      default:
        return { text: '', color: '' }
    }
  }

  const filteredPlans = Object.values(SUBSCRIPTION_PLANS).filter(plan => {
    if (billingCycle === 'monthly') {
      return plan.billingCycle === 'monthly' || plan.billingCycle === 'pay_per_use' || plan.billingCycle === 'yearly'
    } else {
      return plan.billingCycle === 'yearly'
    }
  })

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 标题和描述 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          选择适合您的投资分析方案
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          从个人投资者到专业机构，我们提供多层级服务满足不同需求
        </p>
      </div>

      {/* 计费周期切换 */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            年付
            <span className="ml-1 text-xs text-green-600">节省17%</span>
          </button>
        </div>
      </div>

      {/* 订阅计划网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {filteredPlans.map((plan) => {
          const badge = getPlanBadge(plan.plan)
          const isCurrentPlan = currentUserType && 
            (plan.plan === SubscriptionPlan.FREE && currentUserType === UserType.FREE) ||
            (plan.plan === SubscriptionPlan.PERSONAL_PAY_PER_USE && currentUserType === UserType.PERSONAL) ||
            (plan.plan === SubscriptionPlan.ADVANCED_MONTHLY && currentUserType === UserType.ADVANCED) ||
            (plan.plan === SubscriptionPlan.PROFESSIONAL_MONTHLY && currentUserType === UserType.PROFESSIONAL) ||
            (plan.plan === SubscriptionPlan.ENTERPRISE_CUSTOM && currentUserType === UserType.ENTERPRISE)

          return (
            <div
              key={plan.plan}
              className={`relative rounded-lg border-2 p-6 transition-all hover:shadow-lg ${
                getPlanColor(plan.plan)
              } ${isCurrentPlan ? 'ring-2 ring-blue-500' : ''}`}
            >
              {/* 徽章 */}
              {badge.text && (
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                  {badge.text}
                </div>
              )}

              {/* 当前计划标识 */}
              {isCurrentPlan && (
                <div className="absolute -top-3 right-4 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  当前计划
                </div>
              )}

              {/* 计划图标和名称 */}
              <div className="text-center mb-4">
                <div className="flex justify-center mb-2">
                  {getPlanIcon(plan.plan)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.plan === SubscriptionPlan.FREE && '免费版'}
                  {plan.plan === SubscriptionPlan.PERSONAL_PAY_PER_USE && '个人版'}
                  {plan.plan === SubscriptionPlan.ADVANCED_MONTHLY && '进阶版'}
                  {plan.plan === SubscriptionPlan.ADVANCED_YEARLY && '进阶版'}
                  {plan.plan === SubscriptionPlan.PROFESSIONAL_MONTHLY && '专业版'}
                  {plan.plan === SubscriptionPlan.PROFESSIONAL_YEARLY && '专业版'}
                  {plan.plan === SubscriptionPlan.ENTERPRISE_CUSTOM && '企业版'}
                </h3>
              </div>

              {/* 价格 */}
              <div className="text-center mb-6">
                {plan.price === 0 ? (
                  <div className="text-3xl font-bold text-gray-900">免费</div>
                ) : (
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      {plan.billingCycle === 'pay_per_use' ? '每次使用' : 
                       plan.billingCycle === 'monthly' ? '每月' : '每年'}
                    </div>
                  </div>
                )}
              </div>

              {/* 功能列表 */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* 限制信息 */}
              <div className="text-xs text-gray-500 mb-6">
                {plan.limits.maxReportsPerMonth === -1 ? (
                  <div>✓ 无限制报告生成</div>
                ) : (
                  <div>✓ 每月 {plan.limits.maxReportsPerMonth} 次报告</div>
                )}
                {plan.limits.maxPortfolios === -1 ? (
                  <div>✓ 无限制投资组合</div>
                ) : (
                  <div>✓ 最多 {plan.limits.maxPortfolios} 个投资组合</div>
                )}
              </div>

              {/* 选择按钮 */}
              <button
                onClick={() => handlePlanSelect(plan.plan)}
                disabled={isCurrentPlan}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                  isCurrentPlan
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : plan.price === 0
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isCurrentPlan ? '当前计划' : 
                 plan.price === 0 ? '开始使用' : '选择计划'}
              </button>
            </div>
          )
        })}
      </div>

      {/* 功能对比表格 */}
      {showComparison && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-900">功能对比</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    功能特性
                  </th>
                  {Object.values(SUBSCRIPTION_PLANS).map((plan) => (
                    <th key={plan.plan} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {plan.plan === SubscriptionPlan.FREE && '免费版'}
                      {plan.plan === SubscriptionPlan.PERSONAL_PAY_PER_USE && '个人版'}
                      {plan.plan === SubscriptionPlan.ADVANCED_MONTHLY && '进阶版'}
                      {plan.plan === SubscriptionPlan.PROFESSIONAL_MONTHLY && '专业版'}
                      {plan.plan === SubscriptionPlan.ENTERPRISE_CUSTOM && '企业版'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  '基础模拟',
                  'PDF导出',
                  'AI建议',
                  '历史回测',
                  '客户管理',
                  'API访问',
                  '白标报告',
                  '专属支持'
                ].map((feature) => (
                  <tr key={feature}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {feature}
                    </td>
                    {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
                      const hasFeature = canUserAccessFeature(
                        plan.plan === SubscriptionPlan.FREE ? UserType.FREE :
                        plan.plan === SubscriptionPlan.PERSONAL_PAY_PER_USE ? UserType.PERSONAL :
                        plan.plan === SubscriptionPlan.ADVANCED_MONTHLY ? UserType.ADVANCED :
                        plan.plan === SubscriptionPlan.PROFESSIONAL_MONTHLY ? UserType.PROFESSIONAL :
                        UserType.ENTERPRISE,
                        feature.toLowerCase().replace(/\s+/g, '_')
                      )
                      
                      return (
                        <td key={plan.plan} className="px-6 py-4 whitespace-nowrap text-center">
                          {hasFeature ? (
                            <CheckIcon className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <XMarkIcon className="w-5 h-5 text-red-500 mx-auto" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 联系销售 */}
      <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          需要定制化解决方案？
        </h3>
        <p className="text-gray-600 mb-4">
          我们的企业团队可以为您提供专属的定制化服务和部署方案
        </p>
        <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-md font-medium transition-colors">
          联系销售团队
        </button>
      </div>
    </div>
  )
}
