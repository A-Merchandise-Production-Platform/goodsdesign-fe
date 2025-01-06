import AreaDataTable from '@/app/(root)/admin/areas/components/area-data-table';
import { ScrollArea } from '@/components/ui/scroll-area';

import { DynamicAdminHeader } from '../components/dynamic-admin-header';
import AreaManagement from './components/area-management';

export default function AreasPage() {
  return (
    <div className="flex h-screen flex-col">
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Areas' },
        ]}
      />
      <ScrollArea className="flex-grow">
        <div className="p-4">
          <h1 className="mb-4 text-2xl font-bold">Area Management</h1>
          <AreaDataTable />
        </div>
      </ScrollArea>
    </div>
  );
}
