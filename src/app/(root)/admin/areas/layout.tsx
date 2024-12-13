import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Areas',
  description: 'Manage areas',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
