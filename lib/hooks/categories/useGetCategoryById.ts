import axios from '@/config/axios';
import { CategoryTypes } from '@/types';
import { useQuery } from 'react-query';

const getCategory = async ({ queryKey }: { queryKey: any[] }) => {
  const categoryId = queryKey[1];

  console.log('category id from get category hook', categoryId);

  const response = await axios.get<CategoryTypes>(`/categories/${categoryId}`);

  console.log('response from get category hook', response);

  return response.data;
};

const useGetCategoryById = (categoryId: string) => {
  return useQuery(['get category', categoryId], getCategory, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get category hook', error);
    },
  });
};

export default useGetCategoryById;
