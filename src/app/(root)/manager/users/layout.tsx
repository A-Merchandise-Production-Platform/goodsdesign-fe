import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff Management',
  description: 'Manage your staff',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
