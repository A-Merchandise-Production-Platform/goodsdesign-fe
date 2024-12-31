/* eslint-disable unicorn/no-null */
'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Step, Stepper } from '@/components/ui/stepper';

const steps: Step[] = [
  { id: 'account', name: 'Account', description: 'Create your account' },
  { id: 'information', name: 'Information', description: 'Add your details' },
  { id: 'contract', name: 'Contract', description: 'Review and sign' },
];

export default function RegisterFactoryOwnerForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    goToStep(currentStep + 1);
  };

  const previousStep = () => {
    goToStep(currentStep - 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0: {
        return <div>Account step content</div>;
      }
      case 1: {
        return <div>Information step content</div>;
      }
      case 2: {
        return <div>Contract step content</div>;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div>
      <Stepper steps={steps} currentStep={currentStep} onStepClick={goToStep} />
      <div className="mt-8 min-h-[200px]">{renderStepContent(currentStep)}</div>
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={previousStep}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button onClick={nextStep} disabled={currentStep === steps.length - 1}>
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
