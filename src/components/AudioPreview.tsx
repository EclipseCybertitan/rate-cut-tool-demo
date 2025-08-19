import { useState, useRef } from 'react'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'
import { AudioTrack } from '../config/audio'

interface AudioPreviewProps {
  track: AudioTrack
  isPlaying: boolean
  onPlay: (trackId: string) => void
  onStop: () => void
}

export default function AudioPreview({ track, isPlaying, onPlay, onStop }: AudioPreviewProps) {
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayPause = () => {
    if (isPlaying) {
      onStop()
    } else {
      onPlay(track.id)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  // 渲染不同类型的音频播放器
  const renderAudioPlayer = () => {
    switch (track.type) {
      case 'spotify':
        return (
          <div className="w-full">
            <iframe
              src={`https://open.spotify.com/embed/track/${track.url.split('/').pop()}?utm_source=generator&theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
            />
          </div>
        )
      
      case 'pixabay':
        return (
          <div className="w-full">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <MusicalNoteIcon className="w-8 h-8 mx-auto text-purple-400 mb-2" />
              <p className="text-white text-sm mb-2">{track.title}</p>
              <p className="text-gray-400 text-xs mb-3">{track.artist}</p>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                在 Pixabay 试听
              </a>
            </div>
          </div>
        )
      
      case 'local':
        return (
          <div className="w-full">
            <audio
              ref={audioRef}
              src={track.url}
              preload="metadata"
              className="w-full"
            />
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-white text-sm font-medium">{track.title}</p>
                  <p className="text-gray-400 text-xs">{track.artist}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isMuted ? <SpeakerXMarkIcon className="w-5 h-5" /> : <SpeakerWaveIcon className="w-5 h-5" />}
                  </button>
                  <div className="relative">
                    <button
                      onMouseEnter={() => setShowVolumeControl(true)}
                      onMouseLeave={() => setShowVolumeControl(false)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <SpeakerWaveIcon className="w-5 h-5" />
                    </button>
                    {showVolumeControl && (
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-700 p-2 rounded-lg">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-20 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
                >
                  {isPlaying ? (
                    <PauseIcon className="w-6 h-6 text-white" />
                  ) : (
                    <PlayIcon className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      {renderAudioPlayer()}
    </div>
  )
}
