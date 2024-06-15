import axios from '@/config/axios';
import createSearchParams from '@/lib/createSearchParam';
import { CategoryReturnTypes, CategoryTypes, SearchParams } from '@/types';
import { useQuery } from 'react-query';

const getCategories = async ({ queryKey }: { queryKey: any[] }) => {
  const searchParamsObject = queryKey[1];
  const paginated = queryKey[2];

  console.log('should paginate?:', paginated);
  console.log('searchParamsObject', searchParamsObject);

  const params = createSearchParams(searchParamsObject);

  params.set('paginated', paginated);

  const response = await axios.get<CategoryReturnTypes>(
    `/categories?${params}`
  );

  console.log('response from get categories hook', response);

  return response.data;
};

interface Params {
  searchParamsObject?: SearchParams;
  paginated?: boolean;
}

const useGetCategoriesOnClient = ({
  searchParamsObject = {},
  paginated = true,
}: Params) => {
  return useQuery(
    ['get categories', searchParamsObject, paginated],
    getCategories,
    {
      retry: false,
      onError: (error: any) => {
        console.log('error from get categories hook', error);
      },
    }
  );
};

export default useGetCategoriesOnClient;
