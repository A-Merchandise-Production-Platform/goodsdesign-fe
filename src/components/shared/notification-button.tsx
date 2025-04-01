'use client';

import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export default function NotificationButton() {
  return (
    <Button variant="outline" size="icon">
      <Bell />
    </Button>
  );
}
