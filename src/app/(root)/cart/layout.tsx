import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Cart',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
