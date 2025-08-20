import { useState } from 'react'
import { usePortfolios, createPortfolio, deletePortfolio } from '../hooks/usePortfolios'
import { useUser, createOrGetUser } from '../hooks/useUsers'

interface PortfolioManagerProps {
  userEmail: string
}

export default function PortfolioManager({ userEmail }: PortfolioManagerProps) {
  const [portfolioName, setPortfolioName] = useState('')
  const [portfolioConfig, setPortfolioConfig] = useState('')
  
  // 获取用户信息
  const { user, isLoading: userLoading, mutate: mutateUser } = useUser(userEmail)
  
  // 获取用户的投资组合
  const { portfolios, isLoading: portfoliosLoading, mutate: mutatePortfolios } = usePortfolios(user?.id || '')
  
  // 创建新投资组合
  const handleCreatePortfolio = async () => {
    if (!user?.id || !portfolioName || !portfolioConfig) return
    
    try {
      const config = JSON.parse(portfolioConfig)
      await createPortfolio(user.id, {
        name: portfolioName,
        config,
        timestamp: new Date().toISOString()
      })
      
      // 刷新数据
      mutatePortfolios()
      setPortfolioName('')
      setPortfolioConfig('')
    } catch (error) {
      console.error('Failed to create portfolio:', error)
      alert('创建投资组合失败')
    }
  }
  
  // 更新投资组合 (暂时未使用)
  // const handleUpdatePortfolio = async (id: string, config: any) => {
  //   try {
  //     await updatePortfolio(id, config)
  //     mutatePortfolios()
  //   } catch (error) {
  //     console.error('Failed to update portfolio:', error)
  //     alert('更新投资组合失败')
  //   }
  // }
  
  // 删除投资组合
  const handleDeletePortfolio = async (id: string) => {
    if (!confirm('确定要删除这个投资组合吗？')) return
    
    try {
      await deletePortfolio(id)
      mutatePortfolios()
    } catch (error) {
      console.error('Failed to delete portfolio:', error)
      alert('删除投资组合失败')
    }
  }
  
  // 创建或获取用户
  const handleCreateUser = async () => {
    try {
      await createOrGetUser(userEmail)
      mutateUser()
    } catch (error) {
      console.error('Failed to create user:', error)
      alert('创建用户失败')
    }
  }
  
  if (userLoading) {
    return <div className="text-center p-8">加载用户信息中...</div>
  }
  
  if (!user) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">用户不存在，是否创建新用户？</p>
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          创建用户
        </button>
      </div>
    )
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">投资组合管理</h2>
      
      {/* 创建新投资组合 */}
      <div className="bg-gray-100 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">创建新投资组合</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">投资组合名称</label>
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="输入投资组合名称"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">配置JSON</label>
            <textarea
              value={portfolioConfig}
              onChange={(e) => setPortfolioConfig(e.target.value)}
              className="w-full p-2 border rounded h-32"
              placeholder='{"realEstate": 30, "equity": 50, "cash": 20}'
            />
          </div>
          <button
            onClick={handleCreatePortfolio}
            disabled={!portfolioName || !portfolioConfig}
            className="bg-green-500 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
          >
            创建投资组合
          </button>
        </div>
      </div>
      
      {/* 投资组合列表 */}
      <div>
        <h3 className="text-lg font-semibold mb-4">我的投资组合</h3>
        {portfoliosLoading ? (
          <div className="text-center p-4">加载中...</div>
        ) : portfolios.length === 0 ? (
          <div className="text-center p-4 text-gray-500">暂无投资组合</div>
        ) : (
          <div className="space-y-4">
            {portfolios.map((portfolio: any) => (
              <div key={portfolio.id} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{portfolio.config.name || '未命名'}</h4>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDeletePortfolio(portfolio.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      删除
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  创建时间: {new Date(portfolio.created_at).toLocaleString()}
                </div>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(portfolio.config, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
