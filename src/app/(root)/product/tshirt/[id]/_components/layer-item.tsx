import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Image as ImageIcon, Type } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

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
      className={`bg-background hover:bg-accent/5 flex items-center gap-2 rounded-md px-2 py-2 ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="hover:bg-accent -ml-1 rounded p-2"
      >
        <GripVertical className="size-4" />
      </button>

      {designObject.type === 'textbox' ? (
        <div className="flex min-w-0 flex-1 gap-2">
          <div className="flex min-w-0 flex-1 items-center">
            <div className="bg-secondary/10 flex size-10 flex-shrink-0 items-center justify-center rounded-md">
              <Type className="size-4" />
            </div>
            <span className="ml-2 truncate text-xs">{designObject.text}</span>
          </div>
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 gap-2">
          <div className="flex min-w-0 flex-1 items-center">
            {imagePreview ? (
              <div className="relative size-10 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={imagePreview}
                  alt="Layer preview"
                  width={40}
                  height={40}
                  className="bg-secondary/10 h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="bg-secondary/10 flex size-10 flex-shrink-0 items-center justify-center rounded-md">
                <ImageIcon className="size-4" />
              </div>
            )}
            <span className="ml-2 truncate text-xs">Image Layer</span>
          </div>
        </div>
      )}
    </div>
  );
}
