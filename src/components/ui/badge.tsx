import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-red-200 text-red-800 shadow-sm hover:bg-red-300',
        outline: 'text-foreground',
        success:
          'border-transparent bg-green-200 text-green-800 hover:bg-green-300',
        admin:
          'border-transparent bg-purple-200 text-purple-800 hover:bg-purple-300',
        manager:
          'border-transparent bg-blue-200 text-blue-800 hover:bg-blue-300',
        staff:
          'border-transparent bg-yellow-200 text-yellow-800 hover:bg-yellow-300',
        factoryOwner:
          'border-transparent bg-orange-200 text-orange-800 hover:bg-orange-300',
        customer:
          'border-transparent bg-pink-200 text-pink-800 hover:bg-pink-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'admin'
  | 'manager'
  | 'staff'
  | 'factoryOwner'
  | 'customer'
  | null
  | undefined;

export { Badge, badgeVariants };
