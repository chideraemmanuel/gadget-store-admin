import axios from '@/config/axios';
import { BrandReturnTypes } from '@/types';
import { useQuery } from 'react-query';

const getBrands = async () => {
  const response = await axios.get<BrandReturnTypes[]>('/brands');

  console.log('response from get brands hook', response);

  return response.data;
};

const useGetBrandsOnClient = () => {
  // TODO: configure hook to take in filters
  return useQuery({
    queryKey: ['get brands'],
    queryFn: getBrands,
    retry: false,
  });
};

export default useGetBrandsOnClient;
