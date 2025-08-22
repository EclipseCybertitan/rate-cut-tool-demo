export interface InvestmentBook {
  id: string
  title: string
  author: string
  philosophy: 'academic' | 'business' | 'psychologic'
  riskLevel: 'low' | 'medium' | 'high'
  category: string
  amazonLink: string
  shortLink: string
  recommendationReason: string
  keyConcepts: string[]
  targetAudience: string
  publicationYear: number
}

export const INVESTMENT_BOOKS_DATABASE: InvestmentBook[] = [
  // 学院派 - 低风险 (5本)
  {
    id: 'academic_low_1',
    title: 'The Intelligent Investor',
    author: 'Benjamin Graham',
    philosophy: 'academic',
    riskLevel: 'low',
    category: 'Value Investing',
    amazonLink: 'https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661',
    shortLink: 'amzn.to/academic-low-1',
    recommendationReason: 'Classic value investing principles, suitable for conservative investors, emphasizing margin of safety and long-term investment',
    keyConcepts: ['Margin of Safety', 'Value Investing', 'Long-term Investment', 'Risk Control'],
    targetAudience: 'Conservative investors seeking stable returns',
    publicationYear: 1949
  },
  {
    id: 'academic_low_2',
    title: 'Common Stocks and Uncommon Profits',
    author: 'Philip Fisher',
    philosophy: 'academic',
    riskLevel: 'low',
    category: 'Growth Investing',
    amazonLink: 'https://www.amazon.com/Common-Stocks-Uncommon-Profits-Strategies/dp/0471445509',
    shortLink: 'amzn.to/academic-low-2',
    recommendationReason: 'Growth stock investment theory, emphasizing company quality and long-term holding',
    keyConcepts: ['Growth Stock Investment', 'Company Quality', 'Long-term Holding', 'Fundamental Analysis'],
    targetAudience: 'Investors seeking stable growth',
    publicationYear: 1958
  },
  {
    id: 'academic_low_3',
    title: 'Security Analysis',
    author: 'Benjamin Graham & David Dodd',
    philosophy: 'academic',
    riskLevel: 'low',
    category: 'Financial Analysis',
    amazonLink: 'https://www.amazon.com/Security-Analysis-Principles-Technique-Valuation/dp/0071592539',
    shortLink: 'amzn.to/academic-low-3',
    recommendationReason: 'Bible of security analysis, systematic investment analysis methodology',
    keyConcepts: ['Security Analysis', 'Financial Statement Analysis', 'Valuation Methods', 'Risk Management'],
    targetAudience: 'Professional investors, analysts',
    publicationYear: 1934
  },
  {
    id: 'academic_low_4',
    title: 'The Little Book of Common Sense Investing',
    author: 'John C. Bogle',
    philosophy: 'academic',
    riskLevel: 'low',
    category: 'Index Investing',
    amazonLink: 'https://www.amazon.com/Little-Book-Common-Sense-Investing/dp/1119404509',
    shortLink: 'amzn.to/academic-low-4',
    recommendationReason: 'Index investing philosophy, low-cost passive investment strategy',
    keyConcepts: ['Index Investing', 'Passive Investment', 'Cost Control', 'Diversification'],
    targetAudience: 'Investors seeking market average returns',
    publicationYear: 2007
  },
  {
    id: 'academic_low_5',
    title: 'A Random Walk Down Wall Street',
    author: 'Burton G. Malkiel',
    philosophy: 'academic',
    riskLevel: 'low',
    category: 'Market Efficiency',
    amazonLink: 'https://www.amazon.com/Random-Walk-Down-Wall-Street/dp/0393358380',
    shortLink: 'amzn.to/academic-low-5',
    recommendationReason: 'Efficient market hypothesis, supporting passive investment strategy',
    keyConcepts: ['Efficient Market Hypothesis', 'Random Walk', 'Passive Investment', 'Market Efficiency'],
    targetAudience: 'Investors who believe in market efficiency',
    publicationYear: 1973
  },

  // 学院派 - 中风险 (5本)
  {
    id: 'academic_medium_1',
    title: 'One Up On Wall Street',
    author: 'Peter Lynch',
    philosophy: 'academic',
    riskLevel: 'medium',
    category: 'Stock Picking',
    amazonLink: 'https://www.amazon.com/One-Up-Wall-Street-Already/dp/0743200403',
    shortLink: 'amzn.to/academic-medium-1',
    recommendationReason: 'Peter Lynch investment philosophy, how ordinary people can beat the market',
    keyConcepts: ['Stock Picking Strategy', 'Fundamental Analysis', 'Industry Research', 'Investment Opportunity Recognition'],
    targetAudience: 'Individual investors with some investment experience',
    publicationYear: 1989
  },
  {
    id: 'academic_medium_2',
    title: 'The Essays of Warren Buffett',
    author: 'Warren Buffett',
    philosophy: 'academic',
    riskLevel: 'medium',
    category: 'Value Investing',
    amazonLink: 'https://www.amazon.com/Essays-Warren-Buffett-International-Corporate/dp/1611637589',
    shortLink: 'amzn.to/academic-medium-2',
    recommendationReason: 'Essence of Warren Buffett investment thinking, practical guide to value investing',
    keyConcepts: ['Value Investing', 'Business Analysis', 'Long-term Thinking', 'Compound Interest Effect'],
    targetAudience: 'Value investors, long-term investors',
    publicationYear: 1997
  },
  {
    id: 'academic_medium_3',
    title: 'The Most Important Thing',
    author: 'Howard Marks',
    philosophy: 'academic',
    riskLevel: 'medium',
    category: 'Risk Management',
    amazonLink: 'https://www.amazon.com/Most-Important-Thing-Illuminated-Investors/dp/0231162278',
    shortLink: 'amzn.to/academic-medium-3',
    recommendationReason: 'Core principles of risk management, key elements for investment success',
    keyConcepts: ['Risk Management', 'Market Cycles', 'Investment Psychology', 'Value Judgment'],
    targetAudience: 'Investors focused on risk control',
    publicationYear: 2011
  },
  {
    id: 'academic_medium_4',
    title: 'The Art of Value Investing',
    author: 'John Heins & Whitney Tilson',
    philosophy: 'academic',
    riskLevel: 'medium',
    category: 'Value Investing',
    amazonLink: 'https://www.amazon.com/Art-Value-Investing-Interviews-Strategies/dp/1118509600',
    shortLink: 'amzn.to/academic-medium-4',
    recommendationReason: 'Collection of value investing master interviews, sharing practical experience',
    keyConcepts: ['Value Investing', 'Practical Experience', 'Investment Strategy', 'Case Analysis'],
    targetAudience: 'Practitioners learning value investing',
    publicationYear: 2013
  },
  {
    id: 'academic_medium_5',
    title: 'The Dhandho Investor',
    author: 'Mohnish Pabrai',
    philosophy: 'academic',
    riskLevel: 'medium',
    category: 'Concentrated Investing',
    amazonLink: 'https://www.amazon.com/Dhandho-Investor-Low-Risk-Method-Higher/dp/047004389X',
    shortLink: 'amzn.to/academic-medium-5',
    recommendationReason: 'Concentrated investment strategy, low-risk high-return investment method',
    keyConcepts: ['Concentrated Investment', 'Low Risk High Return', 'Investment Opportunities', 'Risk Control'],
    targetAudience: 'Investors seeking high returns',
    publicationYear: 2007
  },

  // 学院派 - 高风险 (5本)
  {
    id: 'academic_high_1',
    title: 'The Black Swan',
    author: 'Nassim Nicholas Taleb',
    philosophy: 'academic',
    riskLevel: 'high',
    category: 'Risk Theory',
    amazonLink: 'https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X',
    shortLink: 'amzn.to/academic-high-1',
    recommendationReason: 'Black Swan theory, impact and response to extreme risk events',
    keyConcepts: ['Black Swan Events', 'Extreme Risk', 'Uncertainty', 'Risk Modeling'],
    targetAudience: 'Risk management experts, quantitative investors',
    publicationYear: 2007
  },
  {
    id: 'academic_high_2',
    title: 'Fooled by Randomness',
    author: 'Nassim Nicholas Taleb',
    philosophy: 'academic',
    riskLevel: 'high',
    category: 'Probability & Risk',
    amazonLink: 'https://www.amazon.com/Fooled-Randomness-Hidden-Markets-Incerto/dp/0812975219',
    shortLink: 'amzn.to/academic-high-2',
    recommendationReason: 'Role of randomness in investment, avoiding being fooled by randomness',
    keyConcepts: ['Randomness', 'Probabilistic Thinking', 'Risk Perception', 'Investment Psychology'],
    targetAudience: 'Quantitative investors, risk management experts',
    publicationYear: 2001
  },
  {
    id: 'academic_high_3',
    title: 'The Quants',
    author: 'Scott Patterson',
    philosophy: 'academic',
    riskLevel: 'high',
    category: 'Quantitative Investing',
    amazonLink: 'https://www.amazon.com/Quants-Whiz-Kids-Broke-Wall-Street/dp/0307453383',
    shortLink: 'amzn.to/academic-high-3',
    recommendationReason: 'History of quantitative investing, application of mathematics in investment',
    keyConcepts: ['Quantitative Investing', 'Mathematical Models', 'Algorithmic Trading', 'Risk Management'],
    targetAudience: 'Quantitative analysts, financial engineers',
    publicationYear: 2010
  },
  {
    id: 'academic_high_4',
    title: 'My Life as a Quant',
    author: 'Emanuel Derman',
    philosophy: 'academic',
    riskLevel: 'high',
    category: 'Quantitative Finance',
    amazonLink: 'https://www.amazon.com/Life-Quant-Reflections-Physics-Finance/dp/0470192738',
    shortLink: 'amzn.to/academic-high-4',
    recommendationReason: 'Autobiography of quantitative finance practitioner, combination of theory and practice',
    keyConcepts: ['Quantitative Finance', 'Options Pricing', 'Risk Management', 'Model Building'],
    targetAudience: 'Quantitative analysts, financial engineers',
    publicationYear: 2004
  },
  {
    id: 'academic_high_5',
    title: 'Dynamic Hedging',
    author: 'Nassim Nicholas Taleb',
    philosophy: 'academic',
    riskLevel: 'high',
    category: 'Options Trading',
    amazonLink: 'https://www.amazon.com/Dynamic-Hedging-Managing-Vanilla-Options/dp/0471152803',
    shortLink: 'amzn.to/academic-high-5',
    recommendationReason: 'Options dynamic hedging, advanced risk management techniques',
    keyConcepts: ['Options Trading', 'Dynamic Hedging', 'Risk Management', 'Greeks'],
    targetAudience: 'Options traders, risk management experts',
    publicationYear: 1997
  },

  // 商业派 - 低风险 (5本)
  {
    id: 'business_low_1',
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    philosophy: 'business',
    riskLevel: 'low',
    category: 'Financial Education',
    amazonLink: 'https://www.amazon.com/Rich-Dad-Poor-Teach-Middle/dp/1612680194',
    shortLink: 'amzn.to/business-low-1',
    recommendationReason: 'Classic financial education, changing perception of money and investment',
    keyConcepts: ['Financial Education', 'Assets vs Liabilities', 'Passive Income', 'Investment Mindset'],
    targetAudience: 'Financial education beginners, pursuing financial freedom',
    publicationYear: 1997
  },
  {
    id: 'business_low_2',
    title: 'The Millionaire Next Door',
    author: 'Thomas J. Stanley & William D. Danko',
    philosophy: 'business',
    riskLevel: 'low',
    category: 'Wealth Building',
    amazonLink: 'https://www.amazon.com/Millionaire-Next-Door-Surprising-Americas/dp/1589795474',
    shortLink: 'amzn.to/business-low-2',
    recommendationReason: 'Secrets of millionaire wealth accumulation, importance of frugality and investment',
    keyConcepts: ['Wealth Accumulation', 'Frugal Living', 'Long-term Investment', 'Lifestyle Choices'],
    targetAudience: 'Ordinary people pursuing wealth accumulation',
    publicationYear: 1996
  },
  {
    id: 'business_low_3',
    title: 'The Automatic Millionaire',
    author: 'David Bach',
    philosophy: 'business',
    riskLevel: 'low',
    category: 'Automated Investing',
    amazonLink: 'https://www.amazon.com/Automatic-Millionaire-Powerful-One-Investment/dp/0761187483',
    shortLink: 'amzn.to/business-low-3',
    recommendationReason: 'Automated investment strategy, letting wealth grow automatically',
    keyConcepts: ['Automated Investment', 'Regular Investment', 'Compound Interest Effect', 'Financial Planning'],
    targetAudience: 'Busy office workers, investment beginners',
    publicationYear: 2004
  },
  {
    id: 'business_low_4',
    title: 'The Total Money Makeover',
    author: 'Dave Ramsey',
    philosophy: 'business',
    riskLevel: 'low',
    category: 'Debt Management',
    amazonLink: 'https://www.amazon.com/Total-Money-Makeover-Classic-Financial/dp/1593854878',
    shortLink: 'amzn.to/business-low-4',
    recommendationReason: 'Debt management strategy, building healthy financial status',
    keyConcepts: ['Debt Management', 'Budget Planning', 'Emergency Fund', 'Investment Priority'],
    targetAudience: 'Individuals with debt issues, financial planning beginners',
    publicationYear: 2003
  },
  {
    id: 'business_low_5',
    title: 'Your Money or Your Life',
    author: 'Vicki Robin & Joe Dominguez',
    philosophy: 'business',
    riskLevel: 'low',
    category: 'Financial Independence',
    amazonLink: 'https://www.amazon.com/Your-Money-Life-Transforming-Relationship/dp/0143115766',
    shortLink: 'amzn.to/business-low-5',
    recommendationReason: 'Path to financial independence, redefining relationship with money',
    keyConcepts: ['Financial Independence', 'Life Value', 'Consumerism', 'Time vs Money'],
    targetAudience: 'Individuals pursuing financial independence',
    publicationYear: 1992
  },

  // 商业派 - 中风险 (5本)
  {
    id: 'business_medium_1',
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    philosophy: 'business',
    riskLevel: 'medium',
    category: 'Success Psychology',
    amazonLink: 'https://www.amazon.com/Think-Grow-Rich-Napoleon-Hill/dp/1585424331',
    shortLink: 'amzn.to/business-medium-1',
    recommendationReason: '成功心理学经典，积极思维对财富创造的影响',
    keyConcepts: ['成功心理学', '积极思维', '目标设定', '坚持不懈'],
    targetAudience: '追求成功的个人，创业者',
    publicationYear: 1937
  },
  {
    id: 'business_medium_2',
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    philosophy: 'business',
    riskLevel: 'medium',
    category: 'Behavioral Finance',
    amazonLink: 'https://www.amazon.com/Psychology-Money-Timeless-Learning-Investment/dp/0857197681',
    shortLink: 'amzn.to/business-medium-2',
    recommendationReason: '金钱心理学，理解投资决策背后的心理因素',
    keyConcepts: ['行为金融学', '投资心理', '财富观念', '决策偏差'],
    targetAudience: '理解投资心理的投资者',
    publicationYear: 2020
  },
  {
    id: 'business_medium_3',
    title: 'The Simple Path to Wealth',
    author: 'J.L. Collins',
    philosophy: 'business',
    riskLevel: 'medium',
    category: 'Index Investing',
    amazonLink: 'https://www.amazon.com/Simple-Path-Wealth-financial-independence/dp/1533667926',
    shortLink: 'amzn.to/business-medium-3',
    recommendationReason: '财富积累的简单路径，指数投资策略',
    keyConcepts: ['指数投资', '财富积累', '财务独立', '简单策略'],
    targetAudience: '追求简单有效投资策略的个人',
    publicationYear: 2016
  },
  {
    id: 'business_medium_4',
    title: 'The Bogleheads Guide to Investing',
    author: 'Taylor Larimore, Mel Lindauer & Michael LeBoeuf',
    philosophy: 'business',
    riskLevel: 'medium',
    category: 'Passive Investing',
    amazonLink: 'https://www.amazon.com/Bogleheads-Guide-Investing-Taylor-Larimore/dp/0470067365',
    shortLink: 'amzn.to/business-medium-4',
    recommendationReason: '博格投资指南，被动投资策略详解',
    keyConcepts: ['被动投资', '指数基金', '成本控制', '长期投资'],
    targetAudience: '学习被动投资的个人',
    publicationYear: 2006
  },
  {
    id: 'business_medium_5',
    title: 'The Four Pillars of Investing',
    author: 'William J. Bernstein',
    philosophy: 'business',
    riskLevel: 'medium',
    category: 'Investment Theory',
    amazonLink: 'https://www.amazon.com/Four-Pillars-Investing-Building-Portfolio/dp/0071385290',
    shortLink: 'amzn.to/business-medium-5',
    recommendationReason: '投资四大支柱，构建稳健投资组合的理论基础',
    keyConcepts: ['投资理论', '投资组合', '风险管理', '资产配置'],
    targetAudience: '有一定投资基础的个人',
    publicationYear: 2002
  },

  // 商业派 - 高风险 (5本)
  {
    id: 'business_high_1',
    title: 'The Art of the Deal',
    author: 'Donald J. Trump & Tony Schwartz',
    philosophy: 'business',
    riskLevel: 'high',
    category: 'Business Strategy',
    amazonLink: 'https://www.amazon.com/Art-Deal-Donald-J-Trump/dp/0399594493',
    shortLink: 'amzn.to/business-high-1',
    recommendationReason: '商业谈判和交易的艺术，高风险高回报的商业策略',
    keyConcepts: ['商业谈判', '交易策略', '风险管理', '商业直觉'],
    targetAudience: '企业家，商业投资者',
    publicationYear: 1987
  },
  {
    id: 'business_high_2',
    title: 'Zero to One',
    author: 'Peter Thiel',
    philosophy: 'business',
    riskLevel: 'high',
    category: 'Startup Strategy',
    amazonLink: 'https://www.amazon.com/Zero-One-Notes-Startups-Future/dp/0804139296',
    shortLink: 'amzn.to/business-high-2',
    recommendationReason: '从0到1的创业哲学，创新和垄断的价值',
    keyConcepts: ['创业策略', '创新思维', '垄断价值', '未来思维'],
    targetAudience: '创业者，风险投资者',
    publicationYear: 2014
  },
  {
    id: 'business_high_3',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    philosophy: 'business',
    riskLevel: 'high',
    category: 'Startup Methodology',
    amazonLink: 'https://www.amazon.com/Lean-Startup-Entrepreneurs-Continuous-Innovation/dp/0307887898',
    shortLink: 'amzn.to/business-high-3',
    recommendationReason: '精益创业方法论，快速验证和迭代的创业策略',
    keyConcepts: ['精益创业', '快速验证', '客户反馈', '迭代改进'],
    targetAudience: '创业者，产品经理',
    publicationYear: 2011
  },
  {
    id: 'business_high_4',
    title: 'Venture Deals',
    author: 'Brad Feld & Jason Mendelson',
    philosophy: 'business',
    riskLevel: 'high',
    category: 'Venture Capital',
    amazonLink: 'https://www.amazon.com/Venture-Deals-Smarter-Lawyer-Capitalist/dp/1119594824',
    shortLink: 'amzn.to/business-high-4',
    recommendationReason: '风险投资交易指南，理解VC投资的风险和回报',
    keyConcepts: ['风险投资', '交易结构', '估值方法', '风险控制'],
    targetAudience: '创业者，风险投资者',
    publicationYear: 2011
  },
  {
    id: 'business_high_5',
    title: 'The Hard Thing About Hard Things',
    author: 'Ben Horowitz',
    philosophy: 'business',
    riskLevel: 'high',
    category: 'Entrepreneurship',
    amazonLink: 'https://www.amazon.com/Hard-Thing-About-Things-Building/dp/0062273205',
    shortLink: 'amzn.to/business-high-5',
    recommendationReason: '创业艰难时刻的应对策略，高风险创业的真实经验',
    keyConcepts: ['创业挑战', '危机管理', '领导力', '决策制定'],
    targetAudience: '创业者，企业领导者',
    publicationYear: 2014
  },

  // 心理派 - 低风险 (5本)
  {
    id: 'psychologic_low_1',
    title: 'The Psychology of Investing',
    author: 'John R. Nofsinger',
    philosophy: 'psychologic',
    riskLevel: 'low',
    category: 'Investment Psychology',
    amazonLink: 'https://www.amazon.com/Psychology-Investing-John-R-Nofsinger/dp/0132343744',
    shortLink: 'amzn.to/psychologic-low-1',
    recommendationReason: 'Foundation of investment psychology, understanding emotional impact on investment decisions',
    keyConcepts: ['Investment Psychology', 'Emotional Control', 'Cognitive Bias', 'Rational Decision Making'],
    targetAudience: 'Investment psychology beginners',
    publicationYear: 2001
  },
  {
    id: 'psychologic_low_2',
    title: 'Your Money and Your Brain',
    author: 'Jason Zweig',
    philosophy: 'psychologic',
    riskLevel: 'low',
    category: 'Neuroeconomics',
    amazonLink: 'https://www.amazon.com/Your-Money-Brain-Think-Investments/dp/0743276694',
    shortLink: 'amzn.to/psychologic-low-2',
    recommendationReason: 'Neuroeconomics perspective, how brain affects investment decisions',
    keyConcepts: ['Neuroeconomics', 'Brain Mechanisms', 'Investment Decisions', 'Behavioral Bias'],
    targetAudience: 'Investors interested in brain science',
    publicationYear: 2007
  },
  {
    id: 'psychologic_low_3',
    title: 'The Little Book of Behavioral Investing',
    author: 'James Montier',
    philosophy: 'psychologic',
    riskLevel: 'low',
    category: 'Behavioral Finance',
    amazonLink: 'https://www.amazon.com/Little-Book-Behavioral-Investing-ebook/dp/B0036S4C8I',
    shortLink: 'amzn.to/psychologic-low-3',
    recommendationReason: 'Introduction to behavioral investing, avoiding common investment psychological traps',
    keyConcepts: ['Behavioral Finance', 'Psychological Traps', 'Investment Bias', 'Rational Investment'],
    targetAudience: 'Behavioral finance beginners',
    publicationYear: 2010
  },
  {
    id: 'psychologic_low_4',
    title: 'The Art of Thinking Clearly',
    author: 'Rolf Dobelli',
    philosophy: 'psychologic',
    riskLevel: 'low',
    category: 'Critical Thinking',
    amazonLink: 'https://www.amazon.com/Art-Thinking-Clearly-Rolf-Dobelli/dp/0062219693',
    shortLink: 'amzn.to/psychologic-low-4',
    recommendationReason: 'Art of clear thinking, thinking tools to avoid cognitive bias',
    keyConcepts: ['Critical Thinking', 'Cognitive Bias', 'Logical Reasoning', 'Decision Quality'],
    targetAudience: 'Individuals improving thinking quality',
    publicationYear: 2013
  },
  {
    id: 'psychologic_low_5',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    philosophy: 'psychologic',
    riskLevel: 'low',
    category: 'Cognitive Psychology',
    amazonLink: 'https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555',
    shortLink: 'amzn.to/psychologic-low-5',
    recommendationReason: 'Nobel Prize winner work, dual-system thinking theory',
    keyConcepts: ['Dual-System Thinking', 'Cognitive Bias', 'Decision Theory', 'Behavioral Economics'],
    targetAudience: 'Psychology enthusiasts, decision researchers',
    publicationYear: 2011
  },

  // 心理派 - 中风险 (5本)
  {
    id: 'psychologic_medium_1',
    title: 'The Undoing Project',
    author: 'Michael Lewis',
    philosophy: 'psychologic',
    riskLevel: 'medium',
    category: 'Behavioral Economics',
    amazonLink: 'https://www.amazon.com/Undoing-Project-Friendship-Changed-Minds/dp/0393254593',
    shortLink: 'amzn.to/psychologic-medium-1',
    recommendationReason: '行为经济学发展史，卡尼曼和特沃斯基的合作故事',
    keyConcepts: ['行为经济学', '合作研究', '学术发展', '理论创新'],
    targetAudience: '行为经济学爱好者，心理学研究者',
    publicationYear: 2016
  },
  {
    id: 'psychologic_medium_2',
    title: 'Predictably Irrational',
    author: 'Dan Ariely',
    philosophy: 'psychologic',
    riskLevel: 'medium',
    category: 'Behavioral Economics',
    amazonLink: 'https://www.amazon.com/Predictably-Irrational-Revised-Expanded-Decisions/dp/0061353248',
    shortLink: 'amzn.to/psychologic-medium-2',
    recommendationReason: '可预测的非理性，人类决策中的系统性偏差',
    keyConcepts: ['非理性决策', '行为偏差', '实验经济学', '决策模式'],
    targetAudience: '行为经济学学习者，决策研究者',
    publicationYear: 2008
  },
  {
    id: 'psychologic_medium_3',
    title: 'The Invisible Gorilla',
    author: 'Christopher Chabris & Daniel Simons',
    philosophy: 'psychologic',
    riskLevel: 'medium',
    category: 'Cognitive Psychology',
    amazonLink: 'https://www.amazon.com/Invisible-Gorilla-How-Intuitions-Deceive/dp/0307459667',
    shortLink: 'amzn.to/psychologic-medium-3',
    recommendationReason: '注意力盲视现象，直觉如何欺骗我们',
    keyConcepts: ['注意力盲视', '直觉陷阱', '认知局限', '感知偏差'],
    targetAudience: '认知心理学爱好者，决策研究者',
    publicationYear: 2010
  },
  {
    id: 'psychologic_medium_4',
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    philosophy: 'psychologic',
    riskLevel: 'medium',
    category: 'Habit Formation',
    amazonLink: 'https://www.amazon.com/Power-Habit-What-Business-Lives/dp/081298160X',
    shortLink: 'amzn.to/psychologic-medium-4',
    recommendationReason: '习惯的力量，如何改变个人和组织的习惯',
    keyConcepts: ['习惯形成', '行为改变', '循环模式', '意志力'],
    targetAudience: '个人发展爱好者，组织管理者',
    publicationYear: 2012
  },
  {
    id: 'psychologic_medium_5',
    title: 'Mindset',
    author: 'Carol S. Dweck',
    philosophy: 'psychologic',
    riskLevel: 'medium',
    category: 'Growth Mindset',
    amazonLink: 'https://www.amazon.com/Mindset-Psychology-Success-Carol-Dweck/dp/0345472322',
    shortLink: 'amzn.to/psychologic-medium-5',
    recommendationReason: '成长型思维模式，如何培养成功的心态',
    keyConcepts: ['成长型思维', '固定型思维', '学习能力', '成功心态'],
    targetAudience: '教育工作者，个人发展追求者',
    publicationYear: 2006
  },

  // 心理派 - 高风险 (5本)
  {
    id: 'psychologic_high_1',
    title: 'The Psychology of Trading',
    author: 'Brett N. Steenbarger',
    philosophy: 'psychologic',
    riskLevel: 'high',
    category: 'Trading Psychology',
    amazonLink: 'https://www.amazon.com/Psychology-Trading-Tools-Methods-Psychology/dp/0471412089',
    shortLink: 'amzn.to/psychologic-high-1',
    recommendationReason: '交易心理学，专业交易员的心理训练方法',
    keyConcepts: ['交易心理', '情绪管理', '压力控制', '心理训练'],
    targetAudience: '专业交易员，交易心理学研究者',
    publicationYear: 2002
  },
  {
    id: 'psychologic_high_2',
    title: 'Trading in the Zone',
    author: 'Mark Douglas',
    philosophy: 'psychologic',
    riskLevel: 'high',
    category: 'Trading Psychology',
    amazonLink: 'https://www.amazon.com/Trading-Zone-Confidence-Discipline-Psychology/dp/0735201447',
    shortLink: 'amzn.to/psychologic-high-2',
    recommendationReason: '交易心理区域，达到最佳交易状态的心理方法',
    keyConcepts: ['交易状态', '心理区域', '自信建立', '纪律培养'],
    targetAudience: '专业交易员，交易心理学专家',
    publicationYear: 2000
  },
  {
    id: 'psychologic_high_3',
    title: 'The Disciplined Trader',
    author: 'Mark Douglas',
    philosophy: 'psychologic',
    riskLevel: 'high',
    category: 'Trading Discipline',
    amazonLink: 'https://www.amazon.com/Disciplined-Trader-Developing-Winning-Attitudes/dp/0132157578',
    shortLink: 'amzn.to/psychologic-high-3',
    recommendationReason: '纪律交易员，培养成功交易者的心理态度',
    keyConcepts: ['交易纪律', '心理态度', '风险控制', '成功习惯'],
    targetAudience: '专业交易员，交易纪律研究者',
    publicationYear: 1990
  },
  {
    id: 'psychologic_high_4',
    title: 'The Art of Learning',
    author: 'Josh Waitzkin',
    philosophy: 'psychologic',
    riskLevel: 'high',
    category: 'Learning Psychology',
    amazonLink: 'https://www.amazon.com/Art-Learning-Journey-Optimal-Performance/dp/0743277461',
    shortLink: 'amzn.to/psychologic-high-4',
    recommendationReason: '学习艺术，从国际象棋到武术的学习心理学',
    keyConcepts: ['学习心理学', '技能掌握', '心理韧性', '表现优化'],
    targetAudience: '学习研究者，技能发展追求者',
    publicationYear: 2007
  },
  {
    id: 'psychologic_high_5',
    title: 'Peak Performance',
    author: 'Brad Stulberg & Steve Magness',
    philosophy: 'psychologic',
    riskLevel: 'high',
    category: 'Performance Psychology',
    amazonLink: 'https://www.amazon.com/Peak-Performance-Elevate-Burnout-Science/dp/162336793X',
    shortLink: 'amzn.to/psychologic-high-5',
    recommendationReason: '巅峰表现，科学提升表现和避免倦怠的方法',
    keyConcepts: ['表现提升', '倦怠预防', '压力管理', '恢复策略'],
    targetAudience: '表现研究者，高压工作者',
    publicationYear: 2017
  }
]

// 获取推荐书籍的函数
export function getRecommendedBooks(
  philosophy: 'academic' | 'business' | 'psychologic',
  riskLevel: 'low' | 'medium' | 'high',
  deviationLevel: 'low' | 'medium' | 'high',
  assetType?: string
): InvestmentBook[] {
  // 基础筛选：流派和风险等级
  let filteredBooks = INVESTMENT_BOOKS_DATABASE.filter(
    book => book.philosophy === philosophy && book.riskLevel === riskLevel
  )
  
  // 根据偏差程度调整推荐
  if (deviationLevel === 'high') {
    // 高偏差：推荐更多风险管理书籍
    filteredBooks = filteredBooks.filter(book => 
      book.category.includes('Risk') || 
      book.category.includes('Management') ||
      book.category.includes('Psychology')
    )
  } else if (deviationLevel === 'low') {
    // 低偏差：推荐更多进阶书籍
    filteredBooks = filteredBooks.filter(book => 
      book.category.includes('Advanced') ||
      book.category.includes('Strategy') ||
      book.category.includes('Theory')
    )
  }
  
  // 根据资产类型调整（如果指定）
  if (assetType) {
    filteredBooks = filteredBooks.filter(book => 
      book.keyConcepts.some(concept => 
        concept.toLowerCase().includes(assetType.toLowerCase())
      )
    )
  }
  
  // 返回前3本书
  return filteredBooks.slice(0, 3)
}

// 导入多语言支持
export { getBookTranslation, generateRecommendationReason as generateRecommendationReasonMultiLang } from './investment-books-translations'

// 生成推荐理由的函数（保持向后兼容）
export function generateRecommendationReason(
  _book: InvestmentBook,
  philosophy: string,
  riskLevel: string,
  _deviationLevel: string
): string {
  const reasons: Record<string, Record<string, string>> = {
    academic: {
      low: 'Based on academic research value investing principles, suitable for conservative investors',
      medium: 'Investment strategy combining theory and practice, balancing risk and return',
      high: 'Cutting-edge investment theory and risk management methods, suitable for professional investors'
    },
    business: {
      low: 'Practical wealth accumulation strategies, suitable for ordinary people investment needs',
      medium: 'Balanced business investment methods, combining theory and practice',
      high: 'Innovative business strategies and entrepreneurial thinking, suitable for pursuing high returns'
    },
    psychologic: {
      low: 'Foundation of investment psychology, helping understand psychological factors in investment decisions',
      medium: 'Application of behavioral finance, avoiding common investment psychological traps',
      high: 'Advanced trading psychology, suitable for professional traders and investors'
    }
  }
  
  return reasons[philosophy]?.[riskLevel] || 
         'Professional recommendation based on your investment preferences and risk tolerance'
}
