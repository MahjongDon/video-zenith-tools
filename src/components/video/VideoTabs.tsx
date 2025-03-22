
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Tag, 
  Scissors, 
  LineChart, 
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoTabs = () => {
  return (
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
  );
};

export default VideoTabs;
