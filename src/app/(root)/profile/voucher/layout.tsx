import { DashboardShell } from '@/components/dashboard-shell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voucher',
  description: 'Voucher',
};

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell title="Voucher" subtitle="This is your voucher page">
      {children}
    </DashboardShell>
  );
}
