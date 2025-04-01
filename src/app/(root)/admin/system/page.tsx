'use client';

import BanksManagement from '@/app/(root)/admin/system/_components/banks-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page() {
  return (
    <div className="bg-background container mx-auto rounded-lg">
      <Tabs defaultValue="banks">
        <TabsList className="mb-4">
          <TabsTrigger value="banks">Banks</TabsTrigger>
        </TabsList>
        <TabsContent value="banks">
          <BanksManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
