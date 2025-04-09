export type ChangeType = 'positive' | 'negative';

export interface ChangeResult {
  change: string;
  type: ChangeType;
}

export function calculateChange(
  current: number,
  previous: number,
  options: {
    format?: 'percentage' | 'number';
    decimalPlaces?: number;
  } = {},
): ChangeResult {
  const { format = 'percentage', decimalPlaces = 1 } = options;

  // Handle edge cases
  if (previous === 0) {
    return {
      change: format === 'percentage' ? '0%' : '0',
      type: 'positive',
    };
  }

  const difference = current - previous;
  const percentage = (difference / previous) * 100;

  // Format the change value
  let formattedChange: string;
  if (format === 'percentage') {
    formattedChange = `${percentage > 0 ? '+' : ''}${percentage.toFixed(decimalPlaces)}%`;
  } else {
    formattedChange = `${difference > 0 ? '+' : ''}${difference.toFixed(decimalPlaces)}`;
  }

  return {
    change: formattedChange,
    type: percentage >= 0 ? 'positive' : 'negative',
  };
}
