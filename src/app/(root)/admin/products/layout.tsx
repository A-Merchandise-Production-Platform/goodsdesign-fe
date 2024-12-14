import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage products',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
