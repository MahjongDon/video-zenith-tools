
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import Timeline from "./Timeline";
import UploadPanel from "./video/UploadPanel";
import GettingStartedPanel from "./video/GettingStartedPanel";
import VideoActions from "./video/VideoActions";
import VideoTabs from "./video/VideoTabs";

const VideoWorkspace = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const handleVideoUploaded = (file: File, url: string) => {
    setVideoFile(file);
    setVideoUrl(url);
    setVideoUploaded(true);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel */}
        <div className="lg:w-2/3">
          {!videoUploaded ? (
            <UploadPanel 
              onVideoUploaded={handleVideoUploaded} 
              isUploading={isUploading} 
              setIsUploading={setIsUploading} 
            />
          ) : (
            <VideoPlayer className="mb-6" videoUrl={videoUrl} />
          )}
          
          {videoUploaded && (
            <Timeline className="mb-6" />
          )}
          
          {videoUploaded && <VideoActions />}
        </div>
        
        {/* Right panel */}
        <div className="lg:w-1/3">
          {videoUploaded ? <VideoTabs /> : <GettingStartedPanel />}
        </div>
      </div>
    </div>
  );
};

export default VideoWorkspace;
