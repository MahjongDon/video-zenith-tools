
import { Button } from "@/components/ui/button";
import { Save, Download } from "lucide-react";

const VideoActions = () => {
  return (
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
  );
};

export default VideoActions;
