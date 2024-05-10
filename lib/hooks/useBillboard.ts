import axios from '@/config/axios';
import { useQuery } from 'react-query';

export interface BillboardReturnTypes {
  _id: string;
  name: string;
  head_text: string;
  paragraph: string;
  billboard_image: string;
}

const getBillboards = async () => {
  const response = await axios.get<BillboardReturnTypes[]>('/billboards');

  console.log('response from get billboards hook', response);

  return response.data;
};

export const useGetBillboards = () => {
  return useQuery({
    queryKey: ['get billboards'],
    queryFn: getBillboards,
    retry: false,
  });
};
