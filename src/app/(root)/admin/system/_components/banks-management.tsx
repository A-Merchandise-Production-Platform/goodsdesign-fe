'use client';

import { BuildingIcon } from 'lucide-react';

import { useGetAllSystemConfigBanksQuery } from '@/graphql/generated/graphql';

import { BankTable } from './bank-table';

export default function BanksManagement() {
  const { data, loading, refetch } = useGetAllSystemConfigBanksQuery();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <BuildingIcon className="h-4 w-4" />
            Total Banks
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.systemConfigBanks?.length || 0}
            <span className="text-muted-foreground ml-2 text-base font-medium">
              banks
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm">
          <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
            <BuildingIcon className="h-4 w-4" />
            Active Banks
          </div>
          <div className="flex-1 text-5xl font-bold">
            {data?.systemConfigBanks?.filter(bank => bank.isActive).length || 0}
            <span className="text-muted-foreground text-base font-medium">
              / {data?.systemConfigBanks?.length || 0}
              <span className="text-muted-foreground ml-2 text-base font-medium">
                banks
              </span>
            </span>
          </div>
        </div>
        <div className="bg-background col-span-1 row-span-1 flex h-40 flex-col gap-2 space-y-4 rounded-lg border p-4 shadow-sm"></div>
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
