import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface TagsInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  tagsClassName?: string;
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      className,
      inputClassName,
      tagsClassName,
      value,
      onChange,
      placeholder = 'Add tags...',
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      // Convert to tag on space, Enter, or comma
      if (
        (e.key === ' ' || e.key === 'Enter' || e.key === ',') &&
        inputValue.trim() !== ''
      ) {
        e.preventDefault();

        const newTag = inputValue.trim();

        // Only add if tag doesn't already exist
        if (!value.includes(newTag)) {
          onChange([...value, newTag]);
        }

        setInputValue('');
      }

      // Remove last tag on backspace if input is empty
      if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
        e.preventDefault();
        onChange(value.slice(0, -1));
      }
    };

    const removeTag = (tagToRemove: string) => {
      onChange(value.filter(tag => tag !== tagToRemove));
    };

    return (
      <div
        className={cn(
          'focus-visible:border-ring focus-visible:ring-ring/50 flex flex-wrap gap-2 rounded-xl border p-2 focus-visible:ring-[3px]',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        {value.map(tag => (
          <Badge
            key={tag}
            variant="secondary"
            className={cn('gap-1 px-2 py-1', tagsClassName)}
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              disabled={disabled}
              className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </button>
          </Badge>
        ))}
        <Input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={cn('min-w-24 flex-1 border-none p-2', inputClassName)}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ''}
          {...props}
        />
      </div>
    );
  },
);

TagsInput.displayName = 'TagsInput';

export { TagsInput };
