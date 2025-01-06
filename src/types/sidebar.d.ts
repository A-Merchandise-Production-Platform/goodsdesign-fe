import { UrlObject } from 'node:url';

import { Route } from 'next';
import { ReactNode } from 'react';

export interface SidebarItem {
  title?: string;
  items: SidebarSubItem[];
}

export interface SidebarSubItem {
  title: string;
  url: Route;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}
