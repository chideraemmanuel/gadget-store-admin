import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BillboardFormDataTypes, BillboardTypes } from '@/types';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const addBillboard = async (data: BillboardFormDataTypes) => {
  const billboard = { ...data, billboard_image: data.billboard_image[0] };

  console.log('billboard', billboard);

  const response = await axios.post<BillboardTypes>('/billboards', billboard, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddBillboard = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(addBillboard, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get billboards');

      toast({
        description: 'Billboard Added Successfully!',
      });

      router.replace('/dashboard/billboards');
    },
    onError: (error: any) => {
      // console.log('error', error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to add billboard'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddBillboard;
