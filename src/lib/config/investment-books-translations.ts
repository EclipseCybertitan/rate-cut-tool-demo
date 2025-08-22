export interface BookTranslations {
  recommendationReason: string
  keyConcepts: string[]
  targetAudience: string
}

export interface BookTranslationsMap {
  [bookId: string]: {
    en: BookTranslations
    zh: BookTranslations
  }
}

// 投资书籍的中英文翻译
export const BOOK_TRANSLATIONS: BookTranslationsMap = {
  'academic_low_1': {
    en: {
      recommendationReason: 'Classic value investing principles, suitable for conservative investors, emphasizing margin of safety and long-term investment',
      keyConcepts: ['Margin of Safety', 'Value Investing', 'Long-term Investment', 'Risk Control'],
      targetAudience: 'Conservative investors seeking stable returns'
    },
    zh: {
      recommendationReason: '价值投资经典，适合保守型投资者，强调安全边际和长期投资',
      keyConcepts: ['安全边际', '价值投资', '长期投资', '风险控制'],
      targetAudience: '保守型投资者，追求稳定回报'
    }
  },
  'academic_low_2': {
    en: {
      recommendationReason: 'Growth stock investment theory, emphasizing company quality and long-term holding',
      keyConcepts: ['Growth Stock Investment', 'Company Quality', 'Long-term Holding', 'Fundamental Analysis'],
      targetAudience: 'Investors seeking stable growth'
    },
    zh: {
      recommendationReason: '成长股投资理论，强调公司质量和长期持有',
      keyConcepts: ['成长股投资', '公司质量', '长期持有', '基本面分析'],
      targetAudience: '追求稳定增长的投资者'
    }
  },
  'academic_low_3': {
    en: {
      recommendationReason: 'Bible of security analysis, systematic investment analysis methodology',
      keyConcepts: ['Security Analysis', 'Financial Statement Analysis', 'Valuation Methods', 'Risk Management'],
      targetAudience: 'Professional investors, analysts'
    },
    zh: {
      recommendationReason: '证券分析圣经，系统性的投资分析方法论',
      keyConcepts: ['证券分析', '财务报表分析', '估值方法', '风险管理'],
      targetAudience: '专业投资者，分析师'
    }
  },
  'academic_low_4': {
    en: {
      recommendationReason: 'Index investing philosophy, low-cost passive investment strategy',
      keyConcepts: ['Index Investing', 'Passive Investment', 'Cost Control', 'Diversification'],
      targetAudience: 'Investors seeking market average returns'
    },
    zh: {
      recommendationReason: '指数投资理念，低成本被动投资策略',
      keyConcepts: ['指数投资', '被动投资', '成本控制', '分散化'],
      targetAudience: '追求市场平均回报的投资者'
    }
  },
  'academic_low_5': {
    en: {
      recommendationReason: 'Efficient market hypothesis, supporting passive investment strategy',
      keyConcepts: ['Efficient Market Hypothesis', 'Random Walk', 'Passive Investment', 'Market Efficiency'],
      targetAudience: 'Investors who believe in market efficiency'
    },
    zh: {
      recommendationReason: '有效市场假说，支持被动投资策略',
      keyConcepts: ['有效市场假说', '随机漫步', '被动投资', '市场效率'],
      targetAudience: '相信市场效率的投资者'
    }
  },
  'academic_medium_1': {
    en: {
      recommendationReason: 'Peter Lynch investment philosophy, how ordinary people can beat the market',
      keyConcepts: ['Stock Picking Strategy', 'Fundamental Analysis', 'Industry Research', 'Investment Opportunity Recognition'],
      targetAudience: 'Individual investors with some investment experience'
    },
    zh: {
      recommendationReason: '彼得林奇投资哲学，普通人也能战胜市场',
      keyConcepts: ['选股策略', '基本面分析', '行业研究', '投资机会识别'],
      targetAudience: '有一定投资经验的个人投资者'
    }
  },
  'academic_medium_2': {
    en: {
      recommendationReason: 'Essence of Warren Buffett investment thinking, practical guide to value investing',
      keyConcepts: ['Value Investing', 'Business Analysis', 'Long-term Thinking', 'Compound Interest Effect'],
      targetAudience: 'Value investors, long-term investors'
    },
    zh: {
      recommendationReason: '巴菲特投资思想精华，价值投资实践指南',
      keyConcepts: ['价值投资', '企业分析', '长期思维', '复利效应'],
      targetAudience: '价值投资者，长期投资者'
    }
  },
  'academic_medium_3': {
    en: {
      recommendationReason: 'Core principles of risk management, key elements for investment success',
      keyConcepts: ['Risk Management', 'Market Cycles', 'Investment Psychology', 'Value Judgment'],
      targetAudience: 'Investors focused on risk control'
    },
    zh: {
      recommendationReason: '风险管理的核心原则，投资成功的关键要素',
      keyConcepts: ['风险管理', '市场周期', '投资心理', '价值判断'],
      targetAudience: '注重风险控制的投资者'
    }
  },
  'academic_medium_4': {
    en: {
      recommendationReason: 'Collection of value investing master interviews, sharing practical experience',
      keyConcepts: ['Value Investing', 'Practical Experience', 'Investment Strategy', 'Case Analysis'],
      targetAudience: 'Practitioners learning value investing'
    },
    zh: {
      recommendationReason: '价值投资大师访谈集，实战经验分享',
      keyConcepts: ['价值投资', '实战经验', '投资策略', '案例分析'],
      targetAudience: '学习价值投资的实践者'
    }
  },
  'academic_medium_5': {
    en: {
      recommendationReason: 'Concentrated investment strategy, low-risk high-return investment method',
      keyConcepts: ['Concentrated Investment', 'Low Risk High Return', 'Investment Opportunities', 'Risk Control'],
      targetAudience: 'Investors seeking high returns'
    },
    zh: {
      recommendationReason: '集中投资策略，低风险高回报的投资方法',
      keyConcepts: ['集中投资', '低风险高回报', '投资机会', '风险控制'],
      targetAudience: '追求高回报的投资者'
    }
  },
  'academic_high_1': {
    en: {
      recommendationReason: 'Black Swan theory, impact and response to extreme risk events',
      keyConcepts: ['Black Swan Events', 'Extreme Risk', 'Uncertainty', 'Risk Modeling'],
      targetAudience: 'Risk management experts, quantitative investors'
    },
    zh: {
      recommendationReason: '黑天鹅理论，极端风险事件的影响和应对',
      keyConcepts: ['黑天鹅事件', '极端风险', '不确定性', '风险建模'],
      targetAudience: '风险管理专家，量化投资者'
    }
  },
  'academic_high_2': {
    en: {
      recommendationReason: 'Role of randomness in investment, avoiding being fooled by randomness',
      keyConcepts: ['Randomness', 'Probabilistic Thinking', 'Risk Perception', 'Investment Psychology'],
      targetAudience: 'Quantitative investors, risk management experts'
    },
    zh: {
      recommendationReason: '随机性在投资中的作用，避免被随机性愚弄',
      keyConcepts: ['随机性', '概率思维', '风险认知', '投资心理'],
      targetAudience: '量化投资者，风险管理专家'
    }
  },
  'academic_high_3': {
    en: {
      recommendationReason: 'History of quantitative investing, application of mathematics in investment',
      keyConcepts: ['Quantitative Investing', 'Mathematical Models', 'Algorithmic Trading', 'Risk Management'],
      targetAudience: 'Quantitative analysts, financial engineers'
    },
    zh: {
      recommendationReason: '量化投资发展史，数学在投资中的应用',
      keyConcepts: ['量化投资', '数学模型', '算法交易', '风险管理'],
      targetAudience: '量化分析师，金融工程师'
    }
  },
  'academic_high_4': {
    en: {
      recommendationReason: 'Autobiography of quantitative finance practitioner, combination of theory and practice',
      keyConcepts: ['Quantitative Finance', 'Options Pricing', 'Risk Management', 'Model Building'],
      targetAudience: 'Quantitative analysts, financial engineers'
    },
    zh: {
      recommendationReason: '量化金融从业者自传，理论与实践的结合',
      keyConcepts: ['量化金融', '期权定价', '风险管理', '模型构建'],
      targetAudience: '量化分析师，金融工程师'
    }
  },
  'academic_high_5': {
    en: {
      recommendationReason: 'Options dynamic hedging, advanced risk management techniques',
      keyConcepts: ['Options Trading', 'Dynamic Hedging', 'Risk Management', 'Greeks'],
      targetAudience: 'Options traders, risk management experts'
    },
    zh: {
      recommendationReason: '期权动态对冲，高级风险管理技术',
      keyConcepts: ['期权交易', '动态对冲', '风险管理', '希腊字母'],
      targetAudience: '期权交易员，风险管理专家'
    }
  },
  'business_low_1': {
    en: {
      recommendationReason: 'Classic financial education, changing perception of money and investment',
      keyConcepts: ['Financial Education', 'Assets vs Liabilities', 'Passive Income', 'Investment Mindset'],
      targetAudience: 'Financial education beginners, pursuing financial freedom'
    },
    zh: {
      recommendationReason: '财商教育经典，改变对金钱和投资的认知',
      keyConcepts: ['财商教育', '资产vs负债', '被动收入', '投资思维'],
      targetAudience: '财商初学者，追求财务自由'
    }
  },
  'business_low_2': {
    en: {
      recommendationReason: 'Secrets of millionaire wealth accumulation, importance of frugality and investment',
      keyConcepts: ['Wealth Accumulation', 'Frugal Living', 'Long-term Investment', 'Lifestyle Choices'],
      targetAudience: 'Ordinary people pursuing wealth accumulation'
    },
    zh: {
      recommendationReason: '百万富翁的财富积累秘密，节俭和投资的重要性',
      keyConcepts: ['财富积累', '节俭生活', '长期投资', '生活方式选择'],
      targetAudience: '追求财富积累的普通人'
    }
  },
  'business_low_3': {
    en: {
      recommendationReason: 'Automated investment strategy, letting wealth grow automatically',
      keyConcepts: ['Automated Investment', 'Regular Investment', 'Compound Interest Effect', 'Financial Planning'],
      targetAudience: 'Busy office workers, investment beginners'
    },
    zh: {
      recommendationReason: '自动化投资策略，让财富自动增长',
      keyConcepts: ['自动化投资', '定期投资', '复利效应', '财务规划'],
      targetAudience: '忙碌的上班族，投资新手'
    }
  },
  'business_low_4': {
    en: {
      recommendationReason: 'Debt management strategy, building healthy financial status',
      keyConcepts: ['Debt Management', 'Budget Planning', 'Emergency Fund', 'Investment Priority'],
      targetAudience: 'Individuals with debt issues, financial planning beginners'
    },
    zh: {
      recommendationReason: '债务管理策略，建立健康的财务状况',
      keyConcepts: ['债务管理', '预算规划', '应急基金', '投资优先级'],
      targetAudience: '有债务问题的个人，财务规划新手'
    }
  },
  'business_low_5': {
    en: {
      recommendationReason: 'Path to financial independence, redefining relationship with money',
      keyConcepts: ['Financial Independence', 'Life Value', 'Consumerism', 'Time vs Money'],
      targetAudience: 'Individuals pursuing financial independence'
    },
    zh: {
      recommendationReason: '财务独立之路，重新定义与金钱的关系',
      keyConcepts: ['财务独立', '生活价值', '消费主义', '时间vs金钱'],
      targetAudience: '追求财务独立的个人'
    }
  },
  'business_medium_1': {
    en: {
      recommendationReason: 'Classic success psychology, impact of positive thinking on wealth creation',
      keyConcepts: ['Success Psychology', 'Positive Thinking', 'Goal Setting', 'Persistence'],
      targetAudience: 'Individuals pursuing success, entrepreneurs'
    },
    zh: {
      recommendationReason: '成功心理学经典，积极思维对财富创造的影响',
      keyConcepts: ['成功心理学', '积极思维', '目标设定', '坚持不懈'],
      targetAudience: '追求成功的个人，创业者'
    }
  },
  'business_medium_2': {
    en: {
      recommendationReason: 'Psychology of money, understanding psychological factors behind investment decisions',
      keyConcepts: ['Behavioral Finance', 'Investment Psychology', 'Wealth Mindset', 'Decision Bias'],
      targetAudience: 'Investors understanding investment psychology'
    },
    zh: {
      recommendationReason: '金钱心理学，理解投资决策背后的心理因素',
      keyConcepts: ['行为金融学', '投资心理', '财富观念', '决策偏差'],
      targetAudience: '理解投资心理的投资者'
    }
  },
  'business_medium_3': {
    en: {
      recommendationReason: 'Simple path to wealth, index investment strategy',
      keyConcepts: ['Index Investing', 'Wealth Accumulation', 'Financial Independence', 'Simple Strategy'],
      targetAudience: 'Individuals pursuing simple and effective investment strategies'
    },
    zh: {
      recommendationReason: '财富积累的简单路径，指数投资策略',
      keyConcepts: ['指数投资', '财富积累', '财务独立', '简单策略'],
      targetAudience: '追求简单有效投资策略的个人'
    }
  },
  'business_medium_4': {
    en: {
      recommendationReason: 'Bogle investment guide, detailed passive investment strategy',
      keyConcepts: ['Passive Investment', 'Index Funds', 'Cost Control', 'Long-term Investment'],
      targetAudience: 'Individuals learning passive investment'
    },
    zh: {
      recommendationReason: '博格投资指南，被动投资策略详解',
      keyConcepts: ['被动投资', '指数基金', '成本控制', '长期投资'],
      targetAudience: '学习被动投资的个人'
    }
  },
  'business_medium_5': {
    en: {
      recommendationReason: 'Four pillars of investing, theoretical foundation for building robust investment portfolio',
      keyConcepts: ['Investment Theory', 'Investment Portfolio', 'Risk Management', 'Asset Allocation'],
      targetAudience: 'Individuals with some investment foundation'
    },
    zh: {
      recommendationReason: '投资四大支柱，构建稳健投资组合的理论基础',
      keyConcepts: ['投资理论', '投资组合', '风险管理', '资产配置'],
      targetAudience: '有一定投资基础的个人'
    }
  },
  'business_high_1': {
    en: {
      recommendationReason: 'Art of deal making, business negotiation and transaction strategies',
      keyConcepts: ['Business Negotiation', 'Transaction Strategy', 'Risk Management', 'Business Intuition'],
      targetAudience: 'Entrepreneurs, business investors'
    },
    zh: {
      recommendationReason: '商业谈判和交易的艺术，高风险高回报的商业策略',
      keyConcepts: ['商业谈判', '交易策略', '风险管理', '商业直觉'],
      targetAudience: '企业家，商业投资者'
    }
  },
  'business_high_2': {
    en: {
      recommendationReason: 'From 0 to 1 startup philosophy, value of innovation and monopoly',
      keyConcepts: ['Startup Strategy', 'Innovation Thinking', 'Monopoly Value', 'Future Thinking'],
      targetAudience: 'Entrepreneurs, venture capitalists'
    },
    zh: {
      recommendationReason: '从0到1的创业哲学，创新和垄断的价值',
      keyConcepts: ['创业策略', '创新思维', '垄断价值', '未来思维'],
      targetAudience: '创业者，风险投资者'
    }
  },
  'business_high_3': {
    en: {
      recommendationReason: 'Lean startup methodology, rapid validation and iteration startup strategy',
      keyConcepts: ['Lean Startup', 'Rapid Validation', 'Customer Feedback', 'Iteration Improvement'],
      targetAudience: 'Entrepreneurs, product managers'
    },
    zh: {
      recommendationReason: '精益创业方法论，快速验证和迭代的创业策略',
      keyConcepts: ['精益创业', '快速验证', '客户反馈', '迭代改进'],
      targetAudience: '创业者，产品经理'
    }
  },
  'business_high_4': {
    en: {
      recommendationReason: 'Venture capital deal guide, understanding VC investment risks and returns',
      keyConcepts: ['Venture Capital', 'Deal Structure', 'Valuation Methods', 'Risk Control'],
      targetAudience: 'Entrepreneurs, venture capitalists'
    },
    zh: {
      recommendationReason: '风险投资交易指南，理解VC投资的风险和回报',
      keyConcepts: ['风险投资', '交易结构', '估值方法', '风险控制'],
      targetAudience: '创业者，风险投资者'
    }
  },
  'business_high_5': {
    en: {
      recommendationReason: 'Coping strategies for difficult startup moments, real experience of high-risk entrepreneurship',
      keyConcepts: ['Startup Challenges', 'Crisis Management', 'Leadership', 'Decision Making'],
      targetAudience: 'Entrepreneurs, business leaders'
    },
    zh: {
      recommendationReason: '创业艰难时刻的应对策略，高风险创业的真实经验',
      keyConcepts: ['创业挑战', '危机管理', '领导力', '决策制定'],
      targetAudience: '创业者，企业领导者'
    }
  },
  'psychologic_low_1': {
    en: {
      recommendationReason: 'Foundation of investment psychology, understanding emotional impact on investment decisions',
      keyConcepts: ['Investment Psychology', 'Emotional Control', 'Cognitive Bias', 'Rational Decision Making'],
      targetAudience: 'Investment psychology beginners'
    },
    zh: {
      recommendationReason: '投资心理学基础，理解情绪对投资决策的影响',
      keyConcepts: ['投资心理', '情绪控制', '认知偏差', '理性决策'],
      targetAudience: '投资心理学初学者'
    }
  },
  'psychologic_low_2': {
    en: {
      recommendationReason: 'Neuroeconomics perspective, how brain affects investment decisions',
      keyConcepts: ['Neuroeconomics', 'Brain Mechanisms', 'Investment Decisions', 'Behavioral Bias'],
      targetAudience: 'Investors interested in brain science'
    },
    zh: {
      recommendationReason: '神经经济学视角，大脑如何影响投资决策',
      keyConcepts: ['神经经济学', '大脑机制', '投资决策', '行为偏差'],
      targetAudience: '对大脑科学感兴趣的投资者'
    }
  },
  'psychologic_low_3': {
    en: {
      recommendationReason: 'Introduction to behavioral investing, avoiding common investment psychological traps',
      keyConcepts: ['Behavioral Finance', 'Psychological Traps', 'Investment Bias', 'Rational Investment'],
      targetAudience: 'Behavioral finance beginners'
    },
    zh: {
      recommendationReason: '行为投资学入门，避免常见投资心理陷阱',
      keyConcepts: ['行为金融学', '心理陷阱', '投资偏差', '理性投资'],
      targetAudience: '行为金融学初学者'
    }
  },
  'psychologic_low_4': {
    en: {
      recommendationReason: 'Art of clear thinking, thinking tools to avoid cognitive bias',
      keyConcepts: ['Critical Thinking', 'Cognitive Bias', 'Logical Reasoning', 'Decision Quality'],
      targetAudience: 'Individuals improving thinking quality'
    },
    zh: {
      recommendationReason: '清晰思维的艺术，避免认知偏差的思维工具',
      keyConcepts: ['批判性思维', '认知偏差', '逻辑推理', '决策质量'],
      targetAudience: '提升思维质量的个人'
    }
  },
  'psychologic_low_5': {
    en: {
      recommendationReason: 'Nobel Prize winner work, dual-system thinking theory',
      keyConcepts: ['Dual-System Thinking', 'Cognitive Bias', 'Decision Theory', 'Behavioral Economics'],
      targetAudience: 'Psychology enthusiasts, decision researchers'
    },
    zh: {
      recommendationReason: '诺贝尔经济学奖得主作品，双系统思维理论',
      keyConcepts: ['双系统思维', '认知偏差', '决策理论', '行为经济学'],
      targetAudience: '心理学爱好者，决策研究者'
    }
  },
  'psychologic_medium_1': {
    en: {
      recommendationReason: 'History of behavioral economics development, collaboration story of Kahneman and Tversky',
      keyConcepts: ['Behavioral Economics', 'Collaborative Research', 'Academic Development', 'Theoretical Innovation'],
      targetAudience: 'Behavioral economics enthusiasts, psychology researchers'
    },
    zh: {
      recommendationReason: '行为经济学发展史，卡尼曼和特沃斯基的合作故事',
      keyConcepts: ['行为经济学', '合作研究', '学术发展', '理论创新'],
      targetAudience: '行为经济学爱好者，心理学研究者'
    }
  },
  'psychologic_medium_2': {
    en: {
      recommendationReason: 'Predictably irrational, systematic bias in human decision making',
      keyConcepts: ['Irrational Decisions', 'Behavioral Bias', 'Experimental Economics', 'Decision Patterns'],
      targetAudience: 'Behavioral economics learners, decision researchers'
    },
    zh: {
      recommendationReason: '可预测的非理性，人类决策中的系统性偏差',
      keyConcepts: ['非理性决策', '行为偏差', '实验经济学', '决策模式'],
      targetAudience: '行为经济学学习者，决策研究者'
    }
  },
  'psychologic_medium_3': {
    en: {
      recommendationReason: 'Invisible gorilla phenomenon, how intuition deceives us',
      keyConcepts: ['Inattentional Blindness', 'Intuition Traps', 'Cognitive Limitations', 'Perceptual Bias'],
      targetAudience: 'Cognitive psychology enthusiasts, decision researchers'
    },
    zh: {
      recommendationReason: '注意力盲视现象，直觉如何欺骗我们',
      keyConcepts: ['注意力盲视', '直觉陷阱', '认知局限', '感知偏差'],
      targetAudience: '认知心理学爱好者，决策研究者'
    }
  },
  'psychologic_medium_4': {
    en: {
      recommendationReason: 'Power of habit, how to change personal and organizational habits',
      keyConcepts: ['Habit Formation', 'Behavior Change', 'Loop Patterns', 'Willpower'],
      targetAudience: 'Personal development enthusiasts, organizational managers'
    },
    zh: {
      recommendationReason: '习惯的力量，如何改变个人和组织的习惯',
      keyConcepts: ['习惯形成', '行为改变', '循环模式', '意志力'],
      targetAudience: '个人发展爱好者，组织管理者'
    }
  },
  'psychologic_medium_5': {
    en: {
      recommendationReason: 'Growth mindset, how to cultivate successful mentality',
      keyConcepts: ['Growth Mindset', 'Fixed Mindset', 'Learning Ability', 'Success Mindset'],
      targetAudience: 'Educators, personal development pursuers'
    },
    zh: {
      recommendationReason: '成长型思维模式，如何培养成功的心态',
      keyConcepts: ['成长型思维', '固定型思维', '学习能力', '成功心态'],
      targetAudience: '教育工作者，个人发展追求者'
    }
  },
  'psychologic_high_1': {
    en: {
      recommendationReason: 'Trading psychology, psychological training methods for professional traders',
      keyConcepts: ['Trading Psychology', 'Emotional Management', 'Stress Control', 'Psychological Training'],
      targetAudience: 'Professional traders, trading psychology researchers'
    },
    zh: {
      recommendationReason: '交易心理学，专业交易员的心理训练方法',
      keyConcepts: ['交易心理', '情绪管理', '压力控制', '心理训练'],
      targetAudience: '专业交易员，交易心理学研究者'
    }
  },
  'psychologic_high_2': {
    en: {
      recommendationReason: 'Trading in the zone, psychological methods to achieve optimal trading state',
      keyConcepts: ['Trading State', 'Psychological Zone', 'Confidence Building', 'Discipline Cultivation'],
      targetAudience: 'Professional traders, trading psychology experts'
    },
    zh: {
      recommendationReason: '交易心理区域，达到最佳交易状态的心理方法',
      keyConcepts: ['交易状态', '心理区域', '自信建立', '纪律培养'],
      targetAudience: '专业交易员，交易心理学专家'
    }
  },
  'psychologic_high_3': {
    en: {
      recommendationReason: 'Disciplined trader, cultivating psychological attitude of successful traders',
      keyConcepts: ['Trading Discipline', 'Psychological Attitude', 'Risk Control', 'Success Habits'],
      targetAudience: 'Professional traders, trading discipline researchers'
    },
    zh: {
      recommendationReason: '纪律交易员，培养成功交易者的心理态度',
      keyConcepts: ['交易纪律', '心理态度', '风险控制', '成功习惯'],
      targetAudience: '专业交易员，交易纪律研究者'
    }
  },
  'psychologic_high_4': {
    en: {
      recommendationReason: 'Art of learning, learning psychology from chess to martial arts',
      keyConcepts: ['Learning Psychology', 'Skill Mastery', 'Psychological Resilience', 'Performance Optimization'],
      targetAudience: 'Learning researchers, skill development pursuers'
    },
    zh: {
      recommendationReason: '学习艺术，从国际象棋到武术的学习心理学',
      keyConcepts: ['学习心理学', '技能掌握', '心理韧性', '表现优化'],
      targetAudience: '学习研究者，技能发展追求者'
    }
  },
  'psychologic_high_5': {
    en: {
      recommendationReason: 'Peak performance, scientific methods to improve performance and avoid burnout',
      keyConcepts: ['Performance Enhancement', 'Burnout Prevention', 'Stress Management', 'Recovery Strategies'],
      targetAudience: 'Performance researchers, high-pressure workers'
    },
    zh: {
      recommendationReason: '巅峰表现，科学提升表现和避免倦怠的方法',
      keyConcepts: ['表现提升', '倦怠预防', '压力管理', '恢复策略'],
      targetAudience: '表现研究者，高压工作者'
    }
  }
}

// 获取书籍翻译的函数
export function getBookTranslation(bookId: string, language: 'en' | 'zh'): BookTranslations | null {
  const translations = BOOK_TRANSLATIONS[bookId]
  if (!translations) return null
  
  return translations[language] || translations.en
}

// 获取推荐理由的函数（多语言版本）
export function generateRecommendationReason(
  _book: any,
  philosophy: string,
  riskLevel: string,
  _deviationLevel: string,
  language: 'en' | 'zh' = 'en'
): string {
  const reasons: Record<string, Record<string, string>> = {
    academic: {
      low: language === 'en' ? 'Based on academic research value investing principles, suitable for conservative investors' : '基于学术研究的价值投资理念，适合保守型投资者',
      medium: language === 'en' ? 'Investment strategy combining theory and practice, balancing risk and return' : '结合理论与实践的投资策略，平衡风险与收益',
      high: language === 'en' ? 'Cutting-edge investment theory and risk management methods, suitable for professional investors' : '前沿投资理论和风险管理方法，适合专业投资者'
    },
    business: {
      low: language === 'en' ? 'Practical wealth accumulation strategies, suitable for ordinary people investment needs' : '实用的财富积累策略，适合普通人的投资需求',
      medium: language === 'en' ? 'Balanced business investment methods, combining theory and practice' : '平衡的商业投资方法，结合理论与实践',
      high: language === 'en' ? 'Innovative business strategies and entrepreneurial thinking, suitable for pursuing high returns' : '创新的商业策略和创业思维，适合追求高回报'
    },
    psychologic: {
      low: language === 'en' ? 'Foundation of investment psychology, helping understand psychological factors in investment decisions' : '投资心理学基础，帮助理解投资决策的心理因素',
      medium: language === 'en' ? 'Application of behavioral finance, avoiding common investment psychological traps' : '行为金融学应用，避免常见投资心理陷阱',
      high: language === 'en' ? 'Advanced trading psychology, suitable for professional traders and investors' : '高级交易心理学，适合专业交易员和投资者'
    }
  }
  
  return reasons[philosophy]?.[riskLevel] || 
         (language === 'en' ? 'Professional recommendation based on your investment preferences and risk tolerance' : '基于您的投资偏好和风险承受能力的专业推荐')
}
