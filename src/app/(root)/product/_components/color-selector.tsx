import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export interface ColorSelectorProps {
  colors: Array<{
    name: string;
    hex: string;
  }>;
}

export function ColorSelector({ colors }: ColorSelectorProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">Color</h3>
      <RadioGroup defaultValue={colors[0].name} className="flex flex-wrap gap-3">
        {colors.map(color => (
          <div key={color.name} className="flex items-center space-x-2">
            <RadioGroupItem
              value={color.name}
              id={`color-${color.name}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`color-${color.name}`}
              className="border-muted peer-data-[state=checked]:ring-primary flex h-10 w-10 items-center justify-center rounded-full border peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-2"
              style={{
                backgroundColor: color.hex,
                borderColor: color.hex === '#ffffff' ? '#e2e8f0' : color.hex,
              }}
            >
              <span className="sr-only">{color.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}