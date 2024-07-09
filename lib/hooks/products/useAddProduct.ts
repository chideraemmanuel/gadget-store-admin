import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { ProductFormDataTypes, ProductTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const addProduct = async (data: ProductFormDataTypes) => {
  const product = { ...data, product_image: data.product_image[0] };

  console.log('product', product);

  const response = await axios.post<ProductTypes>('/products', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddProduct = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(addProduct, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get products');

      toast({
        description: 'Product Added Successfully!',
      });

      router.replace('/dashboard/products');
    },
    onError: (error: any) => {
      // console.log('error', error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to add product'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddProduct;
