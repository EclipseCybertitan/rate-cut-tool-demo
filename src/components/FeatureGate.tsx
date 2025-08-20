/**
 * 功能访问控制组件
 * 根据用户权限控制功能显示和访问
 * @author @eclipsecybertitan
 */

import { ReactNode } from 'react'
import { LockClosedIcon, StarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { UserType, canUserAccessFeature, getUserLimits } from '../types/user'

interface FeatureGateProps {
  feature: string
  userType: UserType
  children: ReactNode
  fallback?: ReactNode
  showUpgradePrompt?: boolean
}

interface UpgradePromptProps {
  currentUserType: UserType
  requiredUserType: UserType
  feature: string
}

function UpgradePrompt({ currentUserType, requiredUserType }: UpgradePromptProps) {
  const getUserTypeName = (userType: UserType) => {
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

  const getUpgradeIcon = (userType: UserType) => {
    switch (userType) {
      case UserType.PERSONAL:
        return <StarIcon className="w-5 h-5 text-blue-500" />
      case UserType.ADVANCED:
        return <StarIcon className="w-5 h-5 text-purple-500" />
      case UserType.PROFESSIONAL:
        return <BuildingOfficeIcon className="w-5 h-5 text-indigo-500" />
      case UserType.ENTERPRISE:
        return <BuildingOfficeIcon className="w-5 h-5 text-gray-800" />
      default:
        return <StarIcon className="w-5 h-5 text-gray-400" />
    }
  }

  const getUpgradeMessage = () => {
    if (requiredUserType === UserType.PERSONAL) {
      return '升级到个人版即可使用此功能'
    } else if (requiredUserType === UserType.ADVANCED) {
      return '升级到进阶版即可使用此功能'
    } else if (requiredUserType === UserType.PROFESSIONAL) {
      return '升级到专业版即可使用此功能'
    } else if (requiredUserType === UserType.ENTERPRISE) {
      return '联系销售团队获取企业级解决方案'
    }
    return '升级您的账户即可使用此功能'
  }

  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-3">
        {getUpgradeIcon(requiredUserType)}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        功能受限
      </h3>
      <p className="text-gray-600 mb-4">
        {getUpgradeMessage()}
      </p>
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
        <span>当前: {getUserTypeName(currentUserType)}</span>
        <span>→</span>
        <span className="font-medium text-blue-600">
          {getUserTypeName(requiredUserType)}
        </span>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
        升级账户
      </button>
    </div>
  )
}

export default function FeatureGate({ 
  feature, 
  userType, 
  children, 
  fallback,
  showUpgradePrompt = true 
}: FeatureGateProps) {
  const hasAccess = canUserAccessFeature(userType, feature)
  
  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  if (showUpgradePrompt) {
    // 确定需要的最低用户类型
    let requiredUserType = UserType.FREE
    
    if (feature.includes('pdf_export') || feature.includes('basic_ai_advice')) {
      requiredUserType = UserType.PERSONAL
    } else if (feature.includes('ai_advice') || feature.includes('historical_backtest') || feature.includes('personalized_advice')) {
      requiredUserType = UserType.ADVANCED
    } else if (feature.includes('ai_advisor') || feature.includes('client_management') || feature.includes('white_label_reports') || feature.includes('batch_processing')) {
      requiredUserType = UserType.PROFESSIONAL
    } else if (feature.includes('api_integration') || feature.includes('custom_deployment') || feature.includes('dedicated_support')) {
      requiredUserType = UserType.ENTERPRISE
    }

    return (
      <UpgradePrompt
        currentUserType={userType}
        requiredUserType={requiredUserType}
        feature={feature}
      />
    )
  }

  return null
}

// 便捷的权限检查Hook
export function useFeatureAccess(feature: string, userType: UserType) {
  const hasAccess = canUserAccessFeature(userType, feature)
  const limits = getUserLimits(userType)
  
  return {
    hasAccess,
    limits,
    canAccessFeature: (featureName: string) => canUserAccessFeature(userType, featureName)
  }
}

// 功能限制提示组件
interface FeatureLimitProps {
  userType: UserType
  feature: string
  currentUsage: number
}

export function FeatureLimit({ userType, feature, currentUsage }: FeatureLimitProps) {
  const limits = getUserLimits(userType)
  
  if (limits.maxSimulationsPerMonth === -1 && limits.maxReportsPerMonth === -1) {
    return null // 无限制用户
  }

  const getLimitForFeature = () => {
    if (feature.includes('simulation')) {
      return limits.maxSimulationsPerMonth
    } else if (feature.includes('report')) {
      return limits.maxReportsPerMonth
    }
    return -1
  }

  const limit = getLimitForFeature()
  
  if (limit === -1) {
    return null
  }

  const usagePercentage = (currentUsage / limit) * 100
  const isNearLimit = usagePercentage >= 80
  const isAtLimit = usagePercentage >= 100

  if (isAtLimit) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <LockClosedIcon className="w-5 h-5 text-red-500 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-red-800">
              使用次数已达上限
            </h4>
            <p className="text-sm text-red-600">
              您本月已使用 {currentUsage} 次，达到 {limit} 次限制
            </p>
          </div>
        </div>
        <button className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          升级账户
        </button>
      </div>
    )
  }

  if (isNearLimit) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <div className="flex items-center">
          <LockClosedIcon className="w-5 h-5 text-yellow-500 mr-2" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">
              使用次数即将达到上限
            </h4>
            <p className="text-sm text-yellow-600">
              您本月已使用 {currentUsage} 次，剩余 {limit - currentUsage} 次
            </p>
          </div>
        </div>
        <div className="mt-3 w-full bg-yellow-200 rounded-full h-2">
          <div 
            className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${usagePercentage}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-blue-800">
          使用进度: {currentUsage} / {limit}
        </span>
        <span className="text-blue-600 font-medium">
          {Math.round(usagePercentage)}%
        </span>
      </div>
      <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${usagePercentage}%` }}
        />
      </div>
    </div>
  )
}
