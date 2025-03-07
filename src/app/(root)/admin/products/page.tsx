import { DynamicAdminHeader } from '../_components/dynamic-admin-header';
import ProductManagement from './components/product-management';

export default function CategoriesPage() {
  return (
    <div>
      <DynamicAdminHeader
        breadcrumbs={[
          { href: '/admin', label: 'Dashboard' },
          { label: 'Products' },
        ]}
      />
      <div className="mx-auto p-4">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <ProductManagement />
      </div>
    </div>
  );
}
