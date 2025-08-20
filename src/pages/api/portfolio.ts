import { supabase } from '../../lib/supabase'

export default async function handler(req: any, res: any) {
  try {
    if (req.method === 'POST') {
      const { userId, portfolio } = req.body
      
      if (!userId || !portfolio) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: userId and portfolio' 
        })
      }

      const { data, error } = await supabase
        .from('portfolios')
        .insert([{ user_id: userId, config: portfolio }])
        .select()

      if (error) throw error
      
      return res.status(200).json({ success: true, data: data[0] })
    }

    if (req.method === 'GET') {
      const { userId } = req.query
      
      if (!userId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required field: userId' 
        })
      }

      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return res.status(200).json({ success: true, data })
    }

    if (req.method === 'PUT') {
      const { id, portfolio } = req.body
      
      if (!id || !portfolio) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required fields: id and portfolio' 
        })
      }

      const { data, error } = await supabase
        .from('portfolios')
        .update({ config: portfolio })
        .eq('id', id)
        .select()

      if (error) throw error
      
      return res.status(200).json({ success: true, data: data[0] })
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required field: id' 
        })
      }

      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      return res.status(200).json({ success: true, message: 'Portfolio deleted successfully' })
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err: any) {
    console.error('Portfolio API Error:', err)
    return res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error' 
    })
  }
}
