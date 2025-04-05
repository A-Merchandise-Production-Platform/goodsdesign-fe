import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Factory',
  description: 'Factory',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
