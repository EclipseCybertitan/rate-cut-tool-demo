/**
 * API响应类型定义
 * @author @eclipsecybertitan
 */

// 标准API响应格式
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  pagination?: PaginationInfo
  timestamp: string
  requestId: string
}

// API错误信息
export interface ApiError {
  code: string
  message: string
  details?: any
  field?: string
  stack?: string
}

// 分页信息
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// 成功响应
export type ApiSuccessResponse<T> = Omit<ApiResponse<T>, 'error'> & {
  success: true
  data: T
}

// 错误响应
export type ApiErrorResponse = Omit<ApiResponse<null>, 'data'> & {
  success: false
  error: ApiError
}

// 用户数据
export interface UserData {
  id: string
  email: string
  name: string
  avatar?: string
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}

// 用户偏好
export interface UserPreferences {
  theme: 'dusk' | 'day' | 'dawn'
  language: 'zh' | 'en'
  notifications: boolean
  currency: string
}

// 资产配置
export interface AssetPortfolio {
  realEstate: number
  equity: number
  cash: number
  fund: number
  crypto: number
  insurance: number
}

// 投资建议
export interface InvestmentAdvice {
  id: string
  userId: string
  portfolio: AssetPortfolio
  recommendations: AssetRecommendation[]
  riskProfile: RiskProfile
  createdAt: string
}

// 资产建议
export interface AssetRecommendation {
  assetType: keyof AssetPortfolio
  currentAllocation: number
  recommendedAllocation: number
  reasoning: string
  confidence: number
  impact: 'positive' | 'negative' | 'neutral'
}

// 风险特征
export interface RiskProfile {
  level: 'low' | 'medium' | 'high'
  score: number
  factors: string[]
  tolerance: number
}

// 支付信息
export interface PaymentInfo {
  id: string
  amount: number
  currency: string
  method: 'credit_card' | 'crypto' | 'apple_pay' | 'google_pay'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  createdAt: string
  completedAt?: string
}

// 开发者签名: @eclipsecybertitan
