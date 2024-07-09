import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const deleteBrand = async (brandId: string) => {
  const response = await axios.delete(`/brands/${brandId}`, {
    // withCredentials: true,
  });

  console.log('response from delete brand hook', response);

  return response.data;
};

const useDeleteBrand = () => {
  const { toast } = useToast();

  return useMutation(deleteBrand, {
    onSuccess: (data) => {
      toast({
        description: 'Brand Deleted Successfully!',
      });
    },
    onError: (error: any) => {
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

export default useDeleteBrand;
