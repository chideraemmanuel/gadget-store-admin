import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { ProductFormDataTypes, ProductTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const addProduct = async (product: ProductFormDataTypes) => {
  console.log('product', product);

  const response = await axios.post<ProductTypes>('/products', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddProductOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addProduct, {
    onSuccess: (data) => {
      console.log(data);

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
          'Something went wrong'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddProductOnClient;
