import axios from '@/config/axios';
import { CategoryReturnTypes, CategoryTypes } from '@/types';
import { useQuery } from 'react-query';

const getCategories = async ({ queryKey }: { queryKey: any[] }) => {
  const paginate = queryKey[1];
  console.log('should paginate?:', paginate);

  const params = new URLSearchParams();
  params.set('paginated', paginate);

  const response = await axios.get<CategoryReturnTypes>(
    `/categories?${params}`
  );

  console.log('response from get categories hook', response);

  return response.data;
};

const useGetCategoriesOnClient = ({
  paginated = true,
}: {
  paginated?: boolean;
}) => {
  return useQuery(['get categories', paginated], getCategories, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get categories hook', error);
    },
  });
};

export default useGetCategoriesOnClient;
