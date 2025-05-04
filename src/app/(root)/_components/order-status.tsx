import {
  CheckCircle2,
  ClipboardList,
  FileText,
  Package,
  Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export const getStatusBadge = (status: string) => {
  const statusMap: Record<
    string,
    {
      label: string;
      variant: 'default' | 'secondary' | 'destructive' | 'outline';
    }
  > = {
    PENDING: { label: 'Pending', variant: 'outline' },
    PROCESSING: { label: 'Processing', variant: 'secondary' },
    COMPLETED: { label: 'Completed', variant: 'default' },
    CANCELLED: { label: 'Cancelled', variant: 'destructive' },
    SHIPPED: { label: 'Shipped', variant: 'default' },
    PAID: { label: 'Paid', variant: 'default' },
    UNPAID: { label: 'Unpaid', variant: 'outline' },
    PAYMENT_RECEIVED: { label: 'Payment Received', variant: 'default' },
    WAITING_FILL_INFORMATION: {
      label: 'Waiting for Information',
      variant: 'outline',
    },
    NEED_MANAGER_HANDLE: { label: 'Needs Manager', variant: 'outline' },
    PENDING_ACCEPTANCE: { label: 'Pending Acceptance', variant: 'outline' },
    REJECTED: { label: 'Rejected', variant: 'destructive' },
    IN_PRODUCTION: { label: 'In Production', variant: 'secondary' },

    WAITING_FOR_CHECKING_QUALITY: {
      label: 'Quality Check',
      variant: 'default',
    },
    DONE_CHECK_QUALITY: {
      label: 'Quality Check Done',
      variant: 'secondary',
    },
    APPROVED: { label: 'Approved', variant: 'default' },
    REFUNDED: { label: 'Refunded', variant: 'default' },
    WAITING_FOR_REFUND: { label: 'Waiting for Refund', variant: 'secondary' },

    REWORK_REQUIRED: { label: 'Rework Required', variant: 'destructive' },
    REWORK_IN_PROGRESS: { label: 'Rework in Progress', variant: 'secondary' },
    REWORK_DONE: { label: 'Rework Done', variant: 'default' },
    WAITING_PAYMENT: { label: 'Waiting Payment', variant: 'outline' },
    READY_FOR_SHIPPING: { label: 'Ready for Shipping', variant: 'secondary' },
    SHIPPING: { label: 'Shipping', variant: 'secondary' },
  };

  const config = statusMap[status] || { label: status, variant: 'outline' };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Helper function to get payment status badge
export const getPaymentStatusBadge = (status: string) => {
  const statusMap: Record<
    string,
    {
      label: string;
      variant: 'default' | 'secondary' | 'destructive' | 'outline';
    }
  > = {
    PENDING: { label: 'Pending', variant: 'outline' },
    COMPLETED: { label: 'Completed', variant: 'default' },
    FAILED: { label: 'Failed', variant: 'destructive' },
  };

  const config = statusMap[status] || { label: status, variant: 'outline' };

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Refund status timeline steps
export const refundStatusSteps = [
  {
    group: 'waiting_refund',
    statuses: ['WAITING_FOR_REFUND'],
    label: 'Waiting for Refund',
    icon: FileText,
  },
  {
    group: 'refunded',
    statuses: ['REFUNDED'],
    label: 'Refunded',
    icon: CheckCircle2,
  },
];

// Order status timeline steps
export const orderStatusSteps = [
  {
    group: 'initial',
    statuses: ['PENDING', 'PAYMENT_RECEIVED', 'WAITING_FILL_INFORMATION'],
    label: 'Initial Processing',
    icon: FileText,
  },
  {
    group: 'assignment',
    statuses: ['NEED_MANAGER_HANDLE', 'PENDING_ACCEPTANCE', 'REJECTED'],
    label: 'Assignment',
    icon: ClipboardList,
  },
  {
    group: 'production',
    statuses: ['IN_PRODUCTION', 'REWORK_IN_PROGRESS'],
    label: 'Production',
    icon: Package,
  },
  {
    group: 'quality',
    statuses: ['WAITING_FOR_CHECKING_QUALITY', 'REWORK_REQUIRED'],
    label: 'Quality Check',
    icon: CheckCircle2,
  },
  {
    group: 'delivery',
    statuses: ['WAITING_PAYMENT', 'READY_FOR_SHIPPING', 'SHIPPING', 'SHIPPED'],
    label: 'Payment & Shipping',
    icon: Truck,
  },
  {
    group: 'completion',
    statuses: ['COMPLETED', 'CANCELED'],
    label: 'Completion',
    icon: CheckCircle2,
  },
];
