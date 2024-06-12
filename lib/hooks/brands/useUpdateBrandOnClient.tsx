import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BrandReturnTypes, BrandUpdateTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const updateBrand = async ({
  brandId,
  updates,
}: {
  brandId: string;
  updates: BrandUpdateTypes;
}) => {
  console.log('brand id from update brand hook', brandId);
  console.log('updates from update brand hook', updates);

  const response = await axios.put<BrandReturnTypes>(
    `/brands/${brandId}`,
    updates
  );

  console.log('response from update brand hook', response);

  return response.data;
};

const useUpdateBrandOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateBrand, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/dashboard/products/update/[categoryId]', 'page');
      // TODO: make revalidatePath work

      toast({
        description: 'Brand Updated Successfully!',
      });

      router.replace('/dashboard/brands');
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

export default useUpdateBrandOnClient;
