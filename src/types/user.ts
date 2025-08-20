/**
 * 用户类型和权限系统
 * 支持多层级用户服务与功能访问控制
 * @author @eclipsecybertitan
 */

export enum UserType {
  FREE = 'free',           // 免费用户
  PERSONAL = 'personal',   // 个人投资者
  ADVANCED = 'advanced',   // 进阶用户
  PROFESSIONAL = 'professional', // 专业理财顾问
  ENTERPRISE = 'enterprise' // 金融机构/B2B
}

export enum SubscriptionPlan {
  FREE = 'free',
  PERSONAL_PAY_PER_USE = 'personal_pay_per_use',
  ADVANCED_MONTHLY = 'advanced_monthly',
  ADVANCED_YEARLY = 'advanced_yearly',
  PROFESSIONAL_MONTHLY = 'professional_monthly',
  PROFESSIONAL_YEARLY = 'professional_yearly',
  ENTERPRISE_CUSTOM = 'enterprise_custom'
}

export interface UserProfile {
  id: string
  email: string
  name: string
  userType: UserType
  subscriptionPlan: SubscriptionPlan
  subscriptionStatus: 'active' | 'expired' | 'cancelled' | 'pending'
  subscriptionExpiresAt?: Date
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
  usageCount: number
  maxUsageCount: number
  features: string[]
  preferences: UserPreferences
}

export interface UserPreferences {
  theme: 'dusk' | 'day' | 'dawn'
  language: 'zh' | 'en'
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  defaultRiskLevel: 'low' | 'medium' | 'high'
  defaultTimeHorizon: 'short' | 'medium' | 'long'
}

export interface SubscriptionDetails {
  plan: SubscriptionPlan
  price: number
  currency: 'USD' | 'CNY'
  billingCycle: 'monthly' | 'yearly' | 'pay_per_use'
  features: string[]
  limits: {
    maxReportsPerMonth: number
    maxPortfolios: number
    maxHistoricalData: number
    apiCallsPerDay: number
  }
  benefits: string[]
}

export interface UsageMetrics {
  reportsGenerated: number
  simulationsRun: number
  apiCalls: number
  storageUsed: number
  lastResetDate: Date
}

// 功能权限配置
export const FEATURE_PERMISSIONS = {
  [UserType.FREE]: {
    maxSimulationsPerMonth: 3,
    maxReportsPerMonth: 1,
    features: ['basic_simulation', 'basic_report'],
    canExportPDF: false,
    canAccessAPI: false,
    canUseAdvancedFeatures: false
  },
  [UserType.PERSONAL]: {
    maxSimulationsPerMonth: 10,
    maxReportsPerMonth: 5,
    features: ['basic_simulation', 'basic_report', 'pdf_export', 'basic_ai_advice'],
    canExportPDF: true,
    canAccessAPI: false,
    canUseAdvancedFeatures: false
  },
  [UserType.ADVANCED]: {
    maxSimulationsPerMonth: -1, // 无限制
    maxReportsPerMonth: -1,
    features: ['unlimited_simulation', 'unlimited_reports', 'pdf_export', 'ai_advice', 'historical_backtest', 'personalized_advice'],
    canExportPDF: true,
    canAccessAPI: false,
    canUseAdvancedFeatures: true
  },
  [UserType.PROFESSIONAL]: {
    maxSimulationsPerMonth: -1,
    maxReportsPerMonth: -1,
    features: ['unlimited_simulation', 'unlimited_reports', 'pdf_export', 'ai_advisor', 'client_management', 'white_label_reports', 'batch_processing'],
    canExportPDF: true,
    canAccessAPI: true,
    canUseAdvancedFeatures: true
  },
  [UserType.ENTERPRISE]: {
    maxSimulationsPerMonth: -1,
    maxReportsPerMonth: -1,
    features: ['unlimited_simulation', 'unlimited_reports', 'pdf_export', 'ai_advisor', 'client_management', 'white_label_reports', 'batch_processing', 'api_integration', 'custom_deployment', 'dedicated_support'],
    canExportPDF: true,
    canAccessAPI: true,
    canUseAdvancedFeatures: true
  }
} as const

// 订阅计划配置
export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, SubscriptionDetails> = {
  [SubscriptionPlan.FREE]: {
    plan: SubscriptionPlan.FREE,
    price: 0,
    currency: 'USD',
    billingCycle: 'monthly',
    features: ['基础模拟', '基础报告'],
    limits: {
      maxReportsPerMonth: 1,
      maxPortfolios: 1,
      maxHistoricalData: 6,
      apiCallsPerDay: 0
    },
    benefits: ['免费使用基础功能', '每月1次报告生成']
  },
  [SubscriptionPlan.PERSONAL_PAY_PER_USE]: {
    plan: SubscriptionPlan.PERSONAL_PAY_PER_USE,
    price: 7.99,
    currency: 'USD',
    billingCycle: 'pay_per_use',
    features: ['基础模拟', '基础报告', 'PDF导出', 'AI建议'],
    limits: {
      maxReportsPerMonth: 5,
      maxPortfolios: 3,
      maxHistoricalData: 12,
      apiCallsPerDay: 0
    },
    benefits: ['按次付费', 'PDF报告导出', '基础AI投资建议']
  },
  [SubscriptionPlan.ADVANCED_MONTHLY]: {
    plan: SubscriptionPlan.ADVANCED_MONTHLY,
    price: 24.99,
    currency: 'USD',
    billingCycle: 'monthly',
    features: ['无限模拟', '无限报告', 'PDF导出', 'AI建议', '历史回测', '个性化建议'],
    limits: {
      maxReportsPerMonth: -1,
      maxPortfolios: 10,
      maxHistoricalData: 60,
      apiCallsPerDay: 0
    },
    benefits: ['无限次使用', '高级分析功能', '个性化投资建议', '历史数据回测']
  },
  [SubscriptionPlan.ADVANCED_YEARLY]: {
    plan: SubscriptionPlan.ADVANCED_YEARLY,
    price: 249.99,
    currency: 'USD',
    billingCycle: 'yearly',
    features: ['无限模拟', '无限报告', 'PDF导出', 'AI建议', '历史回测', '个性化建议'],
    limits: {
      maxReportsPerMonth: -1,
      maxPortfolios: 10,
      maxHistoricalData: 60,
      apiCallsPerDay: 0
    },
    benefits: ['年付优惠17%', '无限次使用', '高级分析功能', '个性化投资建议']
  },
  [SubscriptionPlan.PROFESSIONAL_MONTHLY]: {
    plan: SubscriptionPlan.PROFESSIONAL_MONTHLY,
    price: 149.99,
    currency: 'USD',
    billingCycle: 'monthly',
    features: ['无限模拟', '无限报告', 'PDF导出', 'AI顾问', '客户管理', '白标报告', '批量处理', 'API访问'],
    limits: {
      maxReportsPerMonth: -1,
      maxPortfolios: 100,
      maxHistoricalData: 120,
      apiCallsPerDay: 1000
    },
    benefits: ['专业级功能', '客户资产管理', '白标报告生成', 'API接口访问', '批量处理能力']
  },
  [SubscriptionPlan.PROFESSIONAL_YEARLY]: {
    plan: SubscriptionPlan.PROFESSIONAL_YEARLY,
    price: 1499.99,
    currency: 'USD',
    billingCycle: 'yearly',
    features: ['无限模拟', '无限报告', 'PDF导出', 'AI顾问', '客户管理', '白标报告', '批量处理', 'API访问'],
    limits: {
      maxReportsPerMonth: -1,
      maxPortfolios: 100,
      maxHistoricalData: 120,
      apiCallsPerDay: 1000
    },
    benefits: ['年付优惠17%', '专业级功能', '客户资产管理', '白标报告生成', 'API接口访问']
  },
  [SubscriptionPlan.ENTERPRISE_CUSTOM]: {
    plan: SubscriptionPlan.ENTERPRISE_CUSTOM,
    price: 25000,
    currency: 'USD',
    billingCycle: 'yearly',
    features: ['无限模拟', '无限报告', 'PDF导出', 'AI顾问', '客户管理', '白标报告', '批量处理', 'API访问', '定制化部署', '专属支持'],
    limits: {
      maxReportsPerMonth: -1,
      maxPortfolios: -1,
      maxHistoricalData: -1,
      apiCallsPerDay: -1
    },
    benefits: ['企业级定制', '私有部署', '专属技术支持', '定制化功能开发', 'SLA保障']
  }
}

// 权限检查工具函数
export function canUserAccessFeature(userType: UserType, feature: string): boolean {
  const permissions = FEATURE_PERMISSIONS[userType]
  return (permissions.features as readonly string[]).includes(feature)
}

export function getUserLimits(userType: UserType) {
  return FEATURE_PERMISSIONS[userType]
}

export function canUserExportPDF(userType: UserType): boolean {
  return FEATURE_PERMISSIONS[userType].canExportPDF
}

export function canUserAccessAPI(userType: UserType): boolean {
  return FEATURE_PERMISSIONS[userType].canAccessAPI
}

export function canUserUseAdvancedFeatures(userType: UserType): boolean {
  return FEATURE_PERMISSIONS[userType].canUseAdvancedFeatures
}
