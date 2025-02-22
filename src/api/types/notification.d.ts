export interface Notification {
  title: string;
  content: string;
  url: string;
  isRead: boolean;
  type: string;
  userId: string | null;
  role: string | null;
  id: string;
  isDeleted: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  deletedAt: string | null;
  deletedBy: string | null;
}
