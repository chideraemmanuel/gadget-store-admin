import axios from '@/config/axios';
import createSearchParams from '@/lib/helpers/createSearchParam';
import { BrandReturnTypes, SearchParams } from '@/types';
import { useQuery } from 'react-query';

const getBrands = async ({ queryKey }: { queryKey: any[] }) => {
  const searchParamsObject = queryKey[1];
  const paginated = queryKey[2];

  console.log('should paginate?:', paginated);
  console.log('searchParamsObject', searchParamsObject);

  const params = createSearchParams(searchParamsObject);

  params.set('paginated', paginated);

  const response = await axios.get<BrandReturnTypes>(`/brands?${params}`);

  console.log('response from get brands hook', response);

  return response.data;
};

interface Params {
  searchParamsObject?: SearchParams;
  paginated?: boolean;
}

const useGetBrands = ({
  searchParamsObject = {},
  paginated = true,
}: Params) => {
  // TODO: configure hook to take in filters
  return useQuery({
    queryKey: ['get brands', searchParamsObject, paginated],
    queryFn: getBrands,
    retry: false,
    // retry: 3,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetBrands;
