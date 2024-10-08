import axios from '@/config/axios';
import { BillboardTypes } from '@/types';
import { useQuery } from 'react-query';

const getBillboard = async ({ queryKey }: { queryKey: any[] }) => {
  const billboardId = queryKey[1];

  console.log('billboards id from get billboards hook', billboardId);

  const response = await axios.get<BillboardTypes>(
    `/billboards/${billboardId}`
  );

  console.log('response from get billboards hook', response);

  return response.data;
};

const useGetBillboardById = (billboardId: string) => {
  return useQuery(['get billboard', billboardId], getBillboard, {
    retry: false,
    // retry: 3,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // onError: (error: any) => {
    //   console.log('error from get billboard hook', error);
    // },
  });
};

export default useGetBillboardById;
