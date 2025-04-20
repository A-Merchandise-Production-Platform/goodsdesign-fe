'use client';

import { HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Helper to format labels
const formatLabel = (segment: string): string => {
  // Check if the segment is a dynamic route parameter (usually in format [id])
  if (segment.match(/^[a-f\d]{24}$/) || segment.match(/^\d+$/)) {
    return 'Details';
  }

  // Special case mappings
  const specialCases: Record<string, string> = {
    admin: 'Dashboard',
    users: 'Users Management',
    products: 'Products Management',
    categories: 'Categories Management',
    system: 'System Settings',
  };

  if (specialCases[segment]) {
    return specialCases[segment];
  }

  // Capitalize first letter and add spaces between camelCase
  return (
    segment.charAt(0).toUpperCase() +
    segment.slice(1).replace(/([A-Z])/g, ' $1')
  );
};

export function AdminBreadcrumbNav() {
  const pathname = usePathname();

  if (!pathname.startsWith('/admin')) {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  // Create breadcrumb items with separators between them
  const breadcrumbItems: React.ReactNode[] = [];

  segments.forEach((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    const label = formatLabel(segment);

    if (isLast) {
      breadcrumbItems.push(
        <BreadcrumbItem key={href}>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>,
      );
    } else {
      breadcrumbItems.push(
        <BreadcrumbItem key={href}>
          <BreadcrumbLink asChild>
            <Link href={href}>{label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>,
      );
      // Add separator as a separate item
      breadcrumbItems.push(<BreadcrumbSeparator key={`${href}-separator`} />);
    }
  });

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <HomeIcon className="size-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
