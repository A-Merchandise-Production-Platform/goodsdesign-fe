import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { LayerItem } from './layer-item';
import { DesignObject } from '@/types/design-object';

interface LayersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designs: DesignObject[];
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function LayersDialog({
  open,
  onOpenChange,
  designs,
  onReorder,
}: LayersDialogProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Layers</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
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
      </DialogContent>
    </Dialog>
  );
}