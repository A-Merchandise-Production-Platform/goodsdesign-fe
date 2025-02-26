'use client';

import { useState } from 'react';

import { ShippingApi } from '@/api/shipping';
import {
  AddressSelector,
  AddressValue,
} from '@/components/shared/address/address-input';

export default function Page() {
  const [address, setAddress] = useState<AddressValue | undefined>({
    provinceId: 211,
    districtId: 3276,
    wardId: 490_401,
    street: '66, le huu nghia, khu pho 1',
  });

  console.log(address);

  const handleClick = () => {
    ShippingApi.getAllDistricts(211).then(data => {
      console.log(data);
    });
  };

  return (
    <div className="container mx-auto w-1/2 pt-10">
      <AddressSelector onChange={setAddress} value={address} />
    </div>
  );
}
