'use client';

import * as signalR from '@microsoft/signalr';
import { formatDistanceToNow, subHours } from 'date-fns';
import { BellIcon, CheckCheckIcon, Settings2Icon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { Notification } from '@/api/types';
import { UserApi } from '@/api/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const isMountedRef = useRef<boolean>(false);

  useEffect(() => {
    isMountedRef.current = true;
    fetchNotifications();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    const options = {
      filter: { isDeleted: false },
      select: ['id', 'title', 'content', 'isRead', 'createdAt', 'createdBy'],
    };
    try {
      const response = await UserApi.getNotifications(options);
      if (response.value && isMountedRef.current) {
        setNotifications(response.value);
      } else if (isMountedRef.current) {
        toast.error('Failed to fetch notifications');
      }
    } catch {
      if (isMountedRef.current) {
        toast.error('Failed to fetch notifications');
      }
    }
    if (isMountedRef.current) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl('ws://api.goodsdesign.uydev.id.vn/notificationHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        console.log('Connection started');
        if (isMountedRef.current) {
          connection.on('ReceiveMessage', () => {
            fetchNotifications();
          });
        }
      })
      .catch(error => {
        console.error('Error connecting to SignalR:', error);
        if (isMountedRef.current) {
          toast.error('Failed to connect to notification service');
        }
      });

    return () => {
      if (connectionRef.current) {
        if (
          connectionRef.current.state === signalR.HubConnectionState.Connected
        ) {
          connectionRef.current
            .stop()
            .then(() => {
              console.log('Connection stopped');
            })
            .catch(error => {
              console.error('Error stopping connection:', error);
            });
        }
        connectionRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const unreadCount = notifications.filter(n => !n.isRead).length;
    setUnreadNumber(unreadCount);
  }, [notifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <Badge
            variant="destructive"
            className="absolute -top-3 -right-3 rounded-full px-2 py-1 text-xs"
          >
            {unreadNumber > 99 ? '99+' : unreadNumber}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 border" align={'end'}>
        <div className="w-full max-w-sm">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 p-1">
            <BellIcon className="size-4" />
            <h2>Notifications</h2>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 border">
              <TabsTrigger className="cursor-pointer" value="all">
                All
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="unread">
                Unread ({unreadNumber})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[400px]" type={'hover'}>
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
          <div className="mt-1 flex items-center justify-between px-2 py-2">
            <Button variant="outline" size="sm">
              <Settings2Icon className="h-4 w-4" />
              Go To Settings
            </Button>
            <Button variant="outline" size="sm">
              <CheckCheckIcon className="h-4 w-4" />
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

  const groupedNotifications = notifications.reduce(
    (accumulator, notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString();
      if (!accumulator[date]) {
        accumulator[date] = [];
      }
      accumulator[date].push(notification);
      return accumulator;
    },
    {} as Record<string, Notification[]>,
  );

  return (
    <div className="space-y-4">
      {Object.entries(groupedNotifications).map(([date, items]) => (
        <div key={date} className="space-y-2">
          <h3 className="text-muted-foreground px-2 text-sm font-medium">
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
    <div className="hover:bg-muted bg-background flex cursor-pointer items-start gap-4 rounded-lg border px-4 py-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{notification.createdBy ?? 'Unknown'}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-semibold">{notification.title ?? 'No Title'}</div>
        <div className="line-clamp-2">
          {notification.content ?? 'No Content'}
        </div>
        <div className="text-muted-foreground mt-2 text-xs">{timeAgo}</div>
        {/* <div className="mt-2 flex gap-2">
          <Button size="sm" variant="secondary">
            Review
          </Button>
          <Button size="sm" variant="ghost">
            Mark As Read
          </Button>
        </div> */}
      </div>
    </div>
  );
}
