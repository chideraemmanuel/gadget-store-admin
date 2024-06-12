import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { ProductUpdateTypes, ProductsReturnTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const updateProduct = async ({
  productId,
  updates,
}: {
  productId: string;
  updates: ProductUpdateTypes;
}) => {
  console.log('product id from update product hook', productId);
  console.log('updates from update product hook', updates);

  const response = await axios.put<ProductsReturnTypes>(
    `/products/${productId}`,
    updates
    // { withCredentials: true }
  );

  console.log('response from update product hook', response);

  return response.data;
};

const useUpdateProductOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateProduct, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/dashboard/products/update/[productId]', 'page');
      // TODO: make revalidatePath work

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
          'Something went wrong'
        }`,
        variant: 'destructive',
      });
    },
  });
};
export default useUpdateProductOnClient;
