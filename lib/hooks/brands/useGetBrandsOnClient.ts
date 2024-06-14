import axios from '@/config/axios';
import { BrandReturnTypes } from '@/types';
import { useQuery } from 'react-query';

const getBrands = async ({ queryKey }: { queryKey: any[] }) => {
  const paginate = queryKey[1];
  console.log('should paginate?:', paginate);

  const params = new URLSearchParams();
  params.set('paginated', paginate);

  const response = await axios.get<BrandReturnTypes>(`/brands?${params}`);

  console.log('response from get brands hook', response);

  return response.data;
};

const useGetBrandsOnClient = ({
  paginated = true,
}: {
  paginated?: boolean;
}) => {
  // TODO: configure hook to take in filters
  return useQuery({
    queryKey: ['get brands', paginated],
    queryFn: getBrands,
    retry: false,
  });
};

export default useGetBrandsOnClient;
