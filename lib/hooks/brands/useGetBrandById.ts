import axios from '@/config/axios';
import { BrandTypes } from '@/types';
import { useQuery } from 'react-query';

const getBrand = async ({ queryKey }: { queryKey: any[] }) => {
  const brandId = queryKey[1];

  console.log('brand id from get brand hook', brandId);

  const response = await axios.get<BrandTypes>(`/brands/${brandId}`);

  console.log('response from get brand hook', response);

  return response.data;
};

const useGetBrandById = (brandId: string) => {
  return useQuery(['get brand', brandId], getBrand, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get brand hook', error);
    },
  });
};

export default useGetBrandById;
