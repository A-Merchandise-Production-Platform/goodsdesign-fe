'use client';

import BanksManagement from '@/app/(root)/admin/system/_components/banks-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SystemConfigOrder from './_components/config-order';

export default function Page() {
  return (
    <div className="bg-background container mx-auto rounded-lg pb-12">
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
  );
}
