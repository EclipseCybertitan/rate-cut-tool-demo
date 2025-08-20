import React, { createContext, useContext, useState, ReactNode } from 'react'

interface MusicContextType {
  selectedMusic: string | null
  setSelectedMusic: (musicId: string | null) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  currentTrack: {
    id: string
    name: string
    url: string
  } | null
  setCurrentTrack: (track: { id: string; name: string; url: string } | null) => void
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider')
  }
  return context
}

interface MusicProviderProps {
  children: ReactNode
}

export const MusicProvider: React.FC<MusicProviderProps> = ({ children }) => {
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<{
    id: string
    name: string
    url: string
  } | null>(null)

  return (
    <MusicContext.Provider
      value={{
        selectedMusic,
        setSelectedMusic,
        isPlaying,
        setIsPlaying,
        currentTrack,
        setCurrentTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
