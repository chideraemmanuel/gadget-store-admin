import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const deleteProduct = async (productId: string) => {
  const response = await axios.delete(`/products/${productId}`, {
    // withCredentials: true,
  });

  console.log('response from delete product hook', response);

  return response.data;
};

const useDeleteProduct = () => {
  const { toast } = useToast();

  return useMutation(deleteProduct, {
    onSuccess: (data) => {
      toast({
        description: 'Product Deleted Successfully!',
      });
    },
    onError: (error: any) => {
      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to delete product'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useDeleteProduct;
