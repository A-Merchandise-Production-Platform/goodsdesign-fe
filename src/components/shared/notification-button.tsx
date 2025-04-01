'use client';

import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotificationButton() {
  return (
    <Button variant="outline" size="icon">
      <Bell />
    </Button>
  );
}
