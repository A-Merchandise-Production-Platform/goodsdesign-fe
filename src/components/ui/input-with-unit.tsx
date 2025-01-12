import React from 'react';
import { Input } from '@/components/ui/input';

interface InputWithUnitProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  unit: string;
}

export const InputWithUnit: React.FC<InputWithUnitProps> = ({
  unit,
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      <Input type="number" {...props} className="pr-12" />
      <span className="absolute right-3 text-sm text-gray-500">{unit}</span>
    </div>
  );
};
