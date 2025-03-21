'use client';

import BanksManagement from '@/app/(root)/admin/system/_components/banks-management';
import ColorsManagement from '@/app/(root)/admin/system/_components/colors-management';
import SizesManagement from '@/app/(root)/admin/system/_components/sizes-management';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Page() {
  return (
    <div className="bg-background container mx-auto rounded-lg p-4">
      <Tabs defaultValue="banks">
        <TabsList className="mb-4">
          <TabsTrigger value="banks">Banks</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
        </TabsList>
        <TabsContent value="banks">
          <BanksManagement />
        </TabsContent>
        <TabsContent value="colors">
          <ColorsManagement />
        </TabsContent>
        <TabsContent value="sizes">
          <SizesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
