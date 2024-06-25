import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BillboardTypes, BillboardUpdateTypes } from '@/types';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const updateBillboard = async ({
  billboardId,
  updates,
}: {
  billboardId: string;
  updates: BillboardUpdateTypes;
}) => {
  console.log('billboard id from update billboard hook', billboardId);
  console.log('updates from update billboard hook', updates);

  const response = await axios.put<BillboardTypes>(
    `/billboards/${billboardId}`,
    updates
  );

  console.log('response from update billboard hook', response);

  return response.data;
};

const useUpdateBillboardOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(updateBillboard, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get billboards');

      toast({
        description: 'Billboard Updated Successfully!',
      });

      router.replace('/dashboard/billboards');
    },
    onError: (error: any) => {
      console.log(error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to update billboard'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useUpdateBillboardOnClient;
