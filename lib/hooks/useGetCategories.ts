import { useQuery } from 'react-query';
import axios from '@/config/axios';

interface Category {
  name: string;
  _id: string;
}

const getCategories = async () => {
  const response = await axios.get<Category[]>('/categories', {
    withCredentials: true,
  });
  return response.data;
};

const useGetCategories = () => {
  return useQuery('get categories', getCategories);
};

export default useGetCategories;
