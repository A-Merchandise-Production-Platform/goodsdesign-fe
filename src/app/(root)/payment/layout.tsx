import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment',
  description: 'Payment description',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
