import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 transition-[color,box-shadow]',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow-sm [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow-sm [a&]:hover:bg-destructive/90',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
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

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
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
