export interface AudioTrack {
  id: string
  title: string
  artist: string
  url: string
  type: 'spotify' | 'pixabay' | 'local'
  duration?: string
  description: string
}

export interface PhilosophyAudio {
  id: string
  name: string
  nameEn: string
  tracks: {
    low: AudioTrack
    mid: AudioTrack
    high: AudioTrack
  }
}

export const PHILOSOPHY_AUDIO: PhilosophyAudio[] = [
  {
    id: 'textbook',
    name: '教科书理念',
    nameEn: 'Academic Theory',
    tracks: {
      low: {
        id: 'textbook-low',
        title: 'Leaving Caladan',
        artist: 'Hans Zimmer',
        url: 'https://open.spotify.com/track/5glKprpzpGW5Pf4wB9gNPq',
        type: 'spotify',
        duration: '3:45',
        description: '低风险策略推荐音乐 - 古典学术风格，体现传统投资理论的稳重与智慧'
      },
      mid: {
        id: 'textbook-mid',
        title: 'Academic Harmony',
        artist: 'Pixabay Music',
        url: 'https://pixabay.com/music/search/academic%20orchestra/',
        type: 'pixabay',
        duration: '4:20',
        description: '中风险策略推荐音乐 - 平衡的学术风格，体现现代投资组合理论'
      },
      high: {
        id: 'textbook-high',
        title: 'Theoretical Momentum',
        artist: 'Pixabay Music',
        url: 'https://pixabay.com/music/search/theoretical%20classical/',
        type: 'pixabay',
        duration: '5:15',
        description: '高风险策略推荐音乐 - 激进的学术风格，体现前沿投资理论探索'
      }
    }
  },
  {
    id: 'wallstreet',
    name: '华尔街标准战术',
    nameEn: 'Wall Street Tactics',
    tracks: {
      low: {
        id: 'wallstreet-low',
        title: 'Conservative Trading',
        artist: 'Pixabay Music',
        url: 'https://pixabay.com/music/search/business%20conservative/',
        type: 'pixabay',
        duration: '3:30',
        description: '低风险策略推荐音乐 - 保守的商业风格，体现稳健的投资策略'
      },
      mid: {
        id: 'wallstreet-mid',
        title: 'F1 The Album (2025)',
        artist: 'Various Artists',
        url: 'https://open.spotify.com/album/7u5CDc2RYaC8THD80XzKh6',
        type: 'spotify',
        duration: '4:15',
        description: '中风险策略推荐音乐 - 现代商业风格，体现实战投资策略'
      },
      high: {
        id: 'wallstreet-high',
        title: 'High Stakes Trading',
        artist: 'Pixabay Music',
        url: 'https://pixabay.com/music/search/high%20stakes%20trading/',
        type: 'pixabay',
        duration: '4:50',
        description: '高风险策略推荐音乐 - 激进的商业风格，体现高风险高收益策略'
      }
    }
  },
  {
    id: 'psychohistory',
    name: '心理史学派',
    nameEn: 'Psychohistory School',
    tracks: {
      low: {
        id: 'psycho-low',
        title: 'Future Contemplation',
        artist: 'Pixabay Music',
        url: 'https://pixabay.com/music/search/future%20contemplation/',
        type: 'pixabay',
        duration: '3:55',
        description: '低风险策略推荐音乐 - 未来科技风格，体现创新的投资思维'
      },
      mid: {
        id: 'psycho-mid',
        title: 'FOILS',
        artist: 'Ludwig Göransson',
        url: 'https://open.spotify.com/track/4ZT5vcmGejiaDvIH9AAIME',
        type: 'spotify',
        duration: '4:25',
        description: '中风险策略推荐音乐 - 科技电子风格，体现心理史学派的创新思维'
      },
      high: {
        id: 'psycho-high',
        title: 'Cyberpunk Futures',
        artist: 'Pixabay Music',
        url: 'https://pixabay.com/music/search/cyberpunk%20future/',
        type: 'pixabay',
        duration: '5:10',
        description: '高风险策略推荐音乐 - 赛博朋克风格，体现未来投资趋势预测'
      }
    }
  }
]

export const getPhilosophyAudio = (id: string): PhilosophyAudio | undefined => {
  return PHILOSOPHY_AUDIO.find(philosophy => philosophy.id === id)
}

export const getTrackById = (trackId: string): AudioTrack | undefined => {
  for (const philosophy of PHILOSOPHY_AUDIO) {
    for (const [, track] of Object.entries(philosophy.tracks)) {
      if (track.id === trackId) {
        return track
      }
    }
  }
  return undefined
}
