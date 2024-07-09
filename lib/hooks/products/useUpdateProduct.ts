import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { ProductTypes, ProductUpdateTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const updateProduct = async ({
  productId,
  updates,
}: {
  productId: string;
  updates: ProductUpdateTypes;
}) => {
  console.log('product id from update product hook', productId);
  console.log('updates from update product hook', updates);

  const response = await axios.put<ProductTypes>(
    `/products/${productId}`,
    updates
    // { withCredentials: true }
  );

  console.log('response from update product hook', response);

  return response.data;
};

const useUpdateProduct = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(updateProduct, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get products');

      toast({
        description: 'Product Updated Successfully!',
      });

      router.replace('/dashboard/products');
    },
    onError: (error: any) => {
      console.log(error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to update product'
        }`,
        variant: 'destructive',
      });
    },
  });
};
export default useUpdateProduct;
