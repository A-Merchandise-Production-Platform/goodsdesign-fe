'use client';

import { BuildingIcon, AlertCircleIcon } from 'lucide-react';

import { StatCard, StatCardType } from '@/components/stat-card';
import { useGetAllSystemConfigBanksQuery } from '@/graphql/generated/graphql';

import { BankTable } from './bank-table';

export default function BanksManagement() {
  const { data, loading, refetch } = useGetAllSystemConfigBanksQuery();

  const totalBanks = data?.systemConfigBanks?.length || 0;
  const activeBanks =
    data?.systemConfigBanks?.filter(bank => bank.isActive).length || 0;
  const inactiveBanks = totalBanks - activeBanks;
  const activeBanksPercentage =
    totalBanks > 0 ? Math.round((activeBanks / totalBanks) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Banks"
          value={totalBanks}
          icon={<BuildingIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Active Banks"
          value={activeBanks}
          icon={<BuildingIcon className="h-5 w-5" />}
        />
        <StatCard
          title="Inactive Banks"
          value={inactiveBanks}
          icon={<AlertCircleIcon className="h-5 w-5" />}
        />
      </div>
      <div className="bg-background col-span-3 row-span-3 rounded-lg">
        <BankTable
          refetch={refetch}
          loading={loading}
          data={data?.systemConfigBanks}
        />
      </div>
    </div>
  );
}
