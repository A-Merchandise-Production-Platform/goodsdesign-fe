import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | Products',
  description: 'Products',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
