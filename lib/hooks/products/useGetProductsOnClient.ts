import axios from '@/config/axios';
import { ProductsReturnTypes } from '@/types';
import { useQuery } from 'react-query';

const getProducts = async ({ queryKey }: { queryKey: any[] }) => {
  const filters = queryKey[1];
  console.log('query key', queryKey);
  console.log('filters', filters);

  const response = await axios.get<ProductsReturnTypes>('/products', {
    params: filters,
  });

  console.log('response', response.data);

  return response.data;
};

interface FiltersTypes {
  product_name: string;
  brand: string;
}

const useGetProductsOnClient = (filters?: FiltersTypes) => {
  return useQuery({
    queryKey: ['get products', filters],
    queryFn: getProducts,
    retry: false,
    // retry: 3,
  });
};

export default useGetProductsOnClient;
