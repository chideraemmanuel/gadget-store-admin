import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useMutation } from 'react-query';

const deleteCategory = async (categoryId: string) => {
  const response = await axios.delete(`/categories/${categoryId}`, {
    // withCredentials: true,
  });

  console.log('response from delete product hook', response);

  return response.data;
};

const useDeleteCategory = () => {
  const { toast } = useToast();

  return useMutation(deleteCategory, {
    onSuccess: (data) => {
      toast({
        description: 'Category Deleted Successfully!',
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

export default useDeleteCategory;
