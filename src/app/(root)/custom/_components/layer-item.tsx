import React, { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Image as ImageIcon, Type } from 'lucide-react';
import { DesignObject } from '@/types/design-object';

interface LayerItemProps {
  id: number;
  designObject: DesignObject;
}

export function LayerItem({ id, designObject }: LayerItemProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  useEffect(() => {
    // Load image preview for image objects
    if (designObject.type === 'image' && designObject.src) {
      setImagePreview(designObject.src);
    }
  }, [designObject]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 rounded-md bg-background px-2 py-2 hover:bg-accent/5 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="hover:bg-accent rounded p-2 -ml-1"
      >
        <GripVertical className="size-4" />
      </button>

      {designObject.type === 'textbox' ? (
        <div className="flex gap-2 flex-1 min-w-0">
          <div className="flex items-center flex-1 min-w-0">
            <div className="size-10 flex-shrink-0 rounded-md bg-secondary/10 flex items-center justify-center">
              <Type className="size-4" />
            </div>
            <span className="text-xs truncate ml-2">
              {designObject.text}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-1 min-w-0">
          <div className="flex items-center flex-1 min-w-0">
            {imagePreview ? (
              <div className="size-10 flex-shrink-0 relative rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Layer preview"
                  className="object-contain w-full h-full bg-secondary/10"
                />
              </div>
            ) : (
              <div className="size-10 flex-shrink-0 rounded-md bg-secondary/10 flex items-center justify-center">
                <ImageIcon className="size-4" />
              </div>
            )}
            <span className="text-xs truncate ml-2">Image Layer</span>
          </div>
        </div>
      )}
    </div>
  );
}