'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { orderStatusSteps, refundStatusSteps } from './order-status';

interface OrderStatusTimelineProps {
  status: string;
  currentStatusGroup: string;
}

export function OrderStatusTimeline({
  status,
  currentStatusGroup,
}: OrderStatusTimelineProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
        <CardDescription>
          Current status and progress of the order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="bg-muted absolute top-0 left-0 h-1 w-full">
            <div
              className="bg-primary absolute top-0 left-0 h-full transition-all duration-500"
              style={{
                width: `${
                  (status === 'WAITING_FOR_REFUND' || status === 'REFUNDED'
                    ? (refundStatusSteps.findIndex(step =>
                        step.statuses.includes(status),
                      ) +
                        1) /
                      refundStatusSteps.length
                    : (orderStatusSteps.findIndex(
                        step => step.group === currentStatusGroup,
                      ) +
                        1) /
                      orderStatusSteps.length) * 100
                }%`,
              }}
            />
          </div>

          <div
            className={`grid grid-cols-2 gap-2 pt-6 md:grid-cols-2 ${
              status === 'WAITING_FOR_REFUND' || status === 'REFUNDED'
                ? 'lg:grid-cols-2'
                : 'lg:grid-cols-6'
            }`}
          >
            {(status === 'WAITING_FOR_REFUND' || status === 'REFUNDED'
              ? refundStatusSteps
              : orderStatusSteps
            ).map((step, index) => {
              const isActive =
                status === 'WAITING_FOR_REFUND' || status === 'REFUNDED'
                  ? step.statuses.includes(status)
                  : step.group === currentStatusGroup;
              const isPast =
                status === 'WAITING_FOR_REFUND' || status === 'REFUNDED'
                  ? refundStatusSteps.findIndex(s =>
                      s.statuses.includes(status),
                    ) > index
                  : orderStatusSteps.findIndex(
                      s => s.group === currentStatusGroup,
                    ) > index;
              const Icon = step.icon;

              return (
                <div key={step.group} className="flex flex-col items-center">
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : isPast
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-center text-xs ${isActive ? 'font-medium' : 'text-muted-foreground'}`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 