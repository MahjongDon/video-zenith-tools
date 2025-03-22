
import { FileText, Upload, Tag, Scissors } from "lucide-react";

const GettingStartedPanel = () => {
  return (
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
  );
};

export default GettingStartedPanel;
