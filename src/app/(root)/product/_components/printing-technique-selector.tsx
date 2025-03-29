import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';

export interface PrintingTechniqueSelectorProps {
  techniques: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
  }>;
}

export function PrintingTechniqueSelector({
  techniques,
}: PrintingTechniqueSelectorProps) {
  return (
    <div>
      <h3 className="mb-3 text-lg font-medium">Printing Technique</h3>
      <RadioGroup defaultValue={techniques[0].id} className="space-y-3">
        {techniques.map(technique => (
          <div key={technique.id} className="flex items-start space-x-2">
            <RadioGroupItem
              value={technique.id}
              id={`technique-${technique.id}`}
              className="peer mt-1"
            />
            <Label
              htmlFor={`technique-${technique.id}`}
              className="grid w-full cursor-pointer grid-cols-[1fr_auto_1fr] items-start gap-4"
            >
              <span className="font-medium">{technique.name}</span>
              <span className="text-primary font-medium">
                {formatPrice(technique.price)}
              </span>
              <span className="text-muted-foreground col-span-3 text-sm">
                {technique.description}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
