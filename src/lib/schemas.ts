/**
 * Zod 数据校验 Schemas
 * 
 * @author @eclipsecybertitan
 * @description 统一前后端数据验证的 Zod schemas
 * @version 1.0.0
 * @lastModified 2024-08-19
 */

import { z } from 'zod'

// 资产输入校验
export const AssetInputSchema = z.object({
  realEstateValue: z.number()
    .positive('房产估值必须为正数')
    .max(1000000000, '房产估值不能超过10亿美元'),
  equityValue: z.number()
    .positive('股票估值必须为正数')
    .max(1000000000, '股票估值不能超过10亿美元'),
  cashValue: z.number()
    .positive('现金估值必须为正数')
    .max(1000000000, '现金估值不能超过10亿美元'),
  currency: z.literal('USD').default('USD')
})

// 情景计算结果校验
export const SimulationResultSchema = z.object({
  scenario25: z.object({
    realEstate: z.number(),
    equity: z.number(),
    cash: z.number()
  }),
  scenario50: z.object({
    realEstate: z.number(),
    equity: z.number(),
    cash: z.number()
  }),
  totalNetWorth: z.object({
    current: z.number(),
    scenario25: z.number(),
    scenario50: z.number()
  }),
  recommendations: z.array(z.string())
})

// 支付请求校验
export const PaymentRequestSchema = z.object({
  assetInput: AssetInputSchema,
  simulationResult: SimulationResultSchema,
  paymentMethod: z.enum(['stripe', 'coinbase', 'nowpayments']),
  currency: z.enum(['USD', 'USDC', 'ETH', 'BTC', 'USDT']).default('USD')
})

// 支付状态校验
export const PaymentStatusSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'completed', 'failed', 'cancelled']),
  amount: z.number(),
  currency: z.string(),
  paymentMethod: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// AI 建议请求校验
export const AIAdviceRequestSchema = z.object({
  assetInput: AssetInputSchema,
  simulationResult: SimulationResultSchema,
  userContext: z.object({
    riskTolerance: z.enum(['low', 'medium', 'high']).optional(),
    investmentHorizon: z.enum(['short', 'medium', 'long']).optional(),
    goals: z.array(z.string()).optional()
  }).optional()
})

// AI 建议响应校验
export const AIAdviceResponseSchema = z.object({
  advice: z.string(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  disclaimer: z.string(),
  generatedAt: z.string().datetime()
})

// 用户会话校验
export const UserSessionSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  entitlements: z.object({
    pro: z.boolean().default(false),
    reportAccess: z.boolean().default(false)
  }).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

// 报告生成请求校验
export const ReportGenerationSchema = z.object({
  assetInput: AssetInputSchema,
  simulationResult: SimulationResultSchema,
  aiAdvice: AIAdviceResponseSchema.optional(),
  userId: z.string(),
  paymentId: z.string()
})

// 报告下载校验
export const ReportDownloadSchema = z.object({
  reportId: z.string(),
  userId: z.string(),
  downloadToken: z.string(),
  expiresAt: z.string().datetime()
})

// API 响应通用格式
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
  timestamp: z.string().datetime().default(() => new Date().toISOString())
})

// 错误响应格式
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  code: z.string().optional(),
  details: z.unknown().optional(),
  timestamp: z.string().datetime().default(() => new Date().toISOString())
})

// 成功响应格式
export const SuccessResponseSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
  message: z.string().optional(),
  timestamp: z.string().datetime().default(() => new Date().toISOString())
})

// 导出类型定义
export type AssetInput = z.infer<typeof AssetInputSchema>
export type SimulationResult = z.infer<typeof SimulationResultSchema>
export type PaymentRequest = z.infer<typeof PaymentRequestSchema>
export type PaymentStatus = z.infer<typeof PaymentStatusSchema>
export type AIAdviceRequest = z.infer<typeof AIAdviceRequestSchema>
export type AIAdviceResponse = z.infer<typeof AIAdviceResponseSchema>
export type UserSession = z.infer<typeof UserSessionSchema>
export type ReportGeneration = z.infer<typeof ReportGenerationSchema>
export type ReportDownload = z.infer<typeof ReportDownloadSchema>
export type ApiResponse = z.infer<typeof ApiResponseSchema>
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>

// 开发者签名: @eclipsecybertitan 