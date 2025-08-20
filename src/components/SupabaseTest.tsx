import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { usePortfolios, createPortfolio } from '../hooks/usePortfolios'
import { useUser, createOrGetUser } from '../hooks/useUsers'

export default function SupabaseTest() {
  const [testEmail, setTestEmail] = useState('test@example.com')
  const [testPortfolio, setTestPortfolio] = useState('{"realEstate": 30, "equity": 50, "cash": 20}')
  const [testResults, setTestResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // 测试用户功能
  const { user, isLoading: userLoading, mutate: mutateUser } = useUser(testEmail)
  
  // 测试投资组合功能
  const { portfolios, isLoading: portfoliosLoading, mutate: mutatePortfolios } = usePortfolios(user?.id || '')

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testSupabaseConnection = async () => {
    setIsLoading(true)
    addTestResult('🔍 开始测试Supabase连接...')
    
    try {
      // 测试基本连接
      const { error } = await supabase
        .from('portfolios')
        .select('count')
        .limit(1)
      
      if (error) {
        if (error.code === 'PGRST116') {
          addTestResult('✅ Supabase连接成功！表不存在（正常）')
        } else {
          addTestResult(`❌ 连接错误: ${error.message}`)
        }
      } else {
        addTestResult('✅ Supabase连接成功！')
      }
    } catch (error: any) {
      addTestResult(`❌ 连接失败: ${error.message}`)
    }
    
    setIsLoading(false)
  }

  const testUserCreation = async () => {
    setIsLoading(true)
    addTestResult('👤 测试用户创建...')
    
    try {
      const result = await createOrGetUser(testEmail)
      addTestResult(`✅ 用户操作成功: ${result.data?.id || '用户已存在'}`)
      mutateUser()
    } catch (error: any) {
      addTestResult(`❌ 用户创建失败: ${error.message}`)
    }
    
    setIsLoading(false)
  }

  const testPortfolioCreation = async () => {
    if (!user?.id) {
      addTestResult('❌ 请先创建用户')
      return
    }
    
    setIsLoading(true)
    addTestResult('💼 测试投资组合创建...')
    
    try {
      const config = JSON.parse(testPortfolio)
      const result = await createPortfolio(user.id, {
        name: '测试投资组合',
        ...config,
        timestamp: new Date().toISOString()
      })
      addTestResult(`✅ 投资组合创建成功: ${result.data?.id}`)
      mutatePortfolios()
    } catch (error: any) {
      addTestResult(`❌ 投资组合创建失败: ${error.message}`)
    }
    
    setIsLoading(false)
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🔧 Supabase 集成测试</h2>
      
      {/* 测试控制面板 */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">测试控制</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">测试邮箱</label>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="输入测试邮箱"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">测试投资组合配置</label>
            <textarea
              value={testPortfolio}
              onChange={(e) => setTestPortfolio(e.target.value)}
              className="w-full p-2 border rounded h-20"
              placeholder='{"realEstate": 30, "equity": 50, "cash": 20}'
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={testSupabaseConnection}
              disabled={isLoading}
              className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              🔍 测试连接
            </button>
            <button
              onClick={testUserCreation}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              👤 测试用户
            </button>
            <button
              onClick={testPortfolioCreation}
              disabled={isLoading || !user?.id}
              className="bg-purple-500 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            >
              💼 测试投资组合
            </button>
            <button
              onClick={clearResults}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              🗑️ 清空结果
            </button>
          </div>
        </div>
      </div>

      {/* 状态显示 */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold mb-2">👤 用户状态</h4>
          {userLoading ? (
            <p className="text-gray-500">加载中...</p>
          ) : user ? (
            <div>
              <p className="text-sm text-gray-600">ID: {user.id}</p>
              <p className="text-sm text-gray-600">邮箱: {user.email}</p>
              <p className="text-sm text-gray-600">创建时间: {new Date(user.created_at).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-gray-500">用户不存在</p>
          )}
        </div>
        
        <div className="bg-white border rounded-lg p-4">
          <h4 className="font-semibold mb-2">💼 投资组合状态</h4>
          {portfoliosLoading ? (
            <p className="text-gray-500">加载中...</p>
          ) : portfolios.length > 0 ? (
            <div>
              <p className="text-sm text-gray-600">数量: {portfolios.length}</p>
              <p className="text-sm text-gray-600">最新: {new Date(portfolios[0].created_at).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-gray-500">暂无投资组合</p>
          )}
        </div>
      </div>

      {/* 测试结果 */}
      <div className="bg-white border rounded-lg p-4">
        <h4 className="font-semibold mb-2">📊 测试结果</h4>
        <div className="max-h-64 overflow-y-auto space-y-1">
          {testResults.length === 0 ? (
            <p className="text-gray-500">暂无测试结果</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      {/* 说明 */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">📋 测试说明</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 测试连接：验证Supabase基本连接</li>
          <li>• 测试用户：创建或获取测试用户</li>
          <li>• 测试投资组合：创建测试投资组合</li>
          <li>• 如果表不存在，请先在Supabase控制台运行 supabase-setup.sql</li>
        </ul>
      </div>
    </div>
  )
}
