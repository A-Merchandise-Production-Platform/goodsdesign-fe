import { DashboardShell } from '@/components/dashboard-shell';
import BankList from './_components/bank-list';

export default function Page() {
  return (
    <DashboardShell
      title="Payments"
      subtitle="Manage your bank accounts and payment methods"
    >
      <BankList />
    </DashboardShell>
  );
}
