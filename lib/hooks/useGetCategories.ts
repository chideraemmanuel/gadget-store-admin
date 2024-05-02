import { useQuery } from 'react-query';
import axios from '@/config/axios';

export interface CategoryReturnTypes {
  name: string;
  _id: string;
}

const getCategories = async () => {
  const response = await axios.get<CategoryReturnTypes[]>('/categories', {
    withCredentials: true,
  });
  return response.data;
};

const useGetCategories = () => {
  return useQuery('get categories', getCategories, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get categories hook', error);
    },
  });
};

export default useGetCategories;
