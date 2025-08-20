import { useState } from 'react'
import { 
  AcademicCapIcon, 
  BuildingLibraryIcon, 
  SparklesIcon,
  LightBulbIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MusicalNoteIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '../contexts/LanguageContext'
import { useMusic } from '../contexts/MusicContext'
import LanguageSwitcher from './LanguageSwitcher'

interface MethodologyPageProps {
  onBack: () => void
  onNext: () => void
  onAssetChange: (assets: any) => void
  onMethodologySelect: (methodology: string, riskLevel: 'low' | 'medium' | 'high') => void
}

interface InvestmentBelief {
  id: string
  name: string
  description: string
  longDescription: string
  icon: any
  color: string
  imageUrl: string
  musicUrl: string
  riskMusic: {
    low: string
    medium: string
    high: string
  }
  riskLevels: {
    low: {
      realEstate: number
      equity: number
      cash: number
      fund: number
      crypto: number
      insurance: number
    }
    medium: {
      realEstate: number
      equity: number
      cash: number
      fund: number
      crypto: number
      insurance: number
    }
    high: {
      realEstate: number
      equity: number
      cash: number
      fund: number
      crypto: number
      insurance: number
    }
  }
  reasoning: string
  riskProfile: string
  specialFeatures: string[]
}

export default function MethodologyPage({ onBack, onNext, onAssetChange, onMethodologySelect }: MethodologyPageProps) {
  const { t, language } = useLanguage()
  const { selectedMusic, setSelectedMusic, setCurrentTrack } = useMusic()
  const [selectedBelief, setSelectedBelief] = useState<string>('')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [hoveredBelief, setHoveredBelief] = useState<string>('')
  const [showRiskTest, setShowRiskTest] = useState(false)
  const [showAssetWarning, setShowAssetWarning] = useState(false)
  const [assetWarningMessage, setAssetWarningMessage] = useState('')
  const [selectedAssetRange, setSelectedAssetRange] = useState<string>('')
  const [showMusicSwitchPrompt, setShowMusicSwitchPrompt] = useState(false)
  const [suggestedRiskLevel, setSuggestedRiskLevel] = useState<'low' | 'medium' | 'high'>('medium')
  const [selectedTimeHorizon, setSelectedTimeHorizon] = useState<string>('')
  const [selectedRiskTolerance, setSelectedRiskTolerance] = useState<string>('')

  const investmentBeliefs: InvestmentBelief[] = [
    {
      id: 'academic',
      name: t('methodology.academic.name'),
      description: t('methodology.academic.description'),
      longDescription: t('methodology.academic.longDescription'),
      icon: AcademicCapIcon,
      color: 'from-yellow-400 to-amber-600',
      imageUrl: '/images/methodology/textbook.png',
      musicUrl: 'https://open.spotify.com/embed/track/4QjAXpcwPIMU64WUUJ62Jh?si=7a8f511390c74f09',
      riskMusic: {
        low: 'https://open.spotify.com/embed/track/4RSqlEGjuKA6lEpVamxsgE?si=1dbf4c276f8f448d',
        medium: 'https://open.spotify.com/embed/track/4QjAXpcwPIMU64WUUJ62Jh?si=7a8f511390c74f09',
        high: 'https://open.spotify.com/embed/track/1Qr17u2S9kNDzTeWAJCY5N?si=bf030887d3594713'
      },
      riskLevels: {
        low: {
          realEstate: 36,
          equity: 30,
          cash: 20,
          fund: 10,
          crypto: 1,
          insurance: 3
        },
        medium: {
          realEstate: 25,
          equity: 50,
          cash: 15,
          fund: 5,
          crypto: 2,
          insurance: 3
        },
        high: {
          realEstate: 14,
          equity: 70,
          cash: 5,
          fund: 5,
          crypto: 3,
          insurance: 3
        }
      },
      reasoning: t('methodology.academic.reasoning'),
      riskProfile: t('methodology.academic.riskProfile'),
      specialFeatures: language === 'en' ? 
        ['Strict CAPM model application', 'Markowitz portfolio theory', 'Efficient market hypothesis application'] :
        ['严格遵循CAPM模型', '马科维茨投资组合理论', '有效市场假说应用']
    },
    {
      id: 'business',
      name: t('methodology.business.name'),
      description: t('methodology.business.description'),
      longDescription: t('methodology.business.longDescription'),
      icon: BuildingLibraryIcon,
      color: 'from-gray-900 to-red-800',
      imageUrl: '/images/methodology/wallstreet.png',
      musicUrl: 'https://open.spotify.com/embed/track/27qC3KK5wjQzyNenY53fep?si=ade2a211c66443c4',
      riskMusic: {
        low: 'https://open.spotify.com/embed/track/02BcXEH1zJYbXSabPtNlKf?si=2111380ace994a80',
        medium: 'https://open.spotify.com/embed/track/27qC3KK5wjQzyNenY53fep?si=ade2a211c66443c4',
        high: 'https://open.spotify.com/embed/track/2loJGWyjNx9sXC2JXgCV0S?si=ce248100793f4bcf'
      },
      riskLevels: {
        low: {
          realEstate: 29,
          equity: 40,
          cash: 15,
          fund: 10,
          crypto: 3,
          insurance: 3
        },
        medium: {
          realEstate: 16,
          equity: 60,
          cash: 10,
          fund: 5,
          crypto: 6,
          insurance: 3
        },
        high: {
          realEstate: 3,
          equity: 75,
          cash: 5,
          fund: 5,
          crypto: 9,
          insurance: 3
        }
      },
      reasoning: t('methodology.business.reasoning'),
      riskProfile: t('methodology.business.riskProfile'),
      specialFeatures: language === 'en' ? 
        ['Quantitative trading strategies', 'Risk management tools', 'Institutional-level portfolios'] :
        ['量化交易策略', '风险管理工具', '机构级投资组合']
    },
    {
      id: 'psychologic',
      name: t('methodology.psychologic.name'),
      description: t('methodology.psychologic.description'),
      longDescription: t('methodology.psychologic.longDescription'),
      icon: SparklesIcon,
      color: 'from-white via-gray-100 to-gray-200',
      imageUrl: '/images/methodology/psychohistory.png',
      musicUrl: 'https://open.spotify.com/embed/track/4ZT5vcmGejiaDvIH9AAIME?si=1f5284fbc47a4fe6',
      riskMusic: {
        low: 'https://open.spotify.com/embed/track/5r6l0sPvfeAPjQ67fCgOwG?si=b3317ea2421345b1',
        medium: 'https://open.spotify.com/embed/track/4ZT5vcmGejiaDvIH9AAIME?si=1f5284fbc47a4fe6',
        high: 'https://open.spotify.com/embed/track/0ASvZIiB2Ml32DlUhfaOhx?si=7d45431248274295'
      },
      riskLevels: {
        low: {
          realEstate: 17,
          equity: 35,
          cash: 20,
          fund: 15,
          crypto: 10,
          insurance: 3
        },
        medium: {
          realEstate: 12,
          equity: 40,
          cash: 15,
          fund: 15,
          crypto: 15,
          insurance: 3
        },
        high: {
          realEstate: 7,
          equity: 35,
          cash: 10,
          fund: 15,
          crypto: 30,
          insurance: 3
        }
      },
      reasoning: t('methodology.psychologic.reasoning'),
      riskProfile: t('methodology.psychologic.riskProfile'),
      specialFeatures: language === 'en' ? 
        ['Market sentiment analysis', 'Behavioral bias identification', 'Contrarian investment timing'] :
        ['市场情绪分析', '行为偏差识别', '逆向投资时机']
    }
  ]

  const handleBeliefSelection = (beliefId: string) => {
    setSelectedBelief(beliefId)
    setShowRecommendations(true)
  }



  // 资产门槛检查函数
  const checkAssetThreshold = (assetRange: string) => {
    if (assetRange === 'under10k') { // 仅当选择1万美元以下时
      setAssetWarningMessage(language === 'en' 
        ? '🎮 Your total assets are below $10,000. At this level, asset allocation is like your character studying which endgame gear to wear for an epic raid while still being level 10 - what you need to do is level up and accumulate assets first! 💪' 
        : '🎮 您的总资产低于1万美元。在这个水平上，资产配置就像是你的角色在还没满级的情形下研究搭配哪一件毕业装备去挑战史诗难度团队副本——你要做的事练级——积累资产！💪')
      setShowAssetWarning(true)
      return false
    }
    return true
  }

  /**
   * 科学的风险评分计算函数 - 优化版
   * 
   * 设计原理：
   * 1. 资产范围权重最高(8分)，因为资产规模直接影响风险承受能力
   * 2. 时间跨度和风险偏好各占3分，体现投资策略的灵活性
   * 3. 总分范围4-14分，确保三种风险等级分布均衡
   * 
   * 评分标准：
   * - 低风险(4-6分): 约25%用户 - 保守型投资者
   * - 中风险(7-10分): 约50%用户 - 平衡型投资者  
   * - 高风险(11-14分): 约25%用户 - 激进型投资者
   * 
   * 资产导向原则：
   * - 高资产人群(100万+)更倾向于高风险建议
   * - 低资产人群(1万以下)更倾向于低风险建议
   * - 中等资产人群分布在中低风险区间
   */
  const calculateRiskScore = (assetRange: string, timeHorizon: string, riskTolerance: string) => {
    let score = 0
    
    // 资产范围评分 - 权重最高，直接影响风险承受能力
    if (assetRange === 'under10k') score += 2        // 低资产：2分
    else if (assetRange === '10k-100k') score += 4   // 中低资产：4分
    else if (assetRange === '100k-1m') score += 6    // 中高资产：6分
    else if (assetRange === 'over1m') score += 8     // 高资产：8分
    
    // 投资时间跨度评分 - 中等权重
    if (timeHorizon === 'short') score += 1          // 短期：1分
    else if (timeHorizon === 'medium') score += 2    // 中期：2分
    else if (timeHorizon === 'long') score += 3      // 长期：3分
    
    // 风险承受能力评分 - 中等权重
    if (riskTolerance === 'conservative') score += 1  // 保守：1分
    else if (riskTolerance === 'moderate') score += 2 // 中等：2分
    else if (riskTolerance === 'aggressive') score += 3 // 激进：3分
    
    // 科学的风险等级判定 - 基于正态分布原理，确保三种风险等级分布均衡
    // 总分范围：4-14分
    if (score <= 6) return 'low'      // 4-6分：低风险 (约25%)
    else if (score <= 10) return 'medium'  // 7-10分：中风险 (约50%)
    else return 'high'                 // 11-14分：高风险 (约25%)
  }

  // 检查音乐是否需要切换
  const checkMusicSwitch = (calculatedRiskLevel: 'low' | 'medium' | 'high') => {
    if (calculatedRiskLevel !== selectedRiskLevel && selectedBelief && selectedMusic) {
      setSuggestedRiskLevel(calculatedRiskLevel)
      setShowMusicSwitchPrompt(true)
    }
  }

  // 切换到建议的音乐
  const switchToSuggestedMusic = () => {
    if (selectedBelief && suggestedRiskLevel) {
      const belief = investmentBeliefs.find(b => b.id === selectedBelief)
      if (belief) {
        setCurrentTrack({
          id: `${belief.id}-${suggestedRiskLevel}`,
          name: `${belief.name} - ${language === 'en' ? 
            (suggestedRiskLevel === 'low' ? 'Low Risk' : 
             suggestedRiskLevel === 'medium' ? 'Medium Risk' : 'High Risk') :
            (suggestedRiskLevel === 'low' ? '低风险' : 
             suggestedRiskLevel === 'medium' ? '中风险' : '高风险')}`,
          url: belief.riskMusic[suggestedRiskLevel]
        })
        // 更新风险等级但不改变派系
        setSelectedRiskLevel(suggestedRiskLevel)
        setShowMusicSwitchPrompt(false)
      }
    }
  }

  // 显示风险评分结果
  const showRiskScoreResult = (assetRange: string, timeHorizon: string, riskTolerance: string, calculatedRiskLevel: 'low' | 'medium' | 'high') => {
    // 计算详细分数
    let assetScore = 0
    let timeScore = 0
    let toleranceScore = 0
    
    if (assetRange === 'under10k') assetScore = 2
    else if (assetRange === '10k-100k') assetScore = 4
    else if (assetRange === '100k-1m') assetScore = 6
    else if (assetRange === 'over1m') assetScore = 8
    
    if (timeHorizon === 'short') timeScore = 1
    else if (timeHorizon === 'medium') timeScore = 2
    else if (timeHorizon === 'long') timeScore = 3
    
    if (riskTolerance === 'conservative') toleranceScore = 1
    else if (riskTolerance === 'moderate') toleranceScore = 2
    else if (riskTolerance === 'aggressive') toleranceScore = 3
    
    const totalScore = assetScore + timeScore + toleranceScore
    
    // 显示评分结果（这里可以扩展为模态框或通知）
    console.log(`Risk Score Breakdown:
      Asset Range: ${assetRange} (${assetScore} points)
      Time Horizon: ${timeHorizon} (${timeScore} points)
      Risk Tolerance: ${riskTolerance} (${toleranceScore} points)
      Total Score: ${totalScore}/14
      Recommended Risk Level: ${calculatedRiskLevel}`)
  }

  const selectedBeliefData = investmentBeliefs.find(belief => belief.id === selectedBelief)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            {t('methodology.back')}
          </button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            {t('methodology.title')}
          </h1>
          {/* 语言切换器 */}
          <LanguageSwitcher />
        </div>

        {/* 基地三部曲风格标语 */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center space-y-6">
            {/* 主标题 */}
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 mb-4">
                {language === 'en' ? 'CHOOSE YOUR' : '选择你的'}
              </h2>
              <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                {language === 'en' ? 'FOUNDATION' : 'FOUNDATION'}
              </h2>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 via-yellow-300/20 to-orange-400/20 blur-3xl -z-10"></div>
            </div>
            
            {/* 副标题 */}
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-gray-300 font-medium">
                {language === 'en' 
                  ? 'Navigate the Federal Reserve "Crisis" - Where Danger Meets Opportunity' 
                  : '渡过美联储"危机"——危险与机遇并存'}
              </p>
              <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
                {language === 'en' 
                  ? 'Three distinct investment philosophies, each with their own musical signature. Let the rhythm guide your choice as you build your financial empire.' 
                  : '三种截然不同的投资哲学，每种都有其独特的音乐印记。让节奏指引您的选择，构建您的金融帝国。'}
              </p>
            </div>
          </div>
        </div>

        {/* 音乐指引提示 */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-6 rounded-2xl border border-purple-600/30 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <MusicalNoteIcon className="w-10 h-10 text-purple-400 mr-3 animate-pulse" />
              <h3 className="text-2xl font-bold text-purple-300">
                {language === 'en' ? 'Let Music Guide Your Choice' : '让音乐指引您的选择'}
              </h3>
            </div>
            <p className="text-purple-200 text-lg mb-4 leading-relaxed">
              {language === 'en' 
                ? 'Three distinct investment philosophies, each with their own musical signature for different risk levels. Let the rhythm guide your choice as you build your financial empire.' 
                : '三种截然不同的投资哲学，每种在不同风险等级下都有独特的音乐印记。让节奏指引您的选择，构建您的金融帝国。'}
            </p>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-500/30">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-2"></div>
                <span className="text-yellow-300 text-sm font-medium">
                  {language === 'en' ? 'Academic' : '学院派'}
                </span>
              </div>
              <div className="bg-red-500/20 rounded-lg p-3 border border-red-500/30">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
                <span className="text-red-300 text-sm font-medium">
                  {language === 'en' ? 'Business' : '商业派'}
                </span>
              </div>
              <div className="bg-purple-500/20 rounded-lg p-3 border border-purple-500/30">
                <div className="w-4 h-4 bg-purple-400 rounded-full mx-auto mb-2"></div>
                <span className="text-purple-300 text-sm font-medium">
                  {language === 'en' ? 'Psychological' : '心理派'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 投资信念选择 - 大卡片化居中显示 */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {investmentBeliefs.map((belief) => (
              <button
                key={belief.id}
                onClick={() => handleBeliefSelection(belief.id)}
                onMouseEnter={() => setHoveredBelief(belief.id)}
                onMouseLeave={() => setHoveredBelief('')}
                className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 text-left flex flex-col cursor-pointer ${
                  selectedBelief === belief.id
                    ? `border-purple-500 bg-gradient-to-br ${belief.color} shadow-2xl transform scale-105 ring-4 ${
                        belief.id === 'academic' ? 'ring-yellow-500/30' :
                        belief.id === 'business' ? 'ring-red-500/30' :
                        'ring-purple-500/30'
                      }`
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700 hover:scale-105'
                }`}
              >
                {/* 闪光边框效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>
                
                {/* 图片区域 - 扑克牌比例 (3:4) */}
                <div className={`w-full aspect-[3/4] rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden ${
                  selectedBelief === belief.id ? 'bg-white/20' : 'bg-gray-700'
                }`}>
                  {/* 真实图片 */}
                  <img 
                    src={belief.imageUrl} 
                    alt={belief.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  
                  {/* 音乐试听按钮 */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (selectedMusic === belief.id) {
                          setSelectedMusic(null)
                          setCurrentTrack(null)
                        } else {
                          setSelectedMusic(belief.id)
                          setCurrentTrack({
                            id: belief.id,
                            name: `${belief.name} - ${language === 'en' ? 
                              (selectedRiskLevel === 'low' ? 'Low Risk' : 
                               selectedRiskLevel === 'medium' ? 'Medium Risk' : 'High Risk') :
                              (selectedRiskLevel === 'low' ? '低风险' : 
                               selectedRiskLevel === 'medium' ? '中风险' : '高风险')}`,
                            url: belief.riskMusic[selectedRiskLevel]
                          })
                        }
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl backdrop-blur-sm ${
                        selectedMusic === belief.id 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 ring-2 ring-green-300' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      }`}
                    >
                      {selectedMusic === belief.id ? (
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                      ) : (
                        <PlayIcon className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </div>
                  

                </div>
                
                {/* 文字说明区域 - 右侧文字说明 */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold mb-3 ${
                    selectedBelief === belief.id ? 'text-white' : 'text-white'
                  }`}>
                    {belief.name}
                  </h3>
                  <p className={`text-sm font-medium ${
                    selectedBelief === belief.id ? 'text-white' : 'text-gray-100'
                  }`}>
                    {belief.description}
                  </p>
                  
                  {/* 动态浮现的详细描述 */}
                  <div className={`transition-all duration-500 overflow-hidden ${
                    hoveredBelief === belief.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}>
                                      <p className="text-xs text-white leading-relaxed border-l-2 border-cyan-400 pl-3 bg-black/20 p-2 rounded-r">
                    {belief.longDescription}
                  </p>
                  </div>
                  
                  {/* 音乐风格提示 */}
                  <div className="mt-3 flex items-center text-xs text-gray-400">
                    <MusicalNoteIcon className="w-4 h-4 mr-1" />
                    <span>
                      {belief.id === 'academic' && (language === 'en' ? 'Classical Academic Style' : '古典学术风格')}
                      {belief.id === 'business' && (language === 'en' ? 'Modern Business Style' : '现代商业风格')}
                      {belief.id === 'psychologic' && (language === 'en' ? 'Future Tech Style' : '未来科技风格')}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 投资建议展示 */}
        {showRecommendations && selectedBeliefData && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 border border-gray-600 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-white flex items-center">
                <LightBulbIcon className="w-8 h-8 mr-2 text-yellow-400" />
{selectedBeliefData.name} - {language === 'en' ? 'Investment Configuration Advice' : '投资配置建议'}
              </h3>
              <div className="flex items-center space-x-4">
                {/* 风险等级选择 */}
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300 text-sm">{language === 'en' ? 'Risk Level:' : '风险等级:'}</span>
                  <div className="flex bg-gray-800 rounded-lg p-1">
                    {(['low', 'medium', 'high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedRiskLevel(level)}
                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                          selectedRiskLevel === level
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {level === 'low' ? t('methodology.riskLevels.low') : level === 'medium' ? t('methodology.riskLevels.medium') : t('methodology.riskLevels.high')}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => setShowRiskTest(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold"
                >
                  {language === 'en' ? 'Risk Assessment Test' : '风险认知测试'}
                </button>
              </div>
            </div>
            
            {/* 风险等级投资逻辑描述 */}
            <div className="mb-8 p-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-xl border border-gray-600">
              <h4 className="text-lg font-semibold text-white mb-3">💡 {selectedRiskLevel === 'low' ? t('methodology.riskLevels.low') : selectedRiskLevel === 'medium' ? t('methodology.riskLevels.medium') : t('methodology.riskLevels.high')}{t('methodology.investmentLogic')}</h4>
              <p className="text-gray-300 leading-relaxed">
                {selectedRiskLevel === 'low' && t('methodology.riskLevels.lowLogic')}
                {selectedRiskLevel === 'medium' && t('methodology.riskLevels.mediumLogic')}
                {selectedRiskLevel === 'high' && t('methodology.riskLevels.highLogic')}
              </p>
            </div>

            {/* 投资逻辑展示 - 现代化设计 */}
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/50 shadow-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <LightBulbIcon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-white">
                  💡 {language === 'en' ? 'Investment Logic' : '投资逻辑'}
                </h4>
              </div>

              <div className="space-y-6">
                {/* 投资推理 */}
                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">R</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-blue-400 mb-3 text-lg">
                          {language === 'en' ? 'Reasoning' : '投资推理'}
                        </h5>
                        <p className="text-gray-200 leading-relaxed text-base">
                      {typeof selectedBeliefData.reasoning === 'string' 
                        ? selectedBeliefData.reasoning 
                        : selectedBeliefData.reasoning[selectedRiskLevel]
                      }
                    </p>
                  </div>
                    </div>
                  </div>
                </div>

                {/* 风险档案 */}
                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">P</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-yellow-400 mb-3 text-lg">
                          {language === 'en' ? 'Risk Profile' : '风险档案'}
                        </h5>
                        <p className="text-gray-200 leading-relaxed text-base">
                          {selectedBeliefData.riskProfile}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 特殊功能 */}
                <div className="group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">F</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-purple-400 mb-4 text-lg">
                          {language === 'en' ? 'Special Features' : '核心特色'}
                        </h5>
                        <div className="grid gap-3">
                      {selectedBeliefData.specialFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3 group/item">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-200">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <span className="text-gray-200 font-medium group-hover/item:text-white transition-colors duration-200">
                          {feature}
                              </span>
                            </div>
                      ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 特殊功能说明 */}
            {selectedBeliefData.id === 'psychohistory' && (
              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 p-6 rounded-xl border border-orange-600/30">
                <h4 className="text-lg font-semibold text-orange-300 mb-3">🚀 未来功能预告</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-white mb-2">加密货币对赌</h5>
                    <p className="text-sm text-gray-300">
                      预测加密货币市值能否达到美国股市的特定百分比，基于客户对赌结果调整加密资产配置
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">交易所推广</h5>
                    <p className="text-sm text-gray-300">
                      集成OKX、Binance等主流交易所，提供快捷交易入口和专属优惠
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 继续按钮 - 保持居中 */}
        <div className="text-center">
          <button
            onClick={() => {
              if (selectedBelief) {
                onMethodologySelect(selectedBelief, selectedRiskLevel)
                onNext()
              }
            }}
            disabled={!selectedBelief}
            className={`group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white rounded-2xl shadow-2xl transform transition-all duration-300 overflow-hidden ${
              selectedBelief 
                ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:scale-105' 
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            <span className="relative z-10 flex items-center">
{language === 'en' ? 'Continue Asset Configuration' : '继续配置资产'}
              <ArrowRightIcon className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </button>
          <p className="text-gray-400 mt-4 text-lg">
{selectedBelief ? 
              (language === 'en' ? 'Selection completed, continue to next step' : '选择完成，继续下一步') : 
              (language === 'en' ? 'Please select an investment philosophy first' : '请先选择投资哲学')}
          </p>
        </div>

        {/* 资产门槛警告模态框 */}
        {showAssetWarning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-r from-orange-900 to-red-900 border border-orange-600 rounded-2xl p-8 max-w-2xl w-full">
              <div className="text-center">
                <div className="text-6xl mb-4">🤣</div>
                <h3 className="text-2xl font-bold text-orange-300 mb-6">
                  {language === 'en' ? 'Asset Allocation Reality Check!' : '资产配置现实检查！'}
                </h3>
                <div className="bg-black/30 p-6 rounded-xl border border-orange-500/30 mb-6">
                  <p className="text-orange-200 text-lg leading-relaxed">
                    {assetWarningMessage}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30">
                    <h4 className="font-semibold text-yellow-300 mb-2">
                      {language === 'en' ? '🎯 Your Quest Objectives:' : '🎯 您的任务目标：'}
                    </h4>
                    <ul className="text-yellow-200 text-sm space-y-1 text-left">
                      <li>• {language === 'en' ? '🎮 Level up your income (grind those side quests!)' : '🎮 提升收入等级（刷那些支线任务！）'}</li>
                      <li>• {language === 'en' ? '🛡️ Build emergency savings (your health potion stash)' : '🛡️ 建立应急储蓄（您的生命药水储备）'}</li>
                      <li>• {language === 'en' ? '📚 Learn personal finance basics (read the strategy guide)' : '📚 学习个人理财基础知识（阅读攻略指南）'}</li>
                      <li>• {language === 'en' ? '🚀 Return when you\'re ready for epic asset allocation raids!' : '🚀 当您准备好史诗级资产配置副本时再回来！'}</li>
                    </ul>
                  </div>
                </div>
                <button
                  onClick={() => setShowAssetWarning(false)}
                  className="mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors font-semibold"
                >
                  {language === 'en' ? '🎮 Got it! Time to grind and level up!' : '🎮 明白了！是时候刷怪练级了！'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 音乐切换提示模态框 */}
        {showMusicSwitchPrompt && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-r from-purple-900 to-blue-900 border border-purple-600 rounded-2xl p-8 max-w-2xl w-full">
              <div className="text-center">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-2xl font-bold text-purple-300 mb-6">
                  {language === 'en' ? 'Music Recommendation' : '音乐推荐'}
                </h3>
                <div className="bg-black/30 p-6 rounded-xl border border-purple-500/30 mb-6">
                  <p className="text-purple-200 text-lg leading-relaxed mb-4">
                    {language === 'en' 
                      ? `Based on your risk assessment, we recommend switching to ${
                          suggestedRiskLevel === 'low' ? 'Low Risk' : 
                          suggestedRiskLevel === 'medium' ? 'Medium Risk' : 'High Risk'
                        } music for your selected philosophy. This will better match your investment profile.`
                      : `根据您的风险评估，我们建议切换到${
                          suggestedRiskLevel === 'low' ? '低风险' : 
                          suggestedRiskLevel === 'medium' ? '中风险' : '高风险'
                        }音乐来匹配您选择的投资哲学。这将更好地符合您的投资档案。`}
                  </p>
                  <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-400/30">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-purple-300">
                        {language === 'en' ? 'Current:' : '当前：'} {selectedRiskLevel === 'low' ? (language === 'en' ? 'Low Risk' : '低风险') : selectedRiskLevel === 'medium' ? (language === 'en' ? 'Medium Risk' : '中风险') : (language === 'en' ? 'High Risk' : '高风险')}
                      </div>
                      <div className="text-2xl">→</div>
                      <div className="text-yellow-300 font-bold">
                        {language === 'en' ? 'Suggested:' : '建议：'} {suggestedRiskLevel === 'low' ? (language === 'en' ? 'Low Risk' : '低风险') : suggestedRiskLevel === 'medium' ? (language === 'en' ? 'Medium Risk' : '中风险') : (language === 'en' ? 'High Risk' : '高风险')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowMusicSwitchPrompt(false)}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                  >
                    {language === 'en' ? 'Keep Current Music' : '保持当前音乐'}
                  </button>
                  <button
                    onClick={switchToSuggestedMusic}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-semibold"
                  >
                    {language === 'en' ? '🎵 Switch Music' : '🎵 切换音乐'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 风险测试模态框 */}
        {showRiskTest && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-600 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {language === 'en' ? 'Risk Assessment Test' : '风险认知水平测试'}
                </h3>
                <button
                  onClick={() => setShowRiskTest(false)}
                  className="text-gray-400 hover:text-white text-2xl transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {language === 'en' 
                    ? 'This test will help us understand your risk tolerance and investment preferences. Please answer the following questions honestly.' 
                    : '这个测试将帮助我们了解您的风险承受能力和投资偏好。请诚实地回答以下问题。'}
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">
                      {language === 'en' ? 'Question 1: Asset Range' : '问题1：资产范围'}
                    </h4>
                    <p className="text-gray-300 mb-3">
                      {language === 'en' 
                        ? 'What is your approximate total asset value?' 
                        : '您的总资产大约是多少？'}
                    </p>
                    <div className="space-y-2">
                      {[
                        { value: 'under10k', label: { en: 'Under $10,000', zh: '1万美元以下' } },
                        { value: '10k-100k', label: { en: '$10,000 - $100,000', zh: '1万-10万美元' } },
                        { value: '100k-1m', label: { en: '$100,000 - $1,000,000', zh: '10万-100万美元' } },
                        { value: 'over1m', label: { en: 'Over $1,000,000', zh: '100万美元以上' } }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="assetRange"
                            value={option.value}
                            className="text-blue-500"
                            onChange={() => {
                              // 存储选择的资产范围
                              setSelectedAssetRange(option.value)
                            }}
                          />
                          <span className="text-gray-300">
                            {language === 'en' ? option.label.en : option.label.zh}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">
                      {language === 'en' ? 'Question 2: Investment Time Horizon' : '问题2：投资时间跨度'}
                    </h4>
                    <p className="text-gray-300 mb-3">
                      {language === 'en' 
                        ? 'How long do you plan to hold your investments?' 
                        : '您计划持有投资多长时间？'}
                    </p>
                    <div className="space-y-2">
                      {[
                        { value: 'low', label: { en: 'Less than 1 year', zh: '少于1年' } },
                        { value: 'medium', label: { en: '1-5 years', zh: '1-5年' } },
                        { value: 'high', label: { en: 'More than 5 years', zh: '5年以上' } }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="timeHorizon"
                            value={option.value}
                            className="text-blue-500"
                            onChange={() => setSelectedTimeHorizon(option.value)}
                          />
                          <span className="text-gray-300">
                            {language === 'en' ? option.label.en : option.label.zh}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">
                      {language === 'en' ? 'Question 3: Risk Tolerance' : '问题3：风险承受能力'}
                    </h4>
                    <p className="text-gray-300 mb-3">
                      {language === 'en' 
                        ? 'How would you react to a 20% decline in your investment value?' 
                        : '如果您的投资价值下降20%，您会如何反应？'}
                    </p>
                    <div className="space-y-2">
                      {[
                        { value: 'low', label: { en: 'Sell immediately to avoid further losses', zh: '立即卖出以避免进一步损失' } },
                        { value: 'medium', label: { en: 'Hold and wait for recovery', zh: '持有并等待恢复' } },
                        { value: 'high', label: { en: 'Buy more as it\'s a good opportunity', zh: '买入更多，因为这是好机会' } }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="riskTolerance"
                            value={option.value}
                            className="text-blue-500"
                            onChange={() => setSelectedRiskTolerance(option.value)}
                          />
                          <span className="text-gray-300">
                            {language === 'en' ? option.label.en : option.label.zh}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowRiskTest(false)}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {language === 'en' ? 'Cancel' : '取消'}
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedAssetRange) {
                        alert(language === 'en' ? 'Please select your asset range first' : '请先选择您的资产范围')
                        return
                      }
                      if (!selectedTimeHorizon) {
                        alert(language === 'en' ? 'Please select your investment time horizon' : '请选择您的投资时间跨度')
                        return
                      }
                      if (!selectedRiskTolerance) {
                        alert(language === 'en' ? 'Please select your risk tolerance' : '请选择您的风险承受能力')
                        return
                      }
                      
                      // 计算风险评分
                      const calculatedRiskLevel = calculateRiskScore(selectedAssetRange, selectedTimeHorizon, selectedRiskTolerance)
                      
                      // 显示风险评分结果
                      showRiskScoreResult(selectedAssetRange, selectedTimeHorizon, selectedRiskTolerance, calculatedRiskLevel)
                      
                      setShowRiskTest(false)
                      
                      // 检查是否需要切换音乐
                      checkMusicSwitch(calculatedRiskLevel)
                      
                      // 检查资产门槛
                      if (checkAssetThreshold(selectedAssetRange)) {
                        // 自动应用推荐配置
                        if (selectedBelief) {
                          const belief = investmentBeliefs.find(b => b.id === selectedBelief)
                          if (belief) {
                            const recommendations = belief.riskLevels[calculatedRiskLevel]
                            onAssetChange(recommendations)
                          }
                        }
                      }
                    }}
                    disabled={!selectedAssetRange || !selectedTimeHorizon || !selectedRiskTolerance}
                    className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
                      (selectedAssetRange && selectedTimeHorizon && selectedRiskTolerance)
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700' 
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {language === 'en' ? 'Apply Results' : '应用结果'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}
