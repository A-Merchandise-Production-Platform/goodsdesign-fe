import { useState } from 'react';

import { useFormatAddressLazyQuery } from '@/graphql/generated/graphql';

type AddressInput = {
  provinceID: string;
  districtID: string;
  wardCode: string;
  street: string;
};

export function useFormatAddress() {
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [isFormatting, setIsFormatting] = useState<boolean>(false);
  const [formatAddressQuery, { loading, data }] = useFormatAddressLazyQuery();

  const formatAddress = async (address: AddressInput) => {
    setIsFormatting(true);
    const result = await formatAddressQuery({
      variables: {
        formatAddressInput: {
          provinceID: Number(address.provinceID),
          districtID: Number(address.districtID),
          wardCode: address.wardCode,
          street: address.street,
        },
      },
    });
    setFormattedAddress(result.data?.formatAddress?.text || '');
    setIsFormatting(false);
  };
  return { formattedAddress, isFormatting, formatAddress, loading, data };
}
