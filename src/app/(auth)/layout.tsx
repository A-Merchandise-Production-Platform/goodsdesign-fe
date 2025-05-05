import AlreadyAuthen from '@/providers/already-authen';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AlreadyAuthen>{children}</AlreadyAuthen>;
}
