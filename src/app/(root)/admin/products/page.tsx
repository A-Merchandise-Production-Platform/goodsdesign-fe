import ProductList from '@/app/(root)/admin/products/_components/product-list';

export default function CategoriesPage() {
  return (
    <div className="h-full gap-4 space-y-4 rounded-lg">
      <div className="grid h-52 w-full grid-cols-3 gap-4">
        <div className="bg-background col-span-1 rounded-lg" />
        <div className="bg-background col-span-1 rounded-lg" />
        <div className="bg-background col-span-1 rounded-lg" />
      </div>
      <div className="bg-background col-span-3 rounded-lg p-4">
        <ProductList />
      </div>
    </div>
  );
}
