export const languages = {
  en: {
    // 投资哲学选择页面
    methodology: {
      title: 'Choose Your Investment Philosophy',
      subtitle: 'Different investment philosophies will guide you to different paths of wealth',
      academic: {
        name: 'Academic',
        description: 'Traditional investment method based on modern portfolio theory and efficient market hypothesis',
        longDescription: 'Academic investment philosophy originates from modern portfolio theory, emphasizing portfolio diversification and risk dispersion. This approach is based on Markowitz\'s mean-variance analysis, optimizing investment portfolios through mathematical models to pursue maximum returns at given risk levels. Academic investors typically adopt passive investment strategies such as index fund investing and believe in the efficient market hypothesis.',
        reasoning: {
          low: 'Academic low-risk approach emphasizes capital preservation with minimal crypto exposure (1%). Maintains conservative real estate (36%) and equity (30%) allocation, using cash (20%) and funds (10%) for stability. Includes 3% insurance for risk management. In rate-cut cycles, this conservative stance protects against volatility while capturing modest growth opportunities.',
          medium: 'Academic medium-risk strategy balances growth and stability with 2% crypto allocation. Increases equity exposure to 50% while reducing real estate to 25%, maintaining cash (15%) and funds (5%) for rebalancing. Includes 3% insurance for protection. This approach captures rate-cut benefits while maintaining academic discipline.',
          high: 'Academic high-risk approach maximizes growth potential with 3% crypto exposure. Heavy equity allocation (70%) captures rate-cut momentum, reduced real estate (14%) and cash (5%) for maximum growth. Maintains fund allocation (5%) and 3% insurance for diversification within academic framework.'
        },
        riskProfile: 'Based on academic theory, pursuing long-term stable returns',
        specialFeatures: ['Strict CAPM model application', 'Markowitz portfolio theory', 'Efficient market hypothesis application']
      },
      business: {
        name: 'Business Practical',
        description: 'Practical investment strategy based on institutional investor experience and market microstructure',
        longDescription: 'Business practical investment philosophy emphasizes market insight and practical experience, combining macroeconomic analysis, industry trend judgment, and company fundamental research. This method values market timing and is good at capturing investment opportunities brought by market sentiment changes and unexpected events. Business practical investors usually have rich market experience and can quickly adapt to market changes and make corresponding adjustments.',
        reasoning: {
          low: 'Business low-risk strategy maintains professional discipline with 3% crypto exposure. Balanced real estate (29%) and equity (40%) allocation, using funds (10%) and cash (15%) for tactical opportunities. Includes 3% insurance for risk management. This approach captures rate-cut momentum while maintaining business risk management standards.',
          medium: 'Business medium-risk approach leverages market opportunities with 6% crypto allocation. Heavy equity focus (60%) maximizes rate-cut benefits, reduced real estate (16%) and cash (10%) for aggressive positioning. Fund allocation (5%) and 3% insurance provide professional management within business framework.',
          high: 'Business high-risk strategy maximizes rate-cut opportunities with 9% crypto exposure. Maximum equity allocation (75%) captures full momentum, minimal real estate (3%) and cash (5%) for maximum growth. Fund allocation (5%) and 3% insurance maintain professional diversification standards.'
        },
        riskProfile: 'Aggressive strategy with professional tools and risk management',
        specialFeatures: ['Quantitative trading strategies', 'Risk management tools', 'Institutional-level portfolios']
      },
      psychologic: {
        name: 'Psychological',
        description: 'Contrarian investment philosophy based on group psychology and macro trends',
        longDescription: 'Psychological history investment philosophy is based on behavioral finance theory, believing that the psychological state and group behavior of market participants are key factors affecting asset prices. This method predicts market trends by analyzing market sentiment, investor psychological biases, and group behavior patterns. Psychological history investors are good at identifying market panic and greed emotions and using these emotional fluctuations for contrarian investment.',
        reasoning: {
          low: 'Psychological low-risk approach uses 10% crypto for behavioral analysis while maintaining stability. Balanced real estate (17%) and equity (35%) allocation, with funds (15%) and cash (20%) for emotional market opportunities. Includes 3% insurance for risk management. This strategy identifies market sentiment shifts within conservative parameters.',
          medium: 'Psychological medium-risk strategy leverages 15% crypto for enhanced behavioral insights. Increased equity (40%) captures sentiment-driven opportunities, reduced real estate (12%) and cash (15%) for dynamic positioning. Fund allocation (15%) and 3% insurance support psychological analysis framework.',
          high: 'Psychological high-risk approach maximizes behavioral opportunities with 30% crypto exposure. Heavy equity focus (35%) captures full sentiment momentum, minimal real estate (7%) and cash (10%) for maximum flexibility. Fund allocation (15%) and 3% insurance support advanced psychological analysis.'
        },
        riskProfile: 'Contrarian strategy based on behavioral finance theory',
        specialFeatures: ['Market sentiment analysis', 'Behavioral bias identification', 'Contrarian investment timing']
      },
      riskLevels: {
        low: 'Low Risk',
        medium: 'Medium Risk',
        high: 'High Risk',
        lowDescription: 'Conservative and steady, pursuing stable returns',
        mediumDescription: 'Balanced approach, seeking steady long-term growth',
        highDescription: 'Aggressive strategy, pursuing maximum returns',
        lowLogic: 'Low-risk investment logic emphasizes capital preservation and stable returns, mainly investing in government bonds, high-grade corporate bonds, money market funds and other low-risk assets. In the investment portfolio, fixed-income assets typically account for more than 70%, and equity assets account for no more than 30%. Suitable for investors with low risk tolerance and short investment horizons.',
        mediumLogic: 'Medium-risk investment logic balances returns and risks, achieving long-term steady growth through reasonable asset allocation. In the investment portfolio, the proportion of stocks and bonds is roughly equal, reducing the risk impact of single assets through diversification. This configuration can both enjoy the growth potential of the stock market and provide stable income sources through bonds.',
        highLogic: 'High-risk investment logic pursues maximum returns, with equity assets in the investment portfolio typically accounting for more than 70%, and may also include commodities, real estate trusts and other alternative investments. This configuration can fully enjoy the benefits of economic growth and stock market gains, but also faces greater market volatility risks. Suitable for investors with strong risk tolerance and investment horizons of more than 5 years.'
      },
      continue: 'Continue to Next Step',
      back: 'Back',
      next: 'Next',
      selectRiskLevel: 'Select Your Risk Tolerance',
      applyRecommendations: 'Apply Recommendations',
      configurationAdvice: 'Configuration Advice',
      suggestedAllocation: 'Suggested Allocation Ratio',
      investmentLogic: 'Investment Logic',
      specialFeatures: 'Special Features',
      riskProfile: 'Risk Profile',
      reasoning: 'Reasoning'
    },
    // 通用
    common: {
      languageSwitch: 'Language',
      english: 'English',
      chinese: '中文'
    }
  },
  zh: {
    // 投资哲学选择页面
    methodology: {
      title: '选择您的投资哲学',
      subtitle: '不同的投资理念将引导您走向不同的财富之路',
      academic: {
        name: '学院派',
        description: '基于现代投资组合理论和有效市场假说的传统投资方法',
        longDescription: '学院派投资理念源于现代投资组合理论，强调资产配置的多样化和风险分散。这种方法基于马科维茨的均值-方差分析，通过数学模型优化投资组合，追求在给定风险水平下的最大收益。学院派投资者通常采用被动投资策略，如指数基金投资，并相信市场有效性假说。',
        reasoning: {
          low: '学院派低风险策略强调资本保值，加密资产配置最低（1%）。保持保守的房产（36%）和股票（30%）配置，使用现金（20%）和基金（10%）维持稳定性。包含3%保险用于风险管理。在降息周期中，这种保守立场既能抵御波动，又能捕捉适度增长机会。',
          medium: '学院派中风险策略平衡增长与稳定性，加密资产配置2%。增加股票敞口至50%，同时减少房产至25%，保持现金（15%）和基金（5%）用于再平衡。包含3%保险用于保护。这种方法既能捕捉降息收益，又能保持学院派纪律。',
          high: '学院派高风险策略最大化增长潜力，加密资产配置3%。重仓股票（70%）捕捉降息动能，减少房产（14%）和现金（5%）以最大化增长。保持基金配置（5%）和3%保险在学院派框架内实现多样化。'
        }
      },
      business: {
        name: '商业实战派',
        description: '基于机构投资者经验和市场微观结构的实战策略',
        longDescription: '商业实战派投资理念强调市场洞察力和实战经验，结合宏观经济分析、行业趋势判断和公司基本面研究。这种方法重视市场时机选择，善于捕捉市场情绪变化和突发事件带来的投资机会。商业实战派投资者通常具有丰富的市场经验，能够快速适应市场变化并做出相应调整。',
        reasoning: {
          low: '商业实战派低风险策略保持专业纪律，加密资产配置3%。平衡的房产（29%）和股票（40%）配置，使用基金（10%）和现金（15%）捕捉战术机会。包含3%保险用于风险管理。这种方法既能捕捉降息动能，又能保持商业风险管理标准。',
          medium: '商业实战派中风险策略利用市场机会，加密资产配置6%。重仓股票（60%）最大化降息收益，减少房产（16%）和现金（10%）以积极定位。基金配置（5%）和3%保险在商业框架内提供专业管理。',
          high: '商业实战派高风险策略最大化降息机会，加密资产配置9%。最大股票配置（75%）捕捉全部动能，最少房产（3%）和现金（5%）以最大化增长。基金配置（5%）和3%保险保持专业多样化标准。'
        }
      },
      psychologic: {
        name: '心理史学派',
        description: '基于群体心理和宏观趋势的逆向投资哲学',
        longDescription: '心理史学派投资理念基于行为金融学理论，认为市场参与者的心理状态和群体行为是影响资产价格的关键因素。这种方法通过分析市场情绪、投资者心理偏差和群体行为模式来预测市场走势。心理史学派投资者善于识别市场恐慌和贪婪情绪，并利用这些情绪波动进行逆向投资。',
        reasoning: {
          low: '心理史学派低风险策略使用10%加密资产进行行为分析，同时保持稳定性。平衡的房产（17%）和股票（35%）配置，基金（15%）和现金（20%）用于情绪市场机会。包含3%保险用于风险管理。这种策略在保守参数内识别市场情绪变化。',
          medium: '心理史学派中风险策略利用15%加密资产增强行为洞察。增加股票（40%）捕捉情绪驱动机会，减少房产（12%）和现金（15%）以动态定位。基金配置（15%）和3%保险支持心理分析框架。',
          high: '心理史学派高风险策略最大化行为机会，加密资产配置30%。重仓股票（35%）捕捉全部情绪动能，最少房产（7%）和现金（10%）以最大化灵活性。基金配置（15%）和3%保险支持高级心理分析。'
        }
      },
      riskLevels: {
        low: '低风险',
        medium: '中风险',
        high: '高风险',
        lowDescription: '保守稳健，追求稳定收益',
        mediumDescription: '平衡策略，追求长期稳健增长',
        highDescription: '积极策略，追求最大化收益',
        lowLogic: '低风险投资逻辑强调资本保值和稳定收益，主要投资于国债、高等级企业债、货币市场基金等低风险资产。投资组合中固定收益类资产占比通常在70%以上，股票类资产占比不超过30%。适合风险承受能力较低、投资期限较短的投资者。',
        mediumLogic: '中风险投资逻辑平衡收益与风险，通过合理的资产配置实现长期稳健增长。投资组合中股票与债券比例大致相等，通过分散投资降低单一资产的风险影响。这种配置既能享受股票市场的增长潜力，又能通过债券提供稳定的收益来源。',
        highLogic: '高风险投资逻辑追求最大化收益，投资组合中股票类资产占比通常在70%以上，可能还包括商品、房地产信托等另类投资。这种配置能够充分享受经济增长和股票市场的上涨收益，但同时也面临较大的市场波动风险。适合风险承受能力强、投资期限在5年以上的投资者。'
      },
      continue: '继续下一步',
      back: '返回',
      next: '下一步',
      selectRiskLevel: '选择您的风险承受能力',
      applyRecommendations: '应用建议',
      configurationAdvice: '配置建议',
      suggestedAllocation: '建议配置比例',
      investmentLogic: '投资逻辑',
      specialFeatures: '特色功能',
      riskProfile: '风险特征',
      reasoning: '投资逻辑'
    },
    // 通用
    common: {
      languageSwitch: '语言',
      english: 'English',
      chinese: '中文'
    }
  }
}

export type Language = keyof typeof languages
export type LanguageKey = keyof typeof languages.en
