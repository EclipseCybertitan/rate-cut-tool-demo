import { useState, useEffect } from 'react'

interface AIAdviceProps {
  assetInput: {
    realEstate: number
    equity: number
    cash: number
  }
  isUnlocked: boolean
}

interface AdviceItem {
  category: string
  title: string
  description: string
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
}

export default function AIAdvice({ assetInput, isUnlocked }: AIAdviceProps) {
  const [advice, setAdvice] = useState<AdviceItem[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const generateAdvice = async () => {
    setIsGenerating(true)
    
    // 模拟 AI 分析过程
    setTimeout(() => {
      const mockAdvice: AdviceItem[] = [
        {
          category: '房产配置',
          title: '适度增持房产',
          description: '基于当前降息预期，房产估值有望提升。建议保持当前配置比例，关注利率敏感型房产。',
          impact: 'positive',
          confidence: 0.75
        },
        {
          category: '股票配置',
          title: '增持成长股',
          description: '降息环境有利于成长股表现，建议适当增加科技和消费类股票配置。',
          impact: 'positive',
          confidence: 0.68
        },
        {
          category: '现金管理',
          title: '减少现金持有',
          description: '降息环境下现金收益率下降，建议将部分现金配置到收益型资产。',
          impact: 'negative',
          confidence: 0.82
        }
      ]
      
      setAdvice(mockAdvice)
      setIsGenerating(false)
    }, 3000)
  }

  useEffect(() => {
    if (isUnlocked && assetInput.realEstate + assetInput.equity + assetInput.cash > 0) {
      generateAdvice()
    }
  }, [isUnlocked, assetInput])

  if (!isUnlocked) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI 投资建议</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-gray-600 mb-4">解锁完整功能以获取 AI 投资建议</p>
          <p className="text-sm text-gray-500">基于您的资产配置，AI 将提供个性化的投资策略建议</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🤖 AI 投资建议</h2>
      
      {isGenerating ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">AI 正在分析您的资产配置...</p>
        </div>
      ) : advice.length > 0 ? (
        <div className="space-y-4">
          {advice.map((item, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.impact === 'positive' ? 'bg-green-100 text-green-800' :
                  item.impact === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {item.impact === 'positive' ? '利好' : 
                   item.impact === 'negative' ? '利空' : '中性'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{item.category}</span>
                <span className="text-xs text-gray-500">置信度: {item.confidence * 100}%</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>暂无建议，请先输入资产信息</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-800">
          ⚠️ 免责声明：AI 建议基于历史数据和算法模型，不构成投资建议。
          投资决策请结合个人风险承受能力和市场实际情况。
        </p>
      </div>
    </div>
  )
}
