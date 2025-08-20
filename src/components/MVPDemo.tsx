/**
 * MVP演示页面
 * 展示所有核心功能和用户权限控制
 * @author @eclipsecybertitan
 */

import { useState } from 'react'
import { UserIcon, CogIcon, ChartBarIcon, DocumentTextIcon, StarIcon } from '@heroicons/react/24/outline'
import { UserType } from '../types/user'
import SubscriptionPlans from './SubscriptionPlans'
import FeatureGate from './FeatureGate'
import { FeatureLimit } from './FeatureGate'
import PDFExporter from './PDFExporter'
import MediaRegistry from './MediaRegistry'
import PaymentSimulator from './PaymentSimulator'

export default function MVPDemo() {
  const [currentUserType, setCurrentUserType] = useState<UserType>(UserType.FREE)
  const [usageCount, setUsageCount] = useState(0)
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false)

  const handleUserTypeChange = (userType: UserType) => {
    setCurrentUserType(userType)
    // 重置使用次数
    setUsageCount(0)
  }

  const handleSimulation = () => {
    setUsageCount(prev => prev + 1)
  }

  const handleReportGeneration = () => {
    setUsageCount(prev => prev + 1)
  }

  const getUserTypeDisplayName = (userType: UserType) => {
    switch (userType) {
      case UserType.FREE:
        return '免费用户'
      case UserType.PERSONAL:
        return '个人版'
      case UserType.ADVANCED:
        return '进阶版'
      case UserType.PROFESSIONAL:
        return '专业版'
      case UserType.ENTERPRISE:
        return '企业版'
      default:
        return '未知用户类型'
    }
  }

  const getUserTypeColor = (userType: UserType) => {
    switch (userType) {
      case UserType.FREE:
        return 'bg-yellow-100 text-yellow-800'
      case UserType.PERSONAL:
        return 'bg-blue-100 text-blue-800'
      case UserType.ADVANCED:
        return 'bg-purple-100 text-purple-800'
      case UserType.PROFESSIONAL:
        return 'bg-indigo-100 text-indigo-800'
      case UserType.ENTERPRISE:
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <ChartBarIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">投资分析工具 MVP</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* 用户类型选择器 */}
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5 text-gray-500" />
                <select
                  value={currentUserType}
                  onChange={(e) => handleUserTypeChange(e.target.value as UserType)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value={UserType.FREE}>免费用户</option>
                  <option value={UserType.PERSONAL}>个人版</option>
                  <option value={UserType.ADVANCED}>进阶版</option>
                  <option value={UserType.PROFESSIONAL}>专业版</option>
                  <option value={UserType.ENTERPRISE}>企业版</option>
                </select>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(currentUserType)}`}>
                {getUserTypeDisplayName(currentUserType)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 功能演示区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 投资模拟 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ChartBarIcon className="w-6 h-6 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900">投资模拟</h2>
            </div>
            
            <FeatureLimit 
              userType={currentUserType} 
              feature="simulation" 
              currentUsage={usageCount} 
            />
            
            <div className="space-y-4">
              <p className="text-gray-600">
                运行投资组合模拟，分析不同市场环境下的资产表现
              </p>
              
              <button
                onClick={handleSimulation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                运行模拟
              </button>
              
              <div className="text-sm text-gray-500">
                本月已使用: {usageCount} 次
              </div>
            </div>
          </div>

          {/* 报告生成 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <DocumentTextIcon className="w-6 h-6 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900">报告生成</h2>
            </div>
            
            <FeatureLimit 
              userType={currentUserType} 
              feature="report" 
              currentUsage={usageCount} 
            />
            
            <div className="space-y-4">
              <p className="text-gray-600">
                生成专业的投资分析报告，包含图表和建议
              </p>
              
              <button
                onClick={handleReportGeneration}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                生成报告
              </button>
              
              <div className="text-sm text-gray-500">
                本月已使用: {usageCount} 次
              </div>
            </div>
          </div>
        </div>

        {/* PDF导出功能 */}
        <div className="mb-8">
          <PDFExporter
            userType={currentUserType}
            reportData={{ type: 'demo', timestamp: new Date() }}
            reportType="simulation"
          />
        </div>

        {/* 媒体资源管理 */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <StarIcon className="w-6 h-6 text-yellow-500" />
              <h2 className="text-lg font-semibold text-gray-900">媒体资源管理</h2>
            </div>
            <MediaRegistry />
          </div>
        </div>

        {/* 支付模拟器 */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CogIcon className="w-6 h-6 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900">支付系统</h2>
            </div>
            <PaymentSimulator />
          </div>
        </div>

        {/* 订阅计划 */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <StarIcon className="w-6 h-6 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">订阅计划</h2>
              </div>
              
              <button
                onClick={() => setShowSubscriptionPlans(!showSubscriptionPlans)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                {showSubscriptionPlans ? '隐藏' : '查看'}订阅计划
              </button>
            </div>
            
            {showSubscriptionPlans && (
              <SubscriptionPlans
                currentUserType={currentUserType}
                onPlanSelect={(plan) => {
                  console.log('选择计划:', plan)
                  // 这里应该处理计划选择逻辑
                }}
              />
            )}
          </div>
        </div>

        {/* 功能权限演示 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">功能权限演示</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 基础模拟 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">基础模拟</h3>
              <FeatureGate feature="basic_simulation" userType={currentUserType}>
                <div className="text-green-600 text-sm">✓ 可用</div>
              </FeatureGate>
            </div>

            {/* PDF导出 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">PDF导出</h3>
              <FeatureGate feature="pdf_export" userType={currentUserType}>
                <div className="text-green-600 text-sm">✓ 可用</div>
              </FeatureGate>
            </div>

            {/* AI建议 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">AI建议</h3>
              <FeatureGate feature="ai_advice" userType={currentUserType}>
                <div className="text-green-600 text-sm">✓ 可用</div>
              </FeatureGate>
            </div>

            {/* 历史回测 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">历史回测</h3>
              <FeatureGate feature="historical_backtest" userType={currentUserType}>
                <div className="text-green-600 text-sm">✓ 可用</div>
              </FeatureGate>
            </div>

            {/* 客户管理 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">客户管理</h3>
              <FeatureGate feature="client_management" userType={currentUserType}>
                <div className="text-green-600 text-sm">✓ 可用</div>
              </FeatureGate>
            </div>

            {/* API访问 */}
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">API访问</h3>
              <FeatureGate feature="api_access" userType={currentUserType}>
                <div className="text-green-600 text-sm">✓ 可用</div>
              </FeatureGate>
            </div>
          </div>
        </div>

        {/* 使用统计 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">使用统计</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{usageCount}</div>
              <div className="text-sm text-gray-600">本月使用次数</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {currentUserType === UserType.FREE ? '3' : 
                 currentUserType === UserType.PERSONAL ? '10' : '∞'}
              </div>
              <div className="text-sm text-gray-600">月度限制</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {currentUserType === UserType.FREE ? 
                 Math.max(0, 3 - usageCount) :
                 currentUserType === UserType.PERSONAL ? 
                 Math.max(0, 10 - usageCount) : '∞'}
              </div>
              <div className="text-sm text-gray-600">剩余次数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
