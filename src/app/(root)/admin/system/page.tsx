'use client';

import BanksManagement from '@/app/(root)/admin/system/_components/banks-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SystemConfigOrder from './_components/config-order';
import { DashboardShell } from '@/components/dashboard-shell';

export default function Page() {
  return (
    <DashboardShell title="System" subtitle="Manage your system">
      <div className="bg-background container mx-auto rounded-lg">
        <Tabs defaultValue="banks">
          <TabsList className="mb-4">
            <TabsTrigger value="banks">Banks</TabsTrigger>
            <TabsTrigger value="system-config-order">
              System Config Order
            </TabsTrigger>
          </TabsList>
          <TabsContent value="banks">
            <BanksManagement />
          </TabsContent>
          <TabsContent value="system-config-order">
            <SystemConfigOrder />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
