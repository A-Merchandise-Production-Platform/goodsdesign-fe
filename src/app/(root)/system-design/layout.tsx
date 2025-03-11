import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Design',
  description: 'System Design',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
