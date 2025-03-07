'use client';
export default function Page() {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-4 gap-4 rounded-lg md:grid-cols-3">
      <div className="bg-muted/50 col-span-1 row-span-1 rounded-lg" />
      <div className="bg-muted/50 col-span-1 row-span-1 rounded-lg" />
      <div className="bg-muted/50 col-span-1 row-span-1 rounded-lg" />
      <div className="bg-muted/50 col-span-2 row-span-3 rounded-lg" />
      <div className="bg-muted/50 col-span-1 row-span-3 rounded-lg" />
    </div>
  );
}
