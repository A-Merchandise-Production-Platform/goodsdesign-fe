import { DesignCard } from "./design-card"

export function DesignSection() {
  const designs = [
    {
      name: "Floral Pattern",
      price: 9.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Elegant floral design with vibrant colors",
      category: "T-shirt",
    },
    {
      name: "Geometric Shapes",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Modern geometric pattern with bold lines",
      category: "T-shirt",
    },
    {
      name: "Abstract Art",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Colorful abstract design inspired by modern art",
      category: "Phone Case",
    },
    {
      name: "Minimalist Lines",
      price: 7.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Clean, simple lines for a minimalist aesthetic",
      category: "Phone Case",
    },
    {
      name: "Vintage Logo",
      price: 10.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Retro-inspired logo with distressed effects",
      category: "T-shirt",
    },
    {
      name: "Nature Inspired",
      price: 11.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Beautiful nature scenes with detailed illustrations",
      category: "Phone Case",
    },
    {
      name: "Typography",
      price: 8.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Creative typography and inspirational quotes",
      category: "T-shirt",
    },
    {
      name: "Custom Upload",
      price: 14.99,
      image: "/placeholder.svg?height=200&width=200",
      description: "Upload your own design for a personalized product",
      category: "T-shirt",
    },
  ]

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Available Designs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  )
}

