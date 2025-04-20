export function LoadingCart() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Shopping Cart</h1>
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    </div>
  );
}
