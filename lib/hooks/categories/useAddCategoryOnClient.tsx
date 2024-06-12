import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { CategoryFormDataTypes, CategoryReturnTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const addCategory = async (category: CategoryFormDataTypes) => {
  console.log('category', category);

  const response = await axios.post<CategoryReturnTypes>(
    '/categories',
    category
  );

  console.log('response from add category hook', response);

  return response.data;
};

const useAddCategoryOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addCategory, {
    onSuccess: (data) => {
      console.log(data);

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
          'Something went wrong'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddCategoryOnClient;
