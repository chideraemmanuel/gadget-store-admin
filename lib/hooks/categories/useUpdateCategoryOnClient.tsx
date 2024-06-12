import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { CategoryReturnTypes, CategoryUpdateTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const updateCategory = async ({
  categoryId,
  updates,
}: {
  categoryId: string;
  updates: CategoryUpdateTypes;
}) => {
  console.log('category id from update category hook', categoryId);
  console.log('updates from update category hook', updates);

  const response = await axios.put<CategoryReturnTypes>(
    `/categories/${categoryId}`,
    updates
  );

  console.log('response from update category hook', response);

  return response.data;
};

const useUpdateCategoryOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateCategory, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/dashboard/products/update/[categoryId]', 'page');
      // TODO: make revalidatePath work

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
          'Something went wrong'
        }`,
        variant: 'destructive',
      });
    },
  });
};
export default useUpdateCategoryOnClient;
