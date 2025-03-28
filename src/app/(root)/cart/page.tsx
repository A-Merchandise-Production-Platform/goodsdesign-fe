'use client';

import { useGetUserCartItemsQuery } from '@/graphql/generated/graphql';

export default function Page() {
  const { data: cartItemCount } = useGetUserCartItemsQuery();

  console.log(cartItemCount);

  return <div>CartPage</div>;
}
