'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MyNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMyNotificationsQuery,
} from '@/graphql/generated/graphql';
import { NOTIFICATION_EVENT } from '@/hooks/io';
import { cn } from '@/lib/utils';
import { useSocketStore } from '@/stores/socket-io-store';
import { formatDistanceToNow } from 'date-fns';
import { Bell, CheckCheckIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function NotificationButton() {
  const { data, loading, refetch } = useMyNotificationsQuery();
  const { socket } = useSocketStore();
  const unreadCount = data?.myNotifications.filter(n => !n.isRead).length ?? 0;

  useEffect(() => {
    if (!socket) return;

    const handleNotification = () => {
      refetch();
    };

    socket.on(NOTIFICATION_EVENT, handleNotification);

    return () => {
      socket.off(NOTIFICATION_EVENT, handleNotification);
    };
  }, [socket, refetch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b px-2">
          <DropdownMenuLabel className="text-base font-semibold">
            Notifications
          </DropdownMenuLabel>
          {unreadCount > 0 && (
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
              {unreadCount} new
            </span>
          )}
        </div>
        <ScrollArea className="h-[400px] flex-1">
          {!data?.myNotifications?.length ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="text-muted-foreground/50 h-12 w-12" />
              <p className="text-muted-foreground mt-2 text-sm">
                No notifications yet
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {data?.myNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="rounded-none">
          <Button className="w-full rounded-none" variant={'outline'}>
            <CheckCheckIcon className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({
  notification,
}: {
  notification: MyNotificationsQuery['myNotifications'][number];
}) {
  const [markNotificationAsRead] = useMarkNotificationAsReadMutation({
    refetchQueries: ['MyNotifications'],
  });
  return (
    <DropdownMenuItem
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-none border-b px-4 py-3',
        !notification.isRead && 'bg-accent/50',
      )}
      onSelect={e => {
        e.preventDefault();
        markNotificationAsRead({
          variables: {
            markNotificationAsReadId: notification.id,
          },
        });
      }}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-2">
          <p className="line-clamp-1 flex-1 text-sm leading-none font-medium">
            {notification.title}
          </p>
          <span className="text-muted-foreground text-xs">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {notification.content}
        </p>
      </div>
    </DropdownMenuItem>
  );
}
