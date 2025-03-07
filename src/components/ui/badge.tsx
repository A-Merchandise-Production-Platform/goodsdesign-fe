import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        success:
          'border-transparent bg-success text-success-foreground hover:bg-success/80',
        warning:
          'border-transparent bg-warning text-warning-foreground hover:bg-warning/80',
        info: 'border-transparent bg-info text-info-foreground hover:bg-info/80',
        tertiary:
          'border-transparent bg-tertiary text-tertiary-foreground hover:bg-tertiary/80',
        quaternary:
          'border-transparent bg-quaternary text-quaternary-foreground hover:bg-quaternary/80',
        'outline-success': 'border-success text-success hover:bg-success/10',
        'outline-warning': 'border-warning text-warning hover:bg-warning/10',
        'outline-info': 'border-info text-info hover:bg-info/10',
        'outline-tertiary':
          'border-tertiary text-tertiary hover:bg-tertiary/10',
        'outline-quaternary':
          'border-quaternary text-quaternary hover:bg-quaternary/10',
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

export { Badge, badgeVariants };
