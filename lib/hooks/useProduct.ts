import axios from '@/config/axios';
import { useMutation } from 'react-query';

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
