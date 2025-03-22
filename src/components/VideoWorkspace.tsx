
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "./VideoPlayer";
import Timeline from "./Timeline";
import { 
  Upload, 
  FileText, 
  Tag, 
  Scissors, 
  LineChart, 
  Save, 
  Download,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const VideoWorkspace = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  
  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setVideoUploaded(true);
    }, 2000);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left panel */}
        <div className="lg:w-2/3">
          {!videoUploaded ? (
            <div className="glass-panel h-[400px] rounded-xl flex items-center justify-center">
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
          ) : (
            <VideoPlayer className="mb-6" />
          )}
          
          {videoUploaded && (
            <Timeline className="mb-6" />
          )}
          
          {videoUploaded && (
            <div className="flex flex-wrap gap-3 mb-6">
              <Button className="rounded-full">
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </Button>
              <Button variant="outline" className="rounded-full">
                <Download className="h-4 w-4 mr-2" />
                Export MP4
              </Button>
            </div>
          )}
        </div>
        
        {/* Right panel */}
        <div className="lg:w-1/3">
          {videoUploaded ? (
            <Tabs defaultValue="transcription" className="w-full">
              <TabsList className="w-full grid grid-cols-4 mb-4">
                <TabsTrigger value="transcription" className="text-xs">
                  <FileText className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Transcription</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="text-xs">
                  <Tag className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="clips" className="text-xs">
                  <Scissors className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Clips</span>
                </TabsTrigger>
                <TabsTrigger value="engagement" className="text-xs">
                  <LineChart className="h-4 w-4 lg:mr-2" />
                  <span className="hidden lg:inline">Engagement</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcription" className="mt-0">
                <div className="glass-panel p-4 h-[500px] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Transcription</h3>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Generate
                    </Button>
                  </div>
                  
                  <div className="text-muted-foreground text-center my-8">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-40" />
                    <p>Click Generate to transcribe your video</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-0">
                <div className="glass-panel p-4 h-[500px] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Video Analysis</h3>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Analyze
                    </Button>
                  </div>
                  
                  <div className="text-muted-foreground text-center my-8">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-40" />
                    <p>Click Analyze to detect scenes and objects</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="clips" className="mt-0">
                <div className="glass-panel p-4 h-[500px] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Clip Maker</h3>
                    <Button variant="default" size="sm" className="text-xs h-8">
                      <Scissors className="h-3 w-3 mr-1" />
                      New Clip
                    </Button>
                  </div>
                  
                  <div className="text-muted-foreground text-center my-8">
                    <Scissors className="h-12 w-12 mx-auto mb-4 opacity-40" />
                    <p>Create clips from your video</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="engagement" className="mt-0">
                <div className="glass-panel p-4 h-[500px] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Engagement Metrics</h3>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Calculate
                    </Button>
                  </div>
                  
                  <div className="text-muted-foreground text-center my-8">
                    <LineChart className="h-12 w-12 mx-auto mb-4 opacity-40" />
                    <p>Track emotional engagement and energy levels</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <div className="glass-panel p-6 h-full">
              <h3 className="text-lg font-medium mb-4">Getting Started</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <Upload className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Upload your video</p>
                    <p className="text-muted-foreground text-sm">MP4 or AVI format, max 500MB</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Generate transcription</p>
                    <p className="text-muted-foreground text-sm">Convert speech to text with timestamps</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <Tag className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Analyze content</p>
                    <p className="text-muted-foreground text-sm">Detect scenes, objects, and key moments</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                    <Scissors className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Create and export clips</p>
                    <p className="text-muted-foreground text-sm">Trim and save perfect video segments</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoWorkspace;
