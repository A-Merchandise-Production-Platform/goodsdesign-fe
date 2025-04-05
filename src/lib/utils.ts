import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}

export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function getContrastColor(backgroundColor: string): string {
  // Remove the hash if it exists
  const color = backgroundColor.replace('#', '');

  // Convert hex to RGB
  const r = Number.parseInt(color.substring(0, 2), 16);
  const g = Number.parseInt(color.substring(2, 4), 16);
  const b = Number.parseInt(color.substring(4, 6), 16);

  // Calculate perceived brightness using the formula:
  // (R * 0.299 + G * 0.587 + B * 0.114)
  // This formula is based on human perception of color
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  // Use black text on light backgrounds, white text on dark backgrounds
  // 128 is the middle value (out of 255)
  return brightness > 128 ? '#000000' : '#ffffff';
}
