import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System',
  description: 'System settings',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
