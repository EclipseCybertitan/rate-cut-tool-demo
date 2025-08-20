/**
 * API类型定义
 * 遵循RULES.md规范：ApiResponse<T>、Zod校验、ErrorCode枚举
 * @author @eclipsecybertitan
 */

import { z } from 'zod'

// 错误代码枚举
export enum ErrorCode {
  // 验证错误
  ERR_VALIDATION = 'ERR_VALIDATION',
  ERR_INVALID_INPUT = 'ERR_INVALID_INPUT',
  
  // 认证错误
  ERR_UNAUTHORIZED = 'ERR_UNAUTHORIZED',
  ERR_FORBIDDEN = 'ERR_FORBIDDEN',
  
  // 业务错误
  ERR_PAYMENT_FAILED = 'ERR_PAYMENT_FAILED',
  ERR_INSUFFICIENT_FUNDS = 'ERR_INSUFFICIENT_FUNDS',
  ERR_ASSET_NOT_FOUND = 'ERR_ASSET_NOT_FOUND',
  ERR_SIMULATION_FAILED = 'ERR_SIMULATION_FAILED',
  
  // 系统错误
  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER',
  ERR_SERVICE_UNAVAILABLE = 'ERR_SERVICE_UNAVAILABLE'
}

// 标准API响应格式
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  meta: {
    timestamp: string
    requestId: string
    version: string
    pagination?: PaginationInfo
  }
}

// API错误信息
export interface ApiError {
  code: ErrorCode
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

// 成功响应类型
export type ApiSuccessResponse<T> = Omit<ApiResponse<T>, 'error'> & {
  success: true
  data: T
}

// 错误响应类型
export type ApiErrorResponse = Omit<ApiResponse<null>, 'data'> & {
  success: false
  error: ApiError
}

// 宏观数据Schema
export const MacroDataSchema = z.object({
  interestRate: z.number().min(-10).max(20),
  inflation: z.number().min(-5).max(50),
  gdpGrowth: z.number().min(-20).max(30),
  marketVolatility: z.number().min(0).max(1),
  blackSwanEvents: z.array(z.object({
    type: z.enum(['financial_crisis', 'pandemic', 'war', 'natural_disaster', 'policy_change']),
    probability: z.number().min(0).max(1),
    impact: z.number().min(-1).max(1),
    duration: z.number().min(1).max(24)
  }))
})

export type MacroData = z.infer<typeof MacroDataSchema>

// 模拟参数Schema
export const SimulationParamsSchema = z.object({
  assets: z.object({
    realEstate: z.number().min(0),
    equity: z.number().min(0),
    cash: z.number().min(0),
    fund: z.number().min(0),
    crypto: z.number().min(0),
    insurance: z.number().min(0)
  }),
  macroData: MacroDataSchema,
  timeHorizon: z.number().min(1).max(60)
})

export type SimulationParams = z.infer<typeof SimulationParamsSchema>

// 支付信息Schema
export const PaymentInfoSchema = z.object({
  id: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  method: z.enum(['credit_card', 'crypto', 'apple_pay', 'google_pay']),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']),
  timestamp: z.string().datetime(),
  transactionHash: z.string().optional()
})

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>

// 媒体资源Schema
export const MediaResourceSchema = z.object({
  id: z.string(),
  type: z.enum(['audio', 'font', 'image']),
  theme: z.enum(['dusk', 'day', 'dawn']),
  url: z.string().url(),
  metadata: z.record(z.any()),
  checksum: z.string(),
  lastModified: z.string().datetime()
})

export type MediaResource = z.infer<typeof MediaResourceSchema>

// 开发者签名: @eclipsecybertitan
