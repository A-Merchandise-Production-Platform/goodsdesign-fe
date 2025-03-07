import { DynamicAdminHeader } from '../_components/dynamic-admin-header';
import CategoryManagement from './components/category-management';

export default function CategoriesPage() {
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Categories' },
        ]}
      />
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <CategoryManagement />
      </div>
    </div>
  );
}
