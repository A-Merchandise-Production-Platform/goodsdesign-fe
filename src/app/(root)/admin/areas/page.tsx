import { DynamicAdminHeader } from '../components/dynamic-admin-header';
import AreaManagement from './components/area-management';

export default function AreasPage() {
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Areas' },
        ]}
      />
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold">Area Management</h1>
        <AreaManagement />
      </div>
    </div>
  );
}
