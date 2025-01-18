import { PenBoxIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function EditUserButton() {
  return (
    <Button variant={'outline-info'}>
      <PenBoxIcon size={16} />
      Edit
    </Button>
  );
}
