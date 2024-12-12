import { ReactNode } from 'react';

export interface SidebarItem {
  title?: string;
  items: SidebarSubItem[];
}

export interface SidebarSubItem {
  title: string;
  url: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}
