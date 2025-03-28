import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customize',
  description: 'Choose your products to customize',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
