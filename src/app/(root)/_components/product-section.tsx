import { ProductCard } from './product-card';

interface ProductSectionProps {
  products?: {
    category?: { name: string } | null;
    id: string;
    imageUrl?: string | null;
    isActive: boolean;
    name: string;
    description?: string | null;
    variants?: { price?: number | null }[] | null;
  }[];
}

export function ProductSection({ products = [] }: ProductSectionProps) {
  const getMinPrice = (variants?: { price?: number | null }[] | null) => {
    if (!variants?.length) return 0;
    const prices = variants
      .map(v => v.price)
      .filter((price): price is number => typeof price === 'number');
    return prices.length ? Math.min(...prices) : 0;
  };

  return (
    <div className="grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
      <div className="bg-accent/80 flex flex-col justify-center rounded-xl p-6">
        <div className="mb-4">
          <span className="bg-primary inline-flex items-center rounded-full px-3 py-1 text-xs text-white">
            <span className="mr-1">✨</span> Personalized
          </span>
        </div>
        <h3 className="text-primary mb-3 text-xl font-medium">
          Discover your new favorites with personalized product suggestions
        </h3>
        <p className="mt-auto text-sm">
          Make <span className="text-orange-600">unique</span>, custom products
          for you and your team.
        </p>
      </div>

      {products.map(product => (
        <ProductCard
          key={product.id}
          route={`product/${
            product.id === 'prod001'
              ? 'tshirt'
              : product.id === 'prod002'
                ? 'phonecase'
                : product.id
          }`}
          name={product.name}
          price={getMinPrice(product.variants)}
          image={product.imageUrl || ''}
          description={product.description || ''}
        />
      ))}
    </div>
  );
}
