import { DynamicAdminHeader } from '@/app/(root)/admin/_components/dynamic-admin-header';

export default function AdminPage() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 col-span-2 h-[500px] rounded-xl" />
          <div className="bg-muted/50 col-span-1 h-[500px] rounded-xl" />
        </div>
      </div>
    </>
  );
}
