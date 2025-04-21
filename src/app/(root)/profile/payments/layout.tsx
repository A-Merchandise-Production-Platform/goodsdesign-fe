import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payments',
  description: 'Payments',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
