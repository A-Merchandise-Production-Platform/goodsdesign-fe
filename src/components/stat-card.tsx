import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  icon: React.ReactNode;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">{value}</h3>
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
