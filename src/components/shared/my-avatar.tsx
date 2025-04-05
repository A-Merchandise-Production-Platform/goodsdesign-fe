import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface MyAvatarProps {
  imageUrl: string;
  name?: string;
}

export default function MyAvatar({ imageUrl, name }: MyAvatarProps) {
  return (
    <Avatar className="h-9 w-9 rounded-md">
      <AvatarImage src={imageUrl || ''} alt={name || ''} />
      <AvatarFallback>{name?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
