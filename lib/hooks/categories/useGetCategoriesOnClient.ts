import axios from '@/config/axios';
import { CategoryReturnTypes } from '@/types';
import { useQuery } from 'react-query';

const getCategories = async () => {
  const response = await axios.get<CategoryReturnTypes[]>('/categories', {
    withCredentials: true,
  });
  return response.data;
};

const useGetCategoriesOnClient = () => {
  return useQuery('get categories', getCategories, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get categories hook', error);
    },
  });
};

export default useGetCategoriesOnClient;
