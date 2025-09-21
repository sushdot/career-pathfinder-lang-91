import { Check, Circle, ArrowRight } from "lucide-react";

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface ProgressTrackerProps {
  steps: ProgressStep[];
}

const ProgressTracker = ({ steps }: ProgressTrackerProps) => {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Your Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start gap-4">
            {/* Step Icon */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center smooth-transition ${
              step.completed 
                ? 'bg-primary border-primary' 
                : step.current 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border bg-background'
            }`}>
              {step.completed ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <Circle className={`h-3 w-3 ${step.current ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className={`font-medium ${
                  step.completed || step.current ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </h4>
                {step.current && (
                  <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
                )}
              </div>
              <p className={`text-sm mt-1 ${
                step.completed || step.current ? 'text-muted-foreground' : 'text-muted-foreground/60'
              }`}>
                {step.description}
              </p>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 mt-8 w-0.5 h-6 bg-border"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;