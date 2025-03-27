'use client';

import ProfileUpdateForm from '@/app/(root)/profile/_component/profile-update-form';
import { useGetAllAddressesQuery } from '@/graphql/generated/graphql';

export default function Page() {
  const { data, loading } = useGetAllAddressesQuery();

  console.log(data);

  return (
    <div>
      <ProfileUpdateForm />
    </div>
  );
}
