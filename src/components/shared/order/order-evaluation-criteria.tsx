import { CalendarDays, Star } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

interface EvaluationCriteriaItem {
  id: string;
  createdAt: string;
  evaluationCriteria: {
    id: string;
    name: string;
    description?: string | null;
    updatedAt?: string | null;
  };
}

interface OrderEvaluationCriteriaProps {
  criteria: Partial<EvaluationCriteriaItem>[] | null;
  className?: string;
}

export function OrderEvaluationCriteria({
  criteria,
  className = '',
}: OrderEvaluationCriteriaProps) {
  if (!criteria || criteria.length === 0) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-500" />
          Evaluation Criteria ({criteria.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {criteria.map((item, index) => (
            <div
              key={item.id}
              className="rounded-lg border border-amber-100 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                    >
                      #{index + 1}
                    </Badge>
                    {item.evaluationCriteria && (
                      <h4 className="font-medium text-amber-800 dark:text-amber-200">
                        {item.evaluationCriteria.name}
                      </h4>
                    )}
                  </div>

                  {item.evaluationCriteria?.description && (
                    <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
                      {item.evaluationCriteria.description}
                    </p>
                  )}

                  <div className="mt-2 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                    <CalendarDays className="h-3 w-3" />
                    {item.createdAt && (
                      <span>Added on {formatDate(item.createdAt)}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/50">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Note:</strong> These evaluation criteria were selected by
            the customer to help assess the quality and requirements for this
            order.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
