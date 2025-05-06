import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn, formatPrice } from '@/lib/utils';

export enum StatCardType {
  DEFAULT = 'default',
  CURRENCY = 'currency',
}

export interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
  type?: StatCardType;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  type = StatCardType.DEFAULT,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">
              {type === StatCardType.CURRENCY
                ? formatPrice(value)
                : isNaN(value) ? '0' : value.toLocaleString()}
            </h3>
          </div>
          <div className="bg-primary/10 rounded-full p-2">{icon}</div>
        </div>
        {change ? (
          <div className="mt-4 flex items-end">
            <span
              className={cn(
                'inline-flex items-center text-xs font-medium',
                changeType === 'positive' ? 'text-green-600' : 'text-red-600',
              )}
            >
              {changeType === 'positive' ? (
                <ArrowUpIcon className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 h-3 w-3" />
              )}
              {change}
            </span>
            <span className="text-muted-foreground ml-1 text-xs">
              vs. last month
            </span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
