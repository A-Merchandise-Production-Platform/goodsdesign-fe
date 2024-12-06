import { DynamicAdminHeader } from '@/app/(root)/admin/components/dynamic-admin-header';

export default function Page() {
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Users management' },
        ]}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">user page</div>
    </div>
  );
}
