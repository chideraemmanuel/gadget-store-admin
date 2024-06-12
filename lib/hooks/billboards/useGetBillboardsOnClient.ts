import axios from '@/config/axios';
import { BillboardReturnTypes } from '@/types';
import { useQuery } from 'react-query';

const getBillboards = async () => {
  const response = await axios.get<BillboardReturnTypes[]>('/billboards');

  console.log('response from get billboards hook', response);

  return response.data;
};

const useGetBillboardsOnClient = () => {
  return useQuery({
    queryKey: ['get billboards'],
    queryFn: getBillboards,
    retry: false,
  });
};

export default useGetBillboardsOnClient;
