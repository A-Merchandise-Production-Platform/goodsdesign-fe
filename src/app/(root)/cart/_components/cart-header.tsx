import { Checkbox } from '@/components/ui/checkbox';

interface CartHeaderProps {
  itemCount: number;
  areAllItemsSelected: boolean;
  onToggleAll: (checked: boolean) => void;
}

export function CartHeader({ itemCount, areAllItemsSelected, onToggleAll }: CartHeaderProps) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">
        Shopping Cart ({itemCount} items)
      </h1>
      <div className="mb-4 flex items-center">
        <Checkbox
          id="select-all"
          checked={areAllItemsSelected}
          onCheckedChange={onToggleAll}
        />
        <label htmlFor="select-all" className="ml-2 cursor-pointer">
          Select All Items
        </label>
      </div>
    </>
  );
}