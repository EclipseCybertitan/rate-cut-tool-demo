import { supabase } from './supabase'

// 资产数据记录接口
export interface AssetDataRecord {
  id?: string
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
  created_at?: string
}

// 资产数据记录服务
export class AssetRecordingService {
  // 记录资产数据到Supabase
  static async recordAssetData(record: Omit<AssetDataRecord, 'id' | 'created_at'>): Promise<AssetDataRecord | null> {
    try {
      const { data, error } = await supabase
        .from('asset_records')
        .insert([record])
        .select()
        .single()

      if (error) {
        console.error('Failed to record asset data to Supabase:', error)
        return null
      }

      console.log('Asset data recorded to Supabase:', data)
      return data
    } catch (error) {
      console.error('Error recording asset data:', error)
      return null
    }
  }

  // 获取用户的资产数据记录
  static async getUserAssetRecords(userId: string, limit: number = 50): Promise<AssetDataRecord[]> {
    try {
      const { data, error } = await supabase
        .from('asset_records')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Failed to fetch user asset records:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching user asset records:', error)
      return []
    }
  }

  // 获取会话的资产数据记录
  static async getSessionAssetRecords(sessionId: string): Promise<AssetDataRecord[]> {
    try {
      const { data, error } = await supabase
        .from('asset_records')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch session asset records:', error)
        return []
      }

      return data || []
    } catch (error) {
      console.error('Error fetching session asset records:', error)
      return []
    }
  }

  // 更新资产数据记录
  static async updateAssetData(recordId: string, updates: Partial<AssetDataRecord>): Promise<AssetDataRecord | null> {
    try {
      const { data, error } = await supabase
        .from('asset_records')
        .update(updates)
        .eq('id', recordId)
        .select()
        .single()

      if (error) {
        console.error('Failed to update asset data:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error updating asset data:', error)
      return null
    }
  }

  // 删除资产数据记录
  static async deleteAssetData(recordId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('asset_records')
        .delete()
        .eq('id', recordId)

      if (error) {
        console.error('Failed to delete asset data:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error deleting asset data:', error)
      return false
    }
  }

  // 获取资产数据统计
  static async getAssetDataStats(userId?: string): Promise<{
    totalRecords: number
    totalAssets: number
    averageAssets: number
    mostRecentRecord?: AssetDataRecord
  }> {
    try {
      let query = supabase
        .from('asset_records')
        .select('*')

      if (userId) {
        query = query.eq('user_id', userId)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch asset data stats:', error)
        return { totalRecords: 0, totalAssets: 0, averageAssets: 0 }
      }

      const records = data || []
      const totalRecords = records.length
      const totalAssets = records.reduce((sum, record) => sum + record.total_assets, 0)
      const averageAssets = totalRecords > 0 ? totalAssets / totalRecords : 0
      const mostRecentRecord = records[0]

      return {
        totalRecords,
        totalAssets,
        averageAssets,
        mostRecentRecord
      }
    } catch (error) {
      console.error('Error fetching asset data stats:', error)
      return { totalRecords: 0, totalAssets: 0, averageAssets: 0 }
    }
  }
}

// 导出默认实例
export default AssetRecordingService
