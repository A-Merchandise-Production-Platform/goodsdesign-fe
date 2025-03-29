import { ProductCard } from './product-card';

export function ProductSection() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
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

      <ProductCard
        route="product/tshirt"
        name="T-Shirt"
        price={24.99}
        image="/assets/tshirt-thumbnail.png"
        description="100% cotton premium t-shirt available in multiple sizes and colors"
      />

      <ProductCard
        route="product/phonecase"
        name="Phone Case"
        price={19.99}
        image="/assets/phonecase-thumbnail.png"
        description="Durable phone case available for various phone models"
      />
    </div>
  );
}
