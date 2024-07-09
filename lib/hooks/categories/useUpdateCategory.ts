import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import {
  CategoryReturnTypes,
  CategoryTypes,
  CategoryUpdateTypes,
} from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const updateCategory = async ({
  categoryId,
  updates,
}: {
  categoryId: string;
  updates: CategoryUpdateTypes;
}) => {
  console.log('category id from update category hook', categoryId);
  console.log('updates from update category hook', updates);

  const response = await axios.put<CategoryTypes>(
    `/categories/${categoryId}`,
    updates
  );

  console.log('response from update category hook', response);

  return response.data;
};

const useUpdateCategory = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(updateCategory, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get categories');

      toast({
        description: 'Category Updated Successfully!',
      });

      router.replace('/dashboard/categories');
    },
    onError: (error: any) => {
      console.log(error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to update category'
        }`,
        variant: 'destructive',
      });
    },
  });
};
export default useUpdateCategory;
