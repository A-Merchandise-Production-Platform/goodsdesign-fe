import { Roles } from '@/graphql/generated/graphql';

export const getRoleColor = (role: Roles) => {
  switch (role) {
    case Roles.Admin:
      return 'hsl(var(--primary))';
    case Roles.Manager:
      return 'hsl(var(--info))';
    case Roles.Staff:
      return 'hsl(var(--warning))';
    case Roles.Factoryowner:
      return 'hsl(var(--success))';
    case Roles.Customer:
      return 'hsl(var(--tertiary))';
    default:
      return 'hsl(var(--muted))';
  }
};

export const getRoleLabel = (role: Roles) => {
  switch (role) {
    case Roles.Admin:
      return 'Admin';
    case Roles.Manager:
      return 'Manager';
    case Roles.Staff:
      return 'Staff';
    case Roles.Factoryowner:
      return 'Factory Owner';
    case Roles.Customer:
      return 'Customer';
    default:
      return role;
  }
};
