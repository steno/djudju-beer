import React, { createContext, useContext, useState, useRef } from 'react';

interface AudioContextType {
  isSoundPlaying: boolean;
  toggleSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

const ASSET_BASE_URL = 'https://mdfeywsadyvaqhsdbxqb.supabase.co/storage/v1/object/public/images/';
const audioUrl = `${ASSET_BASE_URL}djudju-comp.mp3`;

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isSoundPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsSoundPlaying(!isSoundPlaying);
    }
  };

  return (
    <AudioContext.Provider value={{ isSoundPlaying, toggleSound }}>
      <audio ref={audioRef} loop preload="auto" crossOrigin="anonymous">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};