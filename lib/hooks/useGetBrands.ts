import axios from '@/config/axios';
import { useQuery } from 'react-query';

interface BrandsReturnTypes {
  _id: string;
  name: string;
  brand_logo: string;
}

const getBrands = async () => {
  const response = await axios.get<BrandsReturnTypes[]>('/brands');

  console.log('response from get brands hook', response);

  return response.data;
};

export const useGetBrands = () => {
  // TODO: configure hook to take in filters
  return useQuery({
    queryKey: ['get brands'],
    queryFn: getBrands,
  });
};
