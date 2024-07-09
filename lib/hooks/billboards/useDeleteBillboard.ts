import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { revalidatePath } from 'next/cache';
import { useMutation } from 'react-query';

const deleteBillboard = async (billboardId: string) => {
  const response = await axios.delete(`/billboards/${billboardId}`, {
    // withCredentials: true,
  });

  console.log('response from delete billboard hook', response);

  return response.data;
};

const useDeleteBillboard = () => {
  const { toast } = useToast();

  return useMutation(deleteBillboard, {
    onSuccess: (data) => {
      toast({
        description: 'Billboard Deleted Successfully!',
      });
    },
    onError: (error: any) => {
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

export default useDeleteBillboard;
