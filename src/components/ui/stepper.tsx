'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

export interface Step {
  id: string;
  name: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  const progressValue = ((currentStep + 1) / steps.length) * 100;
  console.log(progressValue);
  return (
    <nav aria-label="Registration progress" className="relative z-0">
      <ol role="list" className="flex items-center justify-between">
        {steps.map((step, index) => (
          <li key={step.name} className="flex-1">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onStepClick(index)}
                className={cn(
                  'group flex flex-col items-center',
                  index <= currentStep
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed',
                )}
                disabled={index > currentStep}
              >
                <span className="flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index <= currentStep ? 'completed' : 'not-completed'}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'flex size-10 items-center justify-center rounded-full border-2 bg-background',
                        index <= currentStep
                          ? 'border-primary text-primary'
                          : 'border-muted-foreground text-muted-foreground',
                      )}
                    >
                      {index < currentStep ? (
                        <Check
                          className="h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="mt-2 text-sm font-medium">{step.name}</span>
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="absolute left-0 top-5 -z-10 w-full">
        <Progress value={progressValue} className="h-1" />
      </div>
    </nav>
  );
}
