import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  Maximize,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  className?: string;
  videoUrl?: string | null;
}

const VideoPlayer = ({ className, videoUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
    }
  }, [videoUrl]);

  useEffect(() => {
    const hideControls = () => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    };

    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(hideControls, 3000);
    } else {
      setIsControlsVisible(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      setCurrentTime(currentTime);
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    setProgress(value[0]);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className={cn(
        "glass-panel rounded-xl overflow-hidden relative group", 
        className
      )}
      onMouseEnter={() => setIsControlsVisible(true)}
      onMouseMove={() => {
        setIsControlsVisible(true);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
        if (isPlaying) {
          controlsTimeoutRef.current = window.setTimeout(() => {
            setIsControlsVisible(false);
          }, 3000);
        }
      }}
      onMouseLeave={() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onClick={handlePlayPause}
        src={videoUrl || ''}
      >
        Your browser does not support the video tag.
      </video>

      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mb-4">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/80 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={skipBackward}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-white/10 h-10 w-10"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
              onClick={skipForward}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center ml-2 gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/10"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/10"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white h-16 w-16"
            onClick={handlePlayPause}
          >
            <Play className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
