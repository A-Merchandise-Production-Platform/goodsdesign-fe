'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FactorySettingsTabProps {
  factory: any; // Type should be more specific based on your GraphQL schema
}

export function FactorySettingsTab({ factory }: FactorySettingsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Factory Settings</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Settings content would go here, currently empty in the original code */}
      </CardContent>
    </Card>
  );
}
