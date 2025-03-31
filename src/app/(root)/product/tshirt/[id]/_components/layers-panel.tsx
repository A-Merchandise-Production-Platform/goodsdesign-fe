import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { DesignObject } from '../_types/design-object';
import { ImageIcon, Type } from 'lucide-react';

interface LayersPanelProps {
  designs: DesignObject[];
  onReorder: (startIndex: number, endIndex: number) => void;
}

export function LayersPanel({ designs, onReorder }: LayersPanelProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="layers">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {designs.map((design, index) => (
              <Draggable
                key={design.layer}
                draggableId={design.layer || index.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card p-2"
                  >
                    {design.type === 'image' ? (
                      <ImageIcon className="h-4 w-4" />
                    ) : (
                      <Type className="h-4 w-4" />
                    )}
                    <span className="text-sm">
                      {design.type === 'image'
                        ? 'Image'
                        : design.text || 'Text'}
                    </span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
