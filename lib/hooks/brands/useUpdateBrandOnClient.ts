import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BrandTypes, BrandUpdateTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const updateBrand = async ({
  brandId,
  updates,
}: {
  brandId: string;
  updates: BrandUpdateTypes;
}) => {
  console.log('brand id from update brand hook', brandId);
  console.log('updates from update brand hook', updates);

  const response = await axios.put<BrandTypes>(`/brands/${brandId}`, updates);

  console.log('response from update brand hook', response);

  return response.data;
};

const useUpdateBrandOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(updateBrand, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get brands');

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
          'Failed to update brand'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useUpdateBrandOnClient;
