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
    }
  }
}
