import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import AlreadyAuthenProvider from '@/providers/already-authen-denied-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
