import Image from 'next/image';

const steps = [
  {
    step: 1,
    title: 'Pick your item',
    description: 'Choose from accessories, drinkware, home decor, and apparel pieces.',
    image: {
      src: '/assets/step-1.svg',
      alt: 'Product selection'
    }
  },
  {
    step: 2,
    title: 'Create awesome designs',
    description: 'Upload designs or make your own with our free tools',
    image: {
      src: '/assets/step-2.svg',
      alt: 'Design creation'
    }
  },
  {
    step: 3,
    title: 'Order and enjoy',
    description: 'Simply order more items to automatically receive bigger discounts at checkout.',
    image: {
      src: '/assets/step-3.svg',
      alt: 'Order and save'
    }
  }
];

export function PromotionalBanner() {
  return (
    <div className="bg-background-secondary text-foreground mb-10 overflow-hidden rounded-xl">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="flex flex-col justify-center p-8">
          <h2 className="mb-4 text-3xl font-bold">
            The more you order, the more you save!
          </h2>
        </div>
        <div className="p-4 md:col-span-3">
          <div className="bg-background/50 grid h-full gap-4 rounded-l-xl md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.step} className="rounded-lg p-6 flex flex-col">
                <div>
                  <h3 className="mb-1 font-medium">Step {step.step}</h3>
                  <h4 className="mb-2 text-xl font-bold">{step.title}</h4>
                  <p className="mb-4 text-sm">{step.description}</p>
                </div>
                <div className="relative mt-auto h-40 rounded-xl bg-[#0d756e]">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    className="object-bottom object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
