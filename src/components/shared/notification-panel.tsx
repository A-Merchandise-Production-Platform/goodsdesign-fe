'use client';

import * as signalR from '@microsoft/signalr';
import { formatDistanceToNow, subHours } from 'date-fns';
import { BellIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Notification } from '@/api/types';
import { UserApi } from '@/api/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const [unreadNumber, setUnreadNumber] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const options = {
      filter: { isDeleted: false },
      select: ['id', 'title', 'content', 'isRead', 'createdAt', 'createdBy'],
    };
    const response = await UserApi.getNotifications(options);
    if (response.value) {
      setNotifications(response.value);
    } else {
      toast.error('Failed to fetch notifications');
    }
    setLoading(false);
  };

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('ws://api.goodsdesign.uydev.id.vn/notificationHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connection
      .start()
      .then(() => console.log('Connection started'))
      .catch(error => console.log('Error connecting to SignalR', error));

    connection.on('ReceiveMessage', () => {
      fetchNotifications();
    });

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    setUnreadNumber(unreadCount);
  }, [notifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative ml-auto rounded-full"
        >
          <BellIcon className="h-5 w-5" />
          <span className="text-background absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 select-none">
            {unreadNumber}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b px-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">
                  Unread ({unreadNumber})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[400px]">
                <NotificationList
                  notifications={notifications}
                  loading={loading}
                />
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" className="mt-0">
              <ScrollArea className="h-[400px]">
                <NotificationList
                  notifications={notifications.filter(n => !n.isRead)}
                  loading={loading}
                />
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className="flex items-center justify-between border-t p-4">
            <Button variant="ghost" size="sm">
              Go To Settings
            </Button>
            <Button variant="ghost" size="sm">
              Mark All As Read
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationList({
  notifications,
  loading,
}: {
  notifications: Notification[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p>Loading notifications...</p>
      </div>
    );
  }

  // Group notifications by date
  const groupedNotifications = notifications.reduce(
    (accumulator, notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString(); // Format date (MM/DD/YYYY)
      if (!accumulator[date]) {
        accumulator[date] = [];
      }
      accumulator[date].push(notification);
      return accumulator;
    },
    {} as Record<string, Notification[]>,
  );

  return (
    <div className="space-y-4 p-4">
      {Object.entries(groupedNotifications).map(([date, items]) => (
        <div key={date} className="space-y-2">
          <h3 className="text-muted-foreground text-sm font-medium">
            {date === new Date().toLocaleDateString() ? 'Today' : date}
          </h3>
          {items.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const adjustedTime = notification.createdAt
    ? subHours(new Date(notification.createdAt), 0)
    : undefined;
  const timeAgo = adjustedTime
    ? formatDistanceToNow(adjustedTime, { addSuffix: true })
    : 'Unknown time';

  return (
    <div className="flex items-center gap-2 rounded-lg border p-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{notification.createdBy ?? 'Unknown'}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-semibold">{notification.title ?? 'No Title'}</div>
        <div className="line-clamp-2">
          {notification.content ?? 'No Content'}
        </div>
        <div className="text-xs">{timeAgo}</div>
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant="secondary">
            Review
          </Button>
          <Button size="sm" variant="ghost">
            Mark As Read
          </Button>
        </div>
      </div>
    </div>
  );
}
