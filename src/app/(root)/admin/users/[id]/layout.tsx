import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users details',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
