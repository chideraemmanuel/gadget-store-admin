import { useMutation, useQuery } from 'react-query';
import axios from '@/config/axios';
import { CategoryFormDataTypes } from '@/container/addCategoryForm/AddCategoryForm';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export interface CategoryReturnTypes {
  _id: string;
  name: string;
  billboard: {
    _id: string;
    name: string;
    head_text: string;
    paragraph?: string;
    billboard_image: string;
  };
}

const getCategories = async () => {
  const response = await axios.get<CategoryReturnTypes[]>('/categories', {
    withCredentials: true,
  });
  return response.data;
};

export const useGetCategories = () => {
  return useQuery('get categories', getCategories, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get categories hook', error);
    },
  });
};

const getCategory = async ({ queryKey }: { queryKey: any[] }) => {
  const categoryId = queryKey[1];

  console.log('category id from get category hook', categoryId);

  const response = await axios.get<CategoryReturnTypes>(
    `/categories/${categoryId}`
  );

  console.log('response from get category hook', response);

  return response.data;
};

export const useGetCategory = (categoryId: string) => {
  return useQuery(['get category', categoryId], getCategory, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get category hook', error);
    },
  });
};

const addCategory = async (category: CategoryFormDataTypes) => {
  console.log('category', category);

  const response = await axios.post<CategoryReturnTypes>(
    '/categories',
    category
  );

  console.log('response from add category hook', response);

  return response.data;
};

export const useAddCategory = () => {
  return useMutation(addCategory, {
    onSuccess: (data) => {},
    onError: (error) => {},
  });
};

export interface CategoryUpdateTypes {
  name?: string;
  billboard?: string;
}

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

export const useUpdateCategory = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateCategory, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/admin/dashboard/products/update/[categoryId]', 'page');
      // TODO: make revalidatePath work

      toast({
        description: 'Category Updated Successfully!',
      });

      router.replace('/admin/dashboard/categories');
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
