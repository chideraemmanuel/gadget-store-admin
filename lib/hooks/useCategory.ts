import { useMutation, useQuery } from 'react-query';
import axios from '@/config/axios';
import { CategoryFormDataTypes } from '@/container/addCategoryForm/AddCategoryForm';

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

const addCategory = async (category: CategoryFormDataTypes) => {
  console.log('category', category);

  const response = await axios.post<CategoryReturnTypes>(
    '/categories',
    category
  );

  console.log('response from add category hook', response);

  return response.data;
};

export const useAddCategory = () => {
  return useMutation(addCategory, {
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};
