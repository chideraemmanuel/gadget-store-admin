import axios from '@/config/axios';
import { ProductTypes } from '@/types';
import { useQuery } from 'react-query';

const getProduct = async ({ queryKey }: { queryKey: any[] }) => {
  const productId = queryKey[1];

  console.log('product id from get product hook', productId);

  const response = await axios.get<ProductTypes>(`/products/${productId}`);

  console.log('response from get product hook', response);

  return response.data;
};

const useGetProductById = (productId: string) => {
  return useQuery(['get product', productId], getProduct, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get product hook', error);
    },
  });
};

export default useGetProductById;
