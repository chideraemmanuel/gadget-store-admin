import { useQuery } from 'react-query';
import axios from '@/config/axios';

export interface CategoryReturnTypes {
  _id: string;
  name: string;
  billboard: {
    _id: string;
    name: string;
    head_text: string;
    paragraph?: string;
    billboard_image: string;
  };
}

const getCategories = async () => {
  const response = await axios.get<CategoryReturnTypes[]>('/categories', {
    withCredentials: true,
  });
  return response.data;
};

export const useGetCategories = () => {
  return useQuery('get categories', getCategories, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get categories hook', error);
    },
  });
};
