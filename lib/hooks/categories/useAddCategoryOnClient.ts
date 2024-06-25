import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { CategoryFormDataTypes, CategoryTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const addCategory = async (category: CategoryFormDataTypes) => {
  console.log('category', category);

  const response = await axios.post<CategoryTypes>('/categories', category);

  console.log('response from add category hook', response);

  return response.data;
};

const useAddCategoryOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(addCategory, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get categories');

      toast({
        description: 'Category Added Successfully!',
      });

      router.replace('/dashboard/categories');
    },
    onError: (error: any) => {
      // console.log('error', error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to add category'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddCategoryOnClient;
