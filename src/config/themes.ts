export type ThemeType = 'dusk' | 'day' | 'dawn'

export interface ThemeConfig {
  id: ThemeType
  name: string
  nameEn: string
  description: string
  philosophy: string
  philosophyEn: string
  
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
    textSecondary: string
    border: string
    shadow: string
  }
  
  fonts: {
    heading: string
    body: string
    accent: string
  }
  
  iconStyle: string
  
  background: {
    type: 'image' | 'gradient' | 'pattern'
    value: string
    overlay?: string
  }
  
  animations: {
    transition: string
    hover: string
    focus: string
    loading: string
  }
  
  decorations: {
    borderStyle: string
    buttonStyle: string
    cardStyle: string
  }
  
  character: {
    title: string
    description: string
    quote: string
  }
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  dusk: {
    id: 'dusk',
    name: '黄昏学派',
    nameEn: 'DUSK',
    description: '古典知识殿堂，哲学殿堂的暮光',
    philosophy: '学院派 · 古典学风',
    philosophyEn: 'Academic · Classical',
    
    colors: {
      primary: '#8B4513',
      secondary: '#DAA520',
      accent: '#F5F5DC',
      background: '#2F1B14',
      surface: '#3D2817',
      text: '#F5F5DC',
      textSecondary: '#DAA520',
      border: '#8B4513',
      shadow: 'rgba(139, 69, 19, 0.3)'
    },
    
    fonts: {
      heading: 'Trajan, "Times New Roman", serif',
      body: 'Georgia, "Times New Roman", serif',
      accent: 'Trajan, serif'
    },
    
    iconStyle: 'classical-relief',
    
    background: {
      type: 'image',
      value: '/images/themes/dusk-bg.jpg',
      overlay: 'rgba(47, 27, 20, 0.7)'
    },
    
    animations: {
      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      hover: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      focus: 'outline 0.2s ease-out',
      loading: 'fadeIn 2s ease-in-out'
    },
    
    decorations: {
      borderStyle: 'classical-columns',
      buttonStyle: 'stone-relief',
      cardStyle: 'marble-pattern'
    },
    
    character: {
      title: '黄昏兄弟',
      description: '像黄昏兄弟一样稳健经营你的投资帝国',
      quote: '知识如暮光，智慧如星辰，在古典的殿堂中，我们稳健前行'
    }
  },
  
  day: {
    id: 'day',
    name: '白昼学派',
    nameEn: 'DAY',
    description: '现代金融帝国，资本市场的白昼竞技场',
    philosophy: '华尔街派 · 商务风',
    philosophyEn: 'Wall Street · Business',
    
    colors: {
      primary: '#000000',
      secondary: '#C0C0C0',
      accent: '#FFD700',
      background: '#0A0A0A',
      surface: '#1A1A1A',
      text: '#FFFFFF',
      textSecondary: '#C0C0C0',
      border: '#FFD700',
      shadow: 'rgba(255, 215, 0, 0.2)'
    },
    
    fonts: {
      heading: 'Helvetica, "Roboto", sans-serif',
      body: 'Helvetica, Arial, sans-serif',
      accent: 'Roboto, sans-serif'
    },
    
    iconStyle: 'minimal-metallic',
    
    background: {
      type: 'image',
      value: '/images/themes/day-bg.jpg',
      overlay: 'rgba(10, 10, 10, 0.8)'
    },
    
    animations: {
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      hover: 'transform 0.2s ease-out, box-shadow 0.2s ease-out',
      focus: 'outline 0.1s ease-out',
      loading: 'slideIn 0.6s ease-out'
    },
    
    decorations: {
      borderStyle: 'minimal-lines',
      buttonStyle: 'glass-metallic',
      cardStyle: 'modern-clean'
    },
    
    character: {
      title: '白昼战士',
      description: '在白昼的竞技场中，成为资本的征服者',
      quote: '时间就是金钱，效率就是生命，在金融的战场上，我们征服一切'
    }
  },
  
  dawn: {
    id: 'dawn',
    name: '黎明学派',
    nameEn: 'DAWN',
    description: '未来主义，群体行为演化，数据黎明',
    philosophy: '心理史学派 · 赛博像素风',
    philosophyEn: 'Psychohistory · Cyberpunk',
    
    colors: {
      primary: '#8A2BE2',
      secondary: '#00CED1',
      accent: '#FF69B4',
      background: '#0A0A0A',
      surface: '#1A0A1A',
      text: '#00CED1',
      textSecondary: '#FF69B4',
      border: '#8A2BE2',
      shadow: 'rgba(138, 43, 226, 0.4)'
    },
    
    fonts: {
      heading: 'VT323, "Orbitron", monospace',
      body: 'VT323, monospace',
      accent: 'Orbitron, monospace'
    },
    
    iconStyle: 'pixel-neon',
    
    background: {
      type: 'image',
      value: '/images/themes/dawn-bg.jpg',
      overlay: 'rgba(10, 10, 10, 0.6)'
    },
    
    animations: {
      transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      hover: 'transform 0.15s ease-in-out, filter 0.15s ease-in-out',
      focus: 'outline 0.1s ease-out',
      loading: 'pixelate 0.8s ease-in-out'
    },
    
    decorations: {
      borderStyle: 'neon-pipes',
      buttonStyle: 'pixel-outline',
      cardStyle: 'cyberpunk-grid'
    },
    
    character: {
      title: '黎明先知',
      description: '在数据的黎明中，预见未来的投资趋势',
      quote: '数据如星辰，算法如命运，在赛博的世界里，我们预见未来'
    }
  }
}

export const getTheme = (themeId: ThemeType): ThemeConfig => {
  return THEMES[themeId] || THEMES.dusk
}

export const getThemeNames = (): Array<{id: ThemeType, name: string, nameEn: string}> => {
  return Object.values(THEMES).map(theme => ({
    id: theme.id,
    name: theme.name,
    nameEn: theme.nameEn
  }))
}
