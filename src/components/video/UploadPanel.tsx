
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface UploadPanelProps {
  onVideoUploaded: (file: File, url: string) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const UploadPanel = ({ onVideoUploaded, isUploading, setIsUploading }: UploadPanelProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.includes('video/')) {
        toast.error("Please upload a valid video file.");
        return;
      }
      
      // Validate file size (500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast.error("File size exceeds 500MB limit.");
        return;
      }
      
      handleUploadFile(file);
    }
  };
  
  const handleUploadFile = (file: File) => {
    setIsUploading(true);
    
    // Create object URL for the video file
    const url = URL.createObjectURL(file);
    
    // Simulate upload with timeout
    setTimeout(() => {
      onVideoUploaded(file, url);
      setIsUploading(false);
      toast.success("Video uploaded successfully!");
    }, 2000);
  };
  
  const handleUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Validate file type
      if (!file.type.includes('video/')) {
        toast.error("Please upload a valid video file.");
        return;
      }
      
      // Validate file size (500MB)
      if (file.size > 500 * 1024 * 1024) {
        toast.error("File size exceeds 500MB limit.");
        return;
      }
      
      handleUploadFile(file);
    }
  };

  return (
    <div 
      className="glass-panel h-[400px] rounded-xl flex items-center justify-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileInputChange} 
        accept="video/mp4,video/avi,video/quicktime,video/x-matroska"
        className="hidden"
      />
      <div className="text-center p-8">
        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">Upload a video to get started</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Drag and drop your video files here, or click the button below to browse.
          Supports MP4 and AVI files.
        </p>
        <Button 
          size="lg" 
          onClick={handleUpload}
          disabled={isUploading}
          className="rounded-full"
        >
          {isUploading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadPanel;
