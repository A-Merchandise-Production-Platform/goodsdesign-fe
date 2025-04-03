import { DesignCard } from './design-card';

export function DesignSection() {
  const designs: Array<{
    name: string;
    price: number;
    image: string;
    description: string;
    category: 'T-Shirt' | 'Phone Case';
  }> = [
    {
      name: 'Floral Pattern',
      price: 9.99,
      image: '/assets/tshirt-thumbnail.png',
      description: 'Elegant floral design with vibrant colors',
      category: 'T-Shirt',
    },
    {
      name: 'Geometric Shapes',
      price: 8.99,
      image: '/assets/tshirt-thumbnail.png',
      description: 'Modern geometric pattern with bold lines',
      category: 'T-Shirt',
    },
    {
      name: 'Abstract Art',
      price: 12.99,
      image: '/assets/phonecase-thumbnail.png',
      description: 'Colorful abstract design inspired by modern art',
      category: 'Phone Case',
    },
    {
      name: 'Minimalist Lines',
      price: 7.99,
      image: '/assets/phonecase-thumbnail.png',
      description: 'Clean, simple lines for a minimalist aesthetic',
      category: 'Phone Case',
    },
    {
      name: 'Vintage Logo',
      price: 10.99,
      image: '/assets/tshirt-thumbnail.png',
      description: 'Retro-inspired logo with distressed effects',
      category: 'T-Shirt',
    },
    {
      name: 'Nature Inspired',
      price: 11.99,
      image: '/assets/phonecase-thumbnail.png',
      description: 'Beautiful nature scenes with detailed illustrations',
      category: 'Phone Case',
    },
    {
      name: 'Typography',
      price: 8.99,
      image: '/assets/tshirt-thumbnail.png',
      description: 'Creative typography and inspirational quotes',
      category: 'T-Shirt',
    },
    {
      name: 'Custom Upload',
      price: 14.99,
      image: '/assets/tshirt-thumbnail.png',
      description: 'Upload your own design for a personalized product',
      category: 'T-Shirt',
    },
  ];

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold">Available Designs</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {designs.map((design, index) => (
          <DesignCard
            key={index}
            name={design.name}
            price={design.price}
            image={design.image}
            description={design.description}
            category={design.category}
          />
        ))}
      </div>
    </div>
  );
}
