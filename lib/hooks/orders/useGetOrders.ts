import axios from '@/config/axios';
import createSearchParams from '@/lib/createSearchParam';
import { OrderReturnTypes, SearchParams } from '@/types';
import { useQuery } from 'react-query';

const getOrders = async ({ queryKey }: { queryKey: any[] }) => {
  const searchParamsObject = queryKey[1];

  console.log('query key', queryKey);
  console.log('searchParamsObject', searchParamsObject);

  const params = createSearchParams(searchParamsObject);

  console.log('params', params);

  const response = await axios.get<OrderReturnTypes>(`/orders?${params}`);

  console.log('response data', response.data);

  return response.data;
};

const useGetOrders = (searchParamsObject: SearchParams = {}) => {
  return useQuery({
    queryKey: ['get orders', searchParamsObject],
    queryFn: getOrders,
    retry: false,
    // retry: 3,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetOrders;
