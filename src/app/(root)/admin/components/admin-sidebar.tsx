'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AdminSidebarHeader } from '@/app/(root)/admin/components/admin-sidebar-header';
import { adminSidebarItems } from '@/app/(root)/admin/components/admin-sidebar-items';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAuthStore } from '@/stores/auth.store';

export function AdminSidebar() {
  const { user } = useAuthStore();
  const pathname = usePathname();
  const checkIsActive = (url: string) => {
    return url === pathname;
  };
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="h-16 justify-center border-b">
        <AdminSidebarHeader user={user!} />
      </SidebarHeader>
      <SidebarContent>
        {adminSidebarItems.map((item, index) => (
          <SidebarGroup key={index}>
            {item?.title && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {item?.items.map(item => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={checkIsActive(item.url)}
                    >
                      <Link href={item.url} className="line-clamp-1 truncate">
                        {item.icon && <item.icon className="size-4" />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
