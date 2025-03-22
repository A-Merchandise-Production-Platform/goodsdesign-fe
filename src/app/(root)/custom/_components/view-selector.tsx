import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ViewSelectorProps {
  view: string;
  onViewChange: (view: string) => void;
}

const ViewSelector: React.FC<ViewSelectorProps> = ({ view, onViewChange }) => {
  return (
    <Tabs value={view} onValueChange={onViewChange} className="border-b">
      <TabsList className="z-50 w-full justify-start rounded-none">
        <TabsTrigger value="front">Front</TabsTrigger>
        <TabsTrigger value="back">Back</TabsTrigger>
        <TabsTrigger value="left-sleeve">Left sleeve</TabsTrigger>
        <TabsTrigger value="right-sleeve">Right sleeve</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ViewSelector;
