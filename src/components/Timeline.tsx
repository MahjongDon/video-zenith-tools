
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight,
  MoveHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineProps {
  className?: string;
}

const Timeline = ({ className }: TimelineProps) => {
  const [zoomLevel, setZoomLevel] = useState(50);
  const [timelinePosition, setTimelinePosition] = useState(0);
  
  // Mock timeline clips data
  const mockClips = [
    { id: 1, start: 5, duration: 15, color: "bg-blue-400", title: "Intro" },
    { id: 2, start: 25, duration: 25, color: "bg-green-400", title: "Scene 1" },
    { id: 3, start: 55, duration: 20, color: "bg-purple-400", title: "Scene 2" },
    { id: 4, start: 80, duration: 10, color: "bg-orange-400", title: "Outro" },
  ];
  
  // Mock engagement data (for emotional tracking)
  const engagementData = [
    { position: 0, value: 30 },
    { position: 10, value: 45 },
    { position: 20, value: 60 },
    { position: 30, value: 90 },
    { position: 40, value: 70 },
    { position: 50, value: 40 },
    { position: 60, value: 50 },
    { position: 70, value: 75 },
    { position: 80, value: 85 },
    { position: 90, value: 60 },
    { position: 100, value: 35 },
  ];
  
  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value[0]);
  };
  
  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 100));
  };
  
  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 0));
  };
  
  // Calculate the timeline width based on zoom level
  const timelineWidth = 100 + zoomLevel * 4; // percentage
  
  const handleTimelinePositionChange = (value: number[]) => {
    setTimelinePosition(value[0]);
  };
  
  // Function to get color based on engagement value
  const getEngagementColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-lime-500";
    if (value >= 40) return "bg-yellow-500";
    if (value >= 20) return "bg-orange-500";
    return "bg-red-500";
  };
  
  return (
    <div className={cn("glass-panel p-4", className)}>
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Timeline</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={zoomOut}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Slider
            value={[zoomLevel]}
            min={0}
            max={100}
            step={1}
            onValueChange={handleZoomChange}
            className="w-24"
          />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-8 w-8"
            onClick={zoomIn}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="overflow-hidden relative">
        {/* Timeline ruler */}
        <div className="h-8 border-b border-gray-200 dark:border-gray-800 flex mb-1 relative">
          {[...Array(Math.ceil(timelineWidth / 5))].map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0"
              style={{ width: `${5}%` }}
            >
              <div className="relative h-full flex items-end pb-1">
                <div className="absolute bottom-0 w-px h-3 bg-gray-400 left-0"></div>
                <span className="text-xs text-gray-500 ml-1.5">
                  {i * 5}s
                </span>
              </div>
            </div>
          ))}
          
          {/* Current time indicator */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-primary z-10"
            style={{ left: "calc(30% - 1px)" }}
          >
            <div className="w-3 h-3 rounded-full bg-primary -ml-1 -mt-1.5"></div>
          </div>
        </div>
        
        {/* Timeline scroll container */}
        <div className="relative overflow-x-auto no-scrollbar">
          <div
            className="relative"
            style={{
              width: `${timelineWidth}%`,
              transform: `translateX(-${timelinePosition}%)`,
              transition: "transform 0.3s ease"
            }}
          >
            {/* Clips track */}
            <div className="h-12 relative mb-3">
              {mockClips.map((clip) => (
                <div
                  key={clip.id}
                  className={`absolute top-0 h-full rounded-md ${clip.color} flex items-center px-2 overflow-hidden cursor-pointer hover:brightness-105 transition-all border border-white/20`}
                  style={{
                    left: `${clip.start}%`,
                    width: `${clip.duration}%`,
                  }}
                >
                  <span className="text-xs font-medium text-white truncate">
                    {clip.title}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Engagement track */}
            <div className="h-16 bg-gray-100 dark:bg-gray-800/50 rounded-md p-1 relative">
              <div className="text-xs text-gray-500 absolute -top-5 left-2">
                Engagement & Vitality
              </div>
              
              {/* Engagement graph */}
              <div className="h-full flex items-end">
                {engagementData.map((point, index) => (
                  <div
                    key={index}
                    className="flex-1 flex items-end justify-center group"
                  >
                    <div
                      className={`${getEngagementColor(point.value)} w-full transition-all group-hover:brightness-110`}
                      style={{ height: `${point.value}%` }}
                    >
                      <div className="invisible group-hover:visible bg-black/80 text-white text-xs py-1 px-2 rounded absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        {point.value}% engagement
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Timeline position control */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <MoveHorizontal className="h-4 w-4 text-gray-500 mx-1" />
        <Slider
          value={[timelinePosition]}
          min={0}
          max={Math.max(0, timelineWidth - 100)}
          step={1}
          onValueChange={handleTimelinePositionChange}
          className="flex-1"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Timeline;
