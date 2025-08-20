import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'
import { mediaLoader, Theme } from '../lib/media'

/**
 * 音频插槽组件
 * 支持多种音频源，单实例互斥播放
 * @author @eclipsecybertitan
 */
export interface AudioSlotProps {
  type: 'html5' | 'spotify' | 'soundcloud'
  theme?: Theme
  trackId?: string
  autoPlay?: boolean
  loop?: boolean
  volume?: number
  className?: string
  onPlay?: () => void
  onPause?: () => void
  onEnded?: () => void
  onError?: (error: Error) => void
}

export default function AudioSlot({
  type,
  theme = 'dusk',
  trackId,
  autoPlay = false,
  loop = false,
  volume = 0.7,
  className = '',
  onPlay,
  onPause,
  onEnded,
  onError
}: AudioSlotProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const volumeRef = useRef<HTMLDivElement>(null)
  
  // 全局音频控制（单实例互斥播放）
  useEffect(() => {
    const handleGlobalPlay = (event: CustomEvent) => {
      if (event.detail.trackId !== trackId) {
        pause()
      }
    }
    
    document.addEventListener('audio:play', handleGlobalPlay as EventListener)
    
    return () => {
      document.removeEventListener('audio:play', handleGlobalPlay as EventListener)
    }
  }, [trackId])

  // 初始化音频
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = loop
      
      if (autoPlay) {
        play()
      }
    }
  }, [volume, loop, autoPlay])

  // 加载主题音乐
  useEffect(() => {
    if (trackId) {
      loadThemeTrack(trackId)
    }
  }, [trackId, theme])

  // 加载主题音乐轨道
  const loadThemeTrack = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const tracks = await mediaLoader.getThemeMusic(theme)
      const track = tracks.find(t => t.id === id)
      
      if (track && audioRef.current) {
        audioRef.current.src = track.url
        audioRef.current.load()
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('加载音乐失败')
      setError(error.message)
      onError?.(error)
    } finally {
      setIsLoading(false)
    }
  }

  // 播放音频
  const play = useCallback(async () => {
    try {
      if (audioRef.current) {
        await audioRef.current.play()
        setIsPlaying(true)
        onPlay?.()
        
        // 通知全局播放事件
        document.dispatchEvent(new CustomEvent('audio:play', {
          detail: { trackId }
        }))
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('播放失败')
      setError(error.message)
      onError?.(error)
    }
  }, [trackId, onPlay, onError])

  // 暂停音频
  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      onPause?.()
    }
  }, [onPause])

  // 切换播放状态
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  // 切换静音
  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMuted = !isMuted
      audioRef.current.muted = newMuted
      setIsMuted(newMuted)
    }
  }, [isMuted])

  // 设置音量
  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      const clampedVolume = Math.max(0, Math.min(1, newVolume))
      audioRef.current.volume = clampedVolume
    }
  }, [])

  // 设置播放进度
  const setProgress = useCallback((newTime: number) => {
    if (audioRef.current) {
      const clampedTime = Math.max(0, Math.min(duration, newTime))
      audioRef.current.currentTime = clampedTime
      setCurrentTime(clampedTime)
    }
  }, [duration])

  // 格式化时间
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // 处理进度条点击
  const handleProgressClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const width = rect.width
      const clickPercent = clickX / width
      const newTime = clickPercent * duration
      setProgress(newTime)
    }
  }, [duration, setProgress])

  // 处理音量条点击
  const handleVolumeClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (volumeRef.current) {
      const rect = volumeRef.current.getBoundingClientRect()
      const clickX = event.clientX - rect.left
      const width = rect.width
      const clickPercent = clickX / width
      const newVolume = clickPercent
      setVolume(newVolume)
    }
  }, [setVolume])

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      onEnded?.()
    }
    const handleError = () => {
      setError('音频播放错误')
      setIsPlaying(false)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [onEnded])

  // 渲染不同音频源
  const renderAudioSource = () => {
    switch (type) {
      case 'html5':
        return (
          <audio
            ref={audioRef}
            preload="metadata"
            className="hidden"
          />
        )
      
      case 'spotify':
        return (
          <iframe
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="encrypted-media"
            className="rounded-lg"
          />
        )
      
      case 'soundcloud':
        return (
          <iframe
            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
            width="100%"
            height="166"
            frameBorder="no"
            className="rounded-lg"
          />
        )
      
      default:
        return null
    }
  }

  // 如果是指定类型，只渲染对应的播放器
  if (type === 'spotify' || type === 'soundcloud') {
    return (
      <div className={`audio-slot ${className}`}>
        {renderAudioSource()}
      </div>
    )
  }

  // HTML5 音频播放器
  return (
    <div className={`
      audio-slot bg-[var(--color-bg-secondary)] rounded-xl p-4 border border-[var(--color-border)]
      ${className}
    `}>
      {/* 音频元素 */}
      {renderAudioSource()}
      
      {/* 播放控制 */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center transition-all
            ${isPlaying 
              ? 'bg-[var(--color-accent-primary)] text-white' 
              : 'bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-primary)] hover:text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <PauseIcon className="w-5 h-5" />
          ) : (
            <PlayIcon className="w-5 h-5" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="text-sm text-[var(--color-text-secondary)] mb-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          {/* 进度条 */}
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-2 bg-[var(--color-bg-primary)] rounded-full cursor-pointer relative"
          >
            <div
              className="h-full bg-[var(--color-accent-primary)] rounded-full transition-all"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>
        
        {/* 音量控制 */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleMute}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            aria-label={isMuted ? '取消静音' : '静音'}
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-5 h-5" />
            ) : (
              <SpeakerWaveIcon className="w-5 h-5" />
            )}
          </button>
          
          <div
            ref={volumeRef}
            onClick={handleVolumeClick}
            className="w-16 h-2 bg-[var(--color-bg-primary)] rounded-full cursor-pointer relative"
          >
            <div
              className="h-full bg-[var(--color-text-secondary)] rounded-full transition-all"
              style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* 错误提示 */}
      {error && (
        <div className="text-red-500 text-sm text-center p-2 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      
      {/* 音频信息 */}
      <div className="text-xs text-[var(--color-text-secondary)] text-center">
        <MusicalNoteIcon className="w-4 h-4 inline mr-1" />
        {type === 'html5' ? 'HTML5 音频播放器' : `${type} 嵌入播放器`}
      </div>
    </div>
  )
}

// 开发者签名: @eclipsecybertitan
