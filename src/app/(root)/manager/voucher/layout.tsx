import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voucher',
  description: 'Voucher',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
