import { User } from '@/types/user.types';
import { Avatar, Card, Text, Group, Badge } from '@mantine/core';
import { format } from 'date-fns';

interface UserItemProps {
  user: User;
}

const getRoleColor = (role: User['role']) => {
  switch (role) {
    case 'CUSTOMER':
      return 'blue';
    case 'FACTORYOWNER':
      return 'green';
    case 'STAFF':
      return 'orange';
    case 'MANAGER':
      return 'red';
    default:
      return 'gray';
  }
};

export function UserItem({ user }: UserItemProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group>
        <Avatar
          src={user.imageUrl || undefined}
          alt={user.name}
          radius="xl"
          size="lg"
        />
        <div style={{ flex: 1 }}>
          <Group position="apart" mb="xs">
            <Text weight={500}>{user.name}</Text>
            <Badge color={getRoleColor(user.role)}>{user.role}</Badge>
          </Group>
          <Group spacing="xs">
            {user.phoneNumber && (
              <Text size="sm" color="dimmed">
                📱 {user.phoneNumber}
              </Text>
            )}
            <Text size="sm" color="dimmed">
              🕒 Created: {format(new Date(user.createdAt), 'MMM d, yyyy')}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
}
