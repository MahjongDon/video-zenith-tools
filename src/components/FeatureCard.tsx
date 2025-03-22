
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  delay?: string;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className,
  delay
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "glass-panel p-6 opacity-0 animate-slide-in-from-bottom",
        delay,
        className
      )}
    >
      <div className="bg-primary/10 rounded-full p-3 w-fit mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
