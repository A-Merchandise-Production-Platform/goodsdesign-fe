import { Badge } from '@/components/ui/badge';
import { Roles } from '@/graphql/generated';
import { cn } from '@/lib/utils';

const roleVariants: Record<
  Roles,
  {
    variant: 'default' | 'info' | 'success' | 'warning' | 'tertiary';
    label: string;
  }
> = {
  [Roles.Admin]: { variant: 'default', label: 'Admin' },
  [Roles.Manager]: { variant: 'info', label: 'Manager' },
  [Roles.Staff]: { variant: 'warning', label: 'Staff' },
  [Roles.Factoryowner]: { variant: 'success', label: 'Factory Owner' },
  [Roles.Customer]: { variant: 'tertiary', label: 'Customer' },
};

interface RoleBadgeProps {
  role: Roles;
  outline?: boolean;
  className?: string;
}

export function RoleBadge({
  role,
  outline = false,
  className,
}: RoleBadgeProps) {
  const variant = roleVariants[role];
  const variantType = outline
    ? (`outline-${variant.variant}` as
        | 'outline-info'
        | 'outline-success'
        | 'outline-warning'
        | 'outline-tertiary')
    : variant.variant;

  return (
    <Badge variant={variantType} className={cn('capitalize', className)}>
      {variant.label}
    </Badge>
  );
}
