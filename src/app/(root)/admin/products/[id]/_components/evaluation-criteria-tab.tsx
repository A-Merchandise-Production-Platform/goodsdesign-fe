'use client';

import { useEvaluationCriteriaByProductQuery } from '@/graphql/generated/graphql';

import { EvaluationCriteriaTable } from './evaluation-criteria-table';

export default function EvaluationCriteriaTab({
  productId,
}: {
  productId: string;
}) {
  const { data, loading, refetch } = useEvaluationCriteriaByProductQuery({
    variables: {
      productId: productId,
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Evaluation Criteria</h3>
        <p className="text-muted-foreground text-sm">
          Manage evaluation criteria for this product. These criteria will be
          used when customers place orders.
        </p>
      </div>

      <EvaluationCriteriaTable
        data={data?.evaluationCriteriaByProduct || []}
        loading={loading}
        productId={productId}
        refetch={refetch}
      />
    </div>
  );
}
