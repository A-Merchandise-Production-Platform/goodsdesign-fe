import Image from 'next/image';

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
            <div className="rounded-lg p-6">
              <h3 className="mb-1 font-medium">Step 1</h3>
              <h4 className="mb-2 text-xl font-bold">Pick your item</h4>
              <p className="mb-4 text-sm">
                Choose from accessories, drinkware, home decor, and apparel
                pieces.
              </p>
              <div className="relative mt-auto h-40">
                <Image
                  src="/assets/step-1.svg"
                  alt="Product selection"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="rounded-lg p-6">
              <h3 className="mb-1 font-medium">Step 2</h3>
              <h4 className="mb-2 text-xl font-bold">Create awesome designs</h4>
              <p className="mb-4 text-sm">
                Upload designs or make your own with our free tools
              </p>
              <div className="relative mt-auto h-40">
                <Image
                  src="/assets/step-2.svg"
                  alt="Design creation"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="rounded-lg p-6">
              <h3 className="mb-1 font-medium">Step 3</h3>
              <h4 className="mb-2 text-xl font-bold">Order and enjoy</h4>
              <p className="mb-4 text-sm">
                Simply order more items to automatically receive bigger
                discounts at checkout.
              </p>
              <div className="relative mt-auto h-40">
                <Image
                  src="/assets/step-3.svg"
                  alt="Order and save"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
