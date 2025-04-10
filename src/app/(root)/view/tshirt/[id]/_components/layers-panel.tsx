import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Layers } from 'lucide-react';
import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DesignObject } from '@/types/design-object';

import { LayerItem } from './layer-item';

interface LayersPanelProps {
  designs: DesignObject[];
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function LayersPanel({ designs, onReorder }: LayersPanelProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = Number(active.id);
      const newIndex = Number(over.id);
      onReorder(oldIndex, newIndex);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-muted-foreground hover:bg-primary/5 dark:hover:bg-muted block w-full cursor-pointer rounded-md px-3 py-2 text-sm">
          <div className="flex w-full items-center gap-2">
            <Layers className="size-4" />
            <div>Layers</div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="space-y-1 p-2">
          <div className="px-2 py-1 text-sm font-medium">Layers</div>
          <div className="space-y-1">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={designs.map((_, index) => index)}
                strategy={verticalListSortingStrategy}
              >
                {designs.map((design, index) => (
                  <LayerItem key={index} id={index} designObject={design} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
