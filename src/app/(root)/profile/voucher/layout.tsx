import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voucher',
  description: 'Voucher',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
