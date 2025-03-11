import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

export const metadata: Metadata = {
  title: 'System Design',
  description: 'System Design',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
