import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface ColorSelectorProps {
  colors: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export function ColorSelector({
  colors,
  value,
  onValueChange,
  defaultValue,
}: ColorSelectorProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">Color</h3>
      <RadioGroup
        value={value}
        defaultValue={defaultValue || colors[0]}
        onValueChange={onValueChange}
        className="flex flex-wrap gap-3"
      >
        {colors.map(color => (
          <div key={color} className="flex items-center space-x-2">
            <RadioGroupItem
              value={color}
              id={`color-${color}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`color-${color}`}
              className="border-muted peer-data-[state=checked]:ring-primary flex h-10 w-10 items-center justify-center rounded-full border peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-2"
              style={{
                backgroundColor: color,
                borderColor: color === '#ffffff' ? '#e2e8f0' : color,
              }}
            >
              <span className="sr-only">{color}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
