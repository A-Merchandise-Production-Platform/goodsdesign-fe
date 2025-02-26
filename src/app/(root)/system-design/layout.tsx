import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

export const metdata: Metadata = {
  title: 'System Design',
  description: 'System Design',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-16">
      <Header />
      {children}
      <Footer />
    </section>
  );
}
