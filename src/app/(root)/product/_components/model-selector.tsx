import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export interface ModelSelectorProps {
  sizes: string[];
  title?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function ModelSelector({
  sizes,
  title = 'Size',
  defaultValue,
  value,
  onValueChange,
}: ModelSelectorProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">{title}</h3>
      <RadioGroup
        value={value}
        defaultValue={defaultValue || sizes[0]}
        onValueChange={onValueChange}
        className="flex flex-wrap gap-2"
      >
        {sizes.map(size => (
          <div key={size} className="flex items-center space-x-2">
            <RadioGroupItem
              value={size}
              id={`size-${size}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`size-${size}`}
              className="border-muted bg-background peer-data-[state=checked]:border-primary peer-data-[state=checked]:text-primary flex h-10 items-center justify-center rounded-md border px-3"
            >
              {size}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
