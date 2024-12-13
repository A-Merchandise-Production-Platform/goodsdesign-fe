import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Manage categories',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
