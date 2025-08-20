import { supabase } from '../../lib/supabase'

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'POST') {
      const { email } = req.body
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required field: email' 
        })
      }

      // 检查用户是否已存在
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (existingUser) {
        return res.status(200).json({ success: true, data: existingUser })
      }

      // 创建新用户
      const { data, error } = await supabase
        .from('users')
        .insert([{ email }])
        .select()

      if (error) throw error
      
      return res.status(201).json({ success: true, data: data[0] })
    }

    if (req.method === 'GET') {
      const { email } = req.query
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required field: email' 
        })
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          return res.status(404).json({ 
            success: false, 
            error: 'User not found' 
          })
        }
        throw error
      }
      
      return res.status(200).json({ success: true, data })
    }

    res.setHeader('Allow', ['GET', 'POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err: any) {
    console.error('Users API Error:', err)
    return res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error' 
    })
  }
}
