type Role = {
  label: string;
  value: string;
};

export const ROLES: Role[] = [
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Staff', value: 'staff' },
  { label: 'Factory Owner', value: 'factoryOwner' },
  { label: 'Customer', value: 'customer' },
];
