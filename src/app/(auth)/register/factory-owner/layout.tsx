import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register as a factory owner',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
