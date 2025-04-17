import { useState, useEffect } from 'react';

interface VideoPreloadState {
  isLoaded: boolean;
  error: string | null;
}

export const useVideoPreload = (videoUrls: string[]): VideoPreloadState => {
  const [state, setState] = useState<VideoPreloadState>({
    isLoaded: false,
    error: null
  });

  useEffect(() => {
    // Skip preloading on mobile
    if (window.innerWidth <= 768) {
      setState({ isLoaded: true, error: null });
      return;
    }

    // If no video URLs, mark as loaded
    if (!videoUrls.length) {
      setState({ isLoaded: true, error: null });
      return;
    }

    const videos: HTMLVideoElement[] = [];
    let mounted = true;

    const cleanup = () => {
      videos.forEach(video => {
        video.removeEventListener('loadedmetadata', handleLoad);
        video.removeEventListener('error', handleError);
        video.remove(); // Remove video element from memory
      });
    };

    const handleLoad = () => {
      if (!mounted) return;
      
      const allLoaded = videos.every(v => 
        v.readyState >= 2 || // HAVE_CURRENT_DATA or higher
        v.error // Count errored videos as "loaded" to prevent hanging
      );

      if (allLoaded) {
        setState({ isLoaded: true, error: null });
      }
    };

    const handleError = (event: Event) => {
      if (!mounted) return;
      
      const video = event.target as HTMLVideoElement;
      const error = video.error;
      console.error('Video preload error:', error?.message || 'Unknown error');
      
      // Check if all videos have either loaded or errored
      const allSettled = videos.every(v => 
        v.readyState >= 2 || // HAVE_CURRENT_DATA or higher
        v.error // Has error
      );

      if (allSettled) {
        setState(prev => ({
          isLoaded: true, // Mark as loaded even with errors to prevent hanging
          error: error?.message || 'Failed to load video'
        }));
      }
    };

    try {
      videoUrls.forEach(url => {
        if (!url) return;

        const video = document.createElement('video');
        videos.push(video);

        video.muted = true;
        video.preload = 'metadata';
        video.crossOrigin = 'anonymous';

        video.addEventListener('loadedmetadata', handleLoad);
        video.addEventListener('error', handleError);

        // Set source last to start loading
        video.src = url;
      });

      // Set a timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        if (!mounted) return;
        
        setState(prev => ({
          isLoaded: true, // Mark as loaded even if timeout to prevent hanging
          error: 'Video preload timeout'
        }));
      }, 10000); // 10 second timeout

      return () => {
        mounted = false;
        clearTimeout(timeoutId);
        cleanup();
      };
    } catch (error) {
      console.error('Video preload setup error:', error);
      setState({
        isLoaded: true, // Mark as loaded even with errors to prevent hanging
        error: error instanceof Error ? error.message : 'Failed to setup video preload'
      });
    }
  }, [videoUrls.join(',')]); // Only re-run if URLs change

  return state;
};