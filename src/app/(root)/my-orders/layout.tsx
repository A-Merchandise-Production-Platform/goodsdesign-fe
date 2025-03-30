import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Order',
  description: 'My Order',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
