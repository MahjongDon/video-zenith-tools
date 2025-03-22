
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Video, FileText, Scissors, LineChart } from "lucide-react";
import { Link } from "react-router-dom";
import FeatureCard from "./FeatureCard";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <span className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6 opacity-0 animate-fade-in">
          Professional Video Editing Made Simple
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 opacity-0 animate-fade-in animation-delay-200">
          Edit Videos Like a Pro
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl text-balance opacity-0 animate-fade-in animation-delay-400">
          Transcribe, analyze, and create perfect video clips with our intuitive editor.
          No experience needed — just powerful results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-16 opacity-0 animate-fade-in animation-delay-600">
          <Link to="/workspace">
            <Button size="lg" className="rounded-full h-12 px-6">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/workspace">
            <Button variant="outline" size="lg" className="rounded-full h-12 px-6">
              <Upload className="mr-2 h-4 w-4" /> Upload Video
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Preview Mock */}
      <div className="relative max-w-5xl mx-auto mb-16">
        <div className="glass-panel aspect-video rounded-xl overflow-hidden opacity-0 animate-scale-in animation-delay-600">
          <div className="w-full h-full bg-gradient-to-tr from-primary/5 via-primary/10 to-accent/5 flex items-center justify-center">
            <div className="text-center">
              <Video className="h-16 w-16 text-primary/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                Your video workspace will appear here
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 opacity-0 animate-fade-in">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={FileText}
            title="Transcription"
            description="Convert speech to text with timestamps synced to your video timeline."
            delay="animation-delay-200"
          />
          <FeatureCard
            icon={Video}
            title="Video Analysis"
            description="Detect scenes, objects, and key moments automatically."
            delay="animation-delay-400"
          />
          <FeatureCard
            icon={Scissors}
            title="Clip Making"
            description="Trim, combine and export perfect clips with a user-friendly interface."
            delay="animation-delay-600"
          />
          <FeatureCard
            icon={LineChart}
            title="Engagement Tracking"
            description="Visualize emotional engagement and energy levels across your video."
            delay="animation-delay-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
