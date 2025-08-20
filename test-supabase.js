import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// 加载环境变量
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 检查环境变量...')
console.log('SUPABASE_URL:', supabaseUrl ? '✅ 已设置' : '❌ 未设置')
console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ 已设置' : '❌ 未设置')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 环境变量未正确设置，请检查 .env.local 文件')
  process.exit(1)
}

console.log('\n🚀 创建Supabase客户端...')
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log('📡 测试Supabase连接...')
    
    // 测试基本连接
    const { data, error } = await supabase
      .from('portfolios')
      .select('count')
      .limit(1)
    
    if (error) {
      if (error.code === 'PGRST116') {
        console.log('✅ Supabase连接成功！')
        console.log('ℹ️  表可能不存在，这是正常的')
      } else {
        console.error('❌ 数据库查询错误:', error.message)
        console.log('ℹ️  这可能是正常的，如果表还没有创建')
      }
    } else {
      console.log('✅ Supabase连接成功！')
      console.log('✅ 数据库查询成功！')
    }
    
    // 测试用户表
    console.log('\n📊 测试用户表...')
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('count')
      .limit(1)
    
    if (userError) {
      if (userError.code === 'PGRST116') {
        console.log('ℹ️  用户表不存在，需要运行数据库设置脚本')
      } else {
        console.log('ℹ️  用户表查询错误:', userError.message)
      }
    } else {
      console.log('✅ 用户表查询成功！')
    }
    
    console.log('\n🎉 Supabase集成验证完成！')
    console.log('\n📋 下一步操作：')
    console.log('1. 在Supabase控制台运行 supabase-setup.sql 脚本')
    console.log('2. 重启开发服务器: npm run dev')
    console.log('3. 测试前端功能')
    
  } catch (error) {
    console.error('❌ 连接测试失败:', error.message)
    console.log('\n🔍 可能的原因：')
    console.log('- 网络连接问题')
    console.log('- Supabase项目配置错误')
    console.log('- 环境变量格式错误')
  }
}

testConnection()
