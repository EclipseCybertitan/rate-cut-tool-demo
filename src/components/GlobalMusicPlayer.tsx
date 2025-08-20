import React from 'react'
import { useMusic } from '../contexts/MusicContext'
import { XMarkIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'

const GlobalMusicPlayer: React.FC = () => {
  const { selectedMusic, setSelectedMusic, currentTrack } = useMusic()

  if (!selectedMusic || !currentTrack) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-gradient-to-r from-gray-900/95 to-black/95 border border-gray-600 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* 播放器头部 */}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <MusicalNoteIcon className="w-4 h-4 text-purple-400" />
            <span className="text-white text-sm font-medium">
              {currentTrack.name}
            </span>
          </div>
          <button
            onClick={() => setSelectedMusic(null)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
        
        {/* 播放器主体 */}
        <div className="p-3">
          <div className="bg-black/30 rounded-lg overflow-hidden">
            <iframe
              src={currentTrack.url}
              width="280"
              height="80"
              frameBorder="0"
              allow="encrypted-media"
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalMusicPlayer
