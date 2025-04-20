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
    manager: 'Dashboard',
    users: 'Users Management',
    staff: 'Staff',
    orders: 'Orders',
    factory: 'Factory Management',
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

export function ManagerBreadcrumbNav() {
  const pathname = usePathname();

  if (!pathname.startsWith('/manager')) {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  // Create breadcrumb items based on the path segments
  const breadcrumbItems = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;

    const label = formatLabel(segment);

    if (isLast) {
      return (
        <BreadcrumbItem key={href}>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      );
    }

    return (
      <BreadcrumbItem key={href}>
        <BreadcrumbLink asChild>
          <Link href={href}>{label}</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
      </BreadcrumbItem>
    );
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
          <BreadcrumbSeparator />
        </BreadcrumbItem>
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
