import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import AlreadyAuthenProvider from '@/providers/already-authen-denied-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto mt-14">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
