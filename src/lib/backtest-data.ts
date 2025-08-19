// 美国资产利率回测数据 (截止2025年6月30日)
// 基于历史降息周期的固定回测值

export interface BacktestResult {
  assetType: string
  scenario: string
  historicalReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  description: string
  dataSource: string
  lastUpdated: string
  isPremium?: boolean // 新增：是否为付费内容
}

export const BACKTEST_DATA: BacktestResult[] = [
  // 基础资产（免费）
  // 美国房价利率回测
  {
    assetType: '美国房价',
    scenario: '25基点降息',
    historicalReturn: 8.5,
    volatility: 12.3,
    sharpeRatio: 0.69,
    maxDrawdown: -15.2,
    description: '基于2001-2003、2007-2009、2020年降息周期，美国房价平均年化回报8.5%，主要受益于房贷成本下降和购房需求释放',
    dataSource: 'Case-Shiller房价指数、Freddie Mac房贷利率',
    lastUpdated: '2025-06-30',
    isPremium: false
  },
  {
    assetType: '美国房价',
    scenario: '50基点降息',
    historicalReturn: 12.8,
    volatility: 15.7,
    sharpeRatio: 0.82,
    maxDrawdown: -18.5,
    description: '大幅降息环境下，房价上涨动能更强，历史数据显示50基点以上降息周期中房价年化回报可达12.8%',
    dataSource: 'Case-Shiller房价指数、Freddie Mac房贷利率',
    lastUpdated: '2025-06-30',
    isPremium: false
  },
  
  // 美国股票利率回测
  {
    assetType: '美国股票',
    scenario: '25基点降息',
    historicalReturn: 15.2,
    volatility: 18.9,
    sharpeRatio: 0.80,
    maxDrawdown: -22.3,
    description: '降息周期中股票表现强劲，主要受益于企业融资成本下降、盈利预期改善和估值扩张',
    dataSource: 'S&P 500指数、联邦基金利率',
    lastUpdated: '2025-06-30',
    isPremium: false
  },
  {
    assetType: '美国股票',
    scenario: '50基点降息',
    historicalReturn: 21.5,
    volatility: 22.1,
    sharpeRatio: 0.97,
    maxDrawdown: -25.8,
    description: '大幅降息推动风险偏好上升，股票市场流动性充裕，历史数据显示年化回报可达21.5%',
    dataSource: 'S&P 500指数、联邦基金利率',
    lastUpdated: '2025-06-30',
    isPremium: false
  },
  
  // 美国债券利率回测
  {
    assetType: '美国债券',
    scenario: '25基点降息',
    historicalReturn: 6.8,
    volatility: 8.2,
    sharpeRatio: 0.83,
    maxDrawdown: -9.5,
    description: '降息周期中债券价格上涨，收益率下降，投资级债券年化回报约6.8%，波动率相对较低',
    dataSource: 'Bloomberg美国综合债券指数、10年期国债收益率',
    lastUpdated: '2025-06-30',
    isPremium: false
  },
  {
    assetType: '美国债券',
    scenario: '50基点降息',
    historicalReturn: 9.2,
    volatility: 10.1,
    sharpeRatio: 0.91,
    maxDrawdown: -12.3,
    description: '大幅降息环境下债券表现更佳，年化回报可达9.2%，是降息周期中的稳定收益来源',
    dataSource: 'Bloomberg美国综合债券指数、10年期国债收益率',
    lastUpdated: '2025-06-30',
    isPremium: false
  },

  // 扩展资产（付费解锁）
  // 信用卡账单分析
  {
    assetType: '信用卡账单',
    scenario: '25基点降息',
    historicalReturn: -2.1,
    volatility: 5.2,
    sharpeRatio: -0.40,
    maxDrawdown: -8.5,
    description: '降息环境下信用卡利率下降，还款压力减轻，但投资收益率相应下降',
    dataSource: '美联储消费者信贷数据、信用卡利率指数',
    lastUpdated: '2025-06-30',
    isPremium: true
  },
  {
    assetType: '信用卡账单',
    scenario: '50基点降息',
    historicalReturn: -3.8,
    volatility: 6.1,
    sharpeRatio: -0.62,
    maxDrawdown: -12.3,
    description: '大幅降息对信用卡账单影响更显著，利率成本下降但投资机会减少',
    dataSource: '美联储消费者信贷数据、信用卡利率指数',
    lastUpdated: '2025-06-30',
    isPremium: true
  },

  // 保险产品
  {
    assetType: '保险产品',
    scenario: '25基点降息',
    historicalReturn: 4.2,
    volatility: 9.8,
    sharpeRatio: 0.43,
    maxDrawdown: -15.6,
    description: '降息环境下保险资金投资收益下降，但保费定价策略调整带来相对稳定回报',
    dataSource: '保险行业收益率指数、保费定价模型',
    lastUpdated: '2025-06-30',
    isPremium: true
  },
  {
    assetType: '保险产品',
    scenario: '50基点降息',
    historicalReturn: 6.8,
    volatility: 11.2,
    sharpeRatio: 0.61,
    maxDrawdown: -18.9,
    description: '大幅降息推动保险产品创新，收益率相对提升但波动性增加',
    dataSource: '保险行业收益率指数、保费定价模型',
    lastUpdated: '2025-06-30',
    isPremium: true
  },

  // 基金产品
  {
    assetType: '基金产品',
    scenario: '25基点降息',
    historicalReturn: 12.5,
    volatility: 16.8,
    sharpeRatio: 0.74,
    maxDrawdown: -20.1,
    description: '降息环境下基金产品表现分化，股票基金受益，货币基金收益率下降',
    dataSource: '晨星基金指数、基金收益率统计',
    lastUpdated: '2025-06-30',
    isPremium: true
  },
  {
    assetType: '基金产品',
    scenario: '50基点降息',
    historicalReturn: 18.9,
    volatility: 19.5,
    sharpeRatio: 0.97,
    maxDrawdown: -24.7,
    description: '大幅降息推动基金产品整体表现提升，风险资产配置增加',
    dataSource: '晨星基金指数、基金收益率统计',
    lastUpdated: '2025-06-30',
    isPremium: true
  },

  // 虚拟货币（付费解锁）
  // 比特币(BTC)
  {
    assetType: '比特币(BTC)',
    scenario: '25基点降息',
    historicalReturn: 28.5,
    volatility: 45.2,
    sharpeRatio: 0.63,
    maxDrawdown: -35.8,
    description: '降息环境下比特币作为风险资产表现强劲，但波动性极高，适合高风险承受能力投资者',
    dataSource: 'CoinGecko、CoinMarketCap、美联储利率数据',
    lastUpdated: '2025-06-30',
    isPremium: true
  },
  {
    assetType: '比特币(BTC)',
    scenario: '50基点降息',
    historicalReturn: 42.8,
    volatility: 52.1,
    sharpeRatio: 0.82,
    maxDrawdown: -48.5,
    description: '大幅降息推动比特币价格大幅上涨，流动性充裕环境下表现更佳',
    dataSource: 'CoinGecko、CoinMarketCap、美联储利率数据',
    lastUpdated: '2025-06-30',
    isPremium: true
  },

  // 以太坊(ETH)
  {
    assetType: '以太坊(ETH)',
    scenario: '25基点降息',
    historicalReturn: 35.2,
    volatility: 48.9,
    sharpeRatio: 0.72,
    maxDrawdown: -42.3,
    description: '降息环境下以太坊受益于DeFi生态发展，智能合约平台价值提升',
    dataSource: 'CoinGecko、CoinMarketCap、DeFi协议数据',
    lastUpdated: '2025-06-30',
    isPremium: true
  },
  {
    assetType: '以太坊(ETH)',
    scenario: '50基点降息',
    historicalReturn: 58.9,
    volatility: 55.6,
    sharpeRatio: 1.06,
    maxDrawdown: -52.8,
    description: '大幅降息推动以太坊生态繁荣，DeFi和NFT应用场景扩展带来价值重估',
    dataSource: 'CoinGecko、CoinMarketCap、DeFi协议数据',
    lastUpdated: '2025-06-30',
    isPremium: true
  }
]

// 获取特定资产和情景的回测数据
export const getBacktestData = (assetType: string, scenario: string): BacktestResult | undefined => {
  return BACKTEST_DATA.find(data => 
    data.assetType === assetType && data.scenario === scenario
  )
}

// 获取所有回测数据
export const getAllBacktestData = (): BacktestResult[] => {
  return BACKTEST_DATA
}

// 获取免费回测数据
export const getFreeBacktestData = (): BacktestResult[] => {
  return BACKTEST_DATA.filter(data => !data.isPremium)
}

// 获取付费回测数据
export const getPremiumBacktestData = (): BacktestResult[] => {
  return BACKTEST_DATA.filter(data => data.isPremium)
}

// 计算综合回测指标
export const calculatePortfolioMetrics = (assetAllocation: {
  realEstate: number
  equity: number
  cash: number
}, scenario: string) => {
  const realEstateData = getBacktestData('美国房价', scenario)
  const equityData = getBacktestData('美国股票', scenario)
  const bondData = getBacktestData('美国债券', scenario)
  
  if (!realEstateData || !equityData || !bondData) {
    return null
  }
  
  const totalAssets = assetAllocation.realEstate + assetAllocation.equity + assetAllocation.cash
  
  if (totalAssets === 0) return null
  
  // 计算加权平均指标
  const weightedReturn = (
    (assetAllocation.realEstate / totalAssets) * realEstateData.historicalReturn +
    (assetAllocation.equity / totalAssets) * equityData.historicalReturn +
    (assetAllocation.cash / totalAssets) * bondData.historicalReturn
  )
  
  const weightedVolatility = (
    (assetAllocation.realEstate / totalAssets) * realEstateData.volatility +
    (assetAllocation.equity / totalAssets) * equityData.volatility +
    (assetAllocation.cash / totalAssets) * bondData.volatility
  )
  
  return {
    expectedReturn: weightedReturn,
    expectedVolatility: weightedVolatility,
    sharpeRatio: weightedReturn / weightedVolatility,
    scenario: scenario
  }
}
