import React, { useState } from 'react'

interface InvestmentMethodologyProps {
  onMethodologySelect: (methodology: string) => void
  onRiskLevelSelect: (riskLevel: string) => void
}

const InvestmentMethodology: React.FC<InvestmentMethodologyProps> = ({
  onMethodologySelect,
  onRiskLevelSelect
}) => {
  const [selectedMethodology, setSelectedMethodology] = useState<string>('')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('')
  const [hoveredMethodology, setHoveredMethodology] = useState<string>('')

  const methodologies = [
    {
      id: 'academic',
      name: '学院派',
      description: '基于经典经济学理论和学术研究的投资方法',
      longDescription: '学院派投资理念源于现代投资组合理论，强调资产配置的多样化和风险分散。这种方法基于马科维茨的均值-方差分析，通过数学模型优化投资组合，追求在给定风险水平下的最大收益。学院派投资者通常采用被动投资策略，如指数基金投资，并相信市场有效性假说。',
      image: '/assets/images/philosophy/textbook.png',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'practical',
      name: '商业实战派',
      description: '结合市场实战经验和商业直觉的投资策略',
      longDescription: '商业实战派投资理念强调市场洞察力和实战经验，结合宏观经济分析、行业趋势判断和公司基本面研究。这种方法重视市场时机选择，善于捕捉市场情绪变化和突发事件带来的投资机会。商业实战派投资者通常具有丰富的市场经验，能够快速适应市场变化并做出相应调整。',
      image: '/assets/images/philosophy/wallstreet.png',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'psychohistory',
      name: '心理史学派',
      description: '运用心理学和群体行为分析的投资哲学',
      longDescription: '心理史学派投资理念基于行为金融学理论，认为市场参与者的心理状态和群体行为是影响资产价格的关键因素。这种方法通过分析市场情绪、投资者心理偏差和群体行为模式来预测市场走势。心理史学派投资者善于识别市场恐慌和贪婪情绪，并利用这些情绪波动进行逆向投资。',
      image: '/assets/images/philosophy/psychohistory.png',
      color: 'from-red-500 to-pink-600'
    }
  ]

  const riskLevels = [
    {
      level: 'low',
      name: '低风险',
      description: '保守稳健，追求稳定收益',
      logic: '低风险投资逻辑强调资本保值和稳定收益，主要投资于国债、高等级企业债、货币市场基金等低风险资产。投资组合中固定收益类资产占比通常在70%以上，股票类资产占比不超过30%。适合风险承受能力较低、投资期限较短的投资者。'
    },
    {
      level: 'medium',
      name: '中风险',
      description: '平衡配置，兼顾收益与风险',
      logic: '中风险投资逻辑追求收益与风险的平衡，投资组合中股票类资产占比在40-60%之间，其余为固定收益类资产。这种配置既能获得股票市场的长期增长潜力，又能通过债券投资降低整体风险。适合有一定风险承受能力、投资期限在3-5年的投资者。'
    },
    {
      level: 'high',
      name: '高风险',
      description: '积极进取，追求高收益',
      logic: '高风险投资逻辑追求最大化收益，投资组合中股票类资产占比通常在70%以上，可能还包括商品、房地产信托等另类投资。这种配置能够充分享受经济增长和股票市场的上涨收益，但同时也面临较大的市场波动风险。适合风险承受能力强、投资期限在5年以上的投资者。'
    }
  ]

  const handleMethodologySelect = (methodology: string) => {
    setSelectedMethodology(methodology)
    onMethodologySelect(methodology)
  }

  const handleRiskLevelSelect = (riskLevel: string) => {
    setSelectedRiskLevel(riskLevel)
    onRiskLevelSelect(riskLevel)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            选择您的投资哲学
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            不同的投资理念将引导您走向不同的财富之路
          </p>
        </div>

        {/* 投资哲学选择区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {methodologies.map((methodology) => (
            <div
              key={methodology.id}
              className={`relative group cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                selectedMethodology === methodology.id ? 'ring-4 ring-cyan-400 ring-opacity-50' : ''
              }`}
              onMouseEnter={() => setHoveredMethodology(methodology.id)}
              onMouseLeave={() => setHoveredMethodology('')}
              onClick={() => handleMethodologySelect(methodology.id)}
            >
              {/* 闪光边框效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              {/* 卡片主体 */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300">
                {/* 图片区域 - 扑克牌比例 */}
                <div className="aspect-[3/4] mb-6 overflow-hidden rounded-xl">
                  <img
                    src={methodology.image}
                    alt={methodology.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* 标题和描述 */}
                <h3 className="text-2xl font-bold text-white mb-3">{methodology.name}</h3>
                <p className="text-gray-300 mb-4">{methodology.description}</p>
                
                {/* 动态浮现的详细描述 */}
                <div className={`transition-all duration-500 overflow-hidden ${
                  hoveredMethodology === methodology.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {methodology.longDescription}
                  </p>
                </div>
                
                {/* 选择指示器 */}
                {selectedMethodology === methodology.id && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 风险等级选择区域 */}
        {selectedMethodology && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              选择您的风险承受能力
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {riskLevels.map((risk) => (
                <div
                  key={risk.level}
                  className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedRiskLevel === risk.level ? 'ring-2 ring-cyan-400' : ''
                  }`}
                  onClick={() => handleRiskLevelSelect(risk.level)}
                >
                  <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-6 border border-gray-600 hover:border-cyan-400 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white mb-3">{risk.name}</h3>
                    <p className="text-gray-300 mb-4">{risk.description}</p>
                    
                    {/* 投资逻辑描述 */}
                    <div className="text-sm text-gray-400 leading-relaxed">
                      {risk.logic}
                    </div>
                    
                    {/* 选择指示器 */}
                    {selectedRiskLevel === risk.level && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 继续按钮 */}
        {selectedMethodology && selectedRiskLevel && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
              继续下一步
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvestmentMethodology
