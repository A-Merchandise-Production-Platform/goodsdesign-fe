import { MySidebar, NavItem } from '@/components/shared/my-sidebar';
import { HomeIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin panel',
};

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: <HomeIcon className="size-4" /> },
  {
    href: '/admin/users',
    label: 'Users',
    icon: <UsersIcon className="size-4" />,
  },
  {
    href: '/admin/products',
    label: 'Products',
    icon: <ShoppingCartIcon className="size-4" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-6">
      <MySidebar navItems={navItems} children={children} />
    </div>
  );
}
