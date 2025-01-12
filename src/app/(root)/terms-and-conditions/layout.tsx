import { Metadata } from 'next';

import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Header />
      {children}
      <Footer />
    </section>
  );
}
