import React from 'react';
import { motion } from 'framer-motion';

interface VideoPreloaderProps {
  isLoading: boolean;
}

const VideoPreloader: React.FC<VideoPreloaderProps> = ({ isLoading }) => {
  // Don't show loader on mobile
  if (window.innerWidth <= 768 || !isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-t-[#C19A6B] border-r-[#C19A6B] border-b-[#C19A6B] border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-1 border-4 border-t-[#A37F5A] border-r-[#A37F5A] border-b-[#A37F5A] border-l-transparent rounded-full animate-spin-slow"></div>
        </div>
        <p className="text-white text-lg font-akhio">Loading Experience...</p>
      </div>
    </motion.div>
  );
};

export default VideoPreloader;