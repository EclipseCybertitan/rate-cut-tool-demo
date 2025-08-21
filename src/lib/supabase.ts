import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 类型定义
export interface Portfolio {
  id: string
  user_id: string
  config: any
  created_at: string
}

export interface User {
  id: string
  email: string
  created_at: string
}

export interface AssetRecord {
  id: string
  session_id: string
  user_id?: string
  timestamp: string
  total_assets: number
  asset_allocation: {
    realEstate: number
    equity: number
    cash: number
    fund: number
    crypto: number
    insurance: number
  }
  selected_methodology: string
  selected_risk_level: string
  user_agent?: string
  language: string
  ip_address?: string
  created_at: string
}

// 数据库表类型
export interface Database {
  public: {
    Tables: {
      portfolios: {
        Row: Portfolio
        Insert: Omit<Portfolio, 'id' | 'created_at'>
        Update: Partial<Omit<Portfolio, 'id' | 'created_at'>>
      }
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at'>
        Update: Partial<Omit<User, 'id' | 'created_at'>>
      }
      asset_records: {
        Row: AssetRecord
        Insert: Omit<AssetRecord, 'id' | 'created_at'>
        Update: Partial<Omit<AssetRecord, 'id' | 'created_at'>>
      }
    }
  }
}
