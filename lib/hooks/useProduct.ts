import axios from '@/config/axios';
import { useMutation, useQuery } from 'react-query';

interface FormData {
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  product_image: File;
  count_in_stock: number;
  featured: boolean;
}

const addProduct = async (product: FormData) => {
  console.log('product', product);

  const response = await axios.post('/products', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useAddProduct = () => {
  return useMutation(addProduct, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export interface ProductsReturnTypes {
  _id: string;
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  product_image: string;
  count_in_stock: number;
  featured: boolean;
}

const getProducts = async ({ queryKey }: { queryKey: any[] }) => {
  const filters = queryKey[1];
  console.log('query key', queryKey);
  console.log('filters', filters);

  const response = await axios.get<ProductsReturnTypes[]>('/products', {
    params: filters,
  });

  console.log('response', response.data);

  return response.data;
};

interface FiltersTypes {
  product_name: string;
  brand: string;
}

export const useGetProducts = (filters?: FiltersTypes) => {
  return useQuery({
    queryKey: ['get products', filters],
    queryFn: getProducts,
    retry: false,
    // retry: 3,
  });
};
