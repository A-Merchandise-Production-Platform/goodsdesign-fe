'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SizesTable } from './_components/sizes-table';
import { ColorsTable } from './_components/colors-table';
import { BanksTable } from './_components/banks-table';

export default function Page() {
  const [activeTab, setActiveTab] = useState('sizes');

  return (
    <div className="bg-background container mx-auto rounded-lg p-4">
      <h1 className="mb-4 text-2xl font-bold">System Configuration</h1>

      <Tabs
        defaultValue="sizes"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="sizes">Sizes</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="banks">Banks</TabsTrigger>
        </TabsList>

        <TabsContent value="sizes">
          <SizesTable />
        </TabsContent>

        <TabsContent value="colors">
          <ColorsTable />
        </TabsContent>

        <TabsContent value="banks">
          <BanksTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
