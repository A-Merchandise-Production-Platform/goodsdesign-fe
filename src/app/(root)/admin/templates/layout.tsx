import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Templates',
  description: 'Templates management',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
