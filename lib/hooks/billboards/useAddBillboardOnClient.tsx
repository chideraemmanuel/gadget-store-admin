import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BillboardFormDataTypes, BillboardTypes } from '@/types';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const addBillboard = async (billboard: BillboardFormDataTypes) => {
  console.log('billboard', billboard);

  const response = await axios.post<BillboardTypes>('/billboards', billboard, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddBillboardOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addBillboard, {
    onSuccess: (data) => {
      console.log(data);

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
          'Something went wrong'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddBillboardOnClient;
