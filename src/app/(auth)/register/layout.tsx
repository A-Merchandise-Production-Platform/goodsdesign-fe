import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="container mx-auto mt-14">{children}</main>;
}
