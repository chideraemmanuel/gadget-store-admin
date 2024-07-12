import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { OrderStatus } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

interface Params {
  orderId: string;
  status: OrderStatus;
}
// const updateOrderStatus = (status: 'pending' | 'shipped' | 'delivered')
const updateOrderStatus = async ({ orderId, status }: Params) => {
  const response = await axios.put(`/orders/${orderId}`, { status });

  console.log('response from update order status', response);

  return response.data;
};

const useUpdateOrderStatus = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update order status'],
    mutationFn: updateOrderStatus,
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get orders');

      toast({
        description: 'Order Updated Successfully!',
      });

      router.replace('/dashboard/orders');
    },
    onError: (error: any) => {
      console.log(error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to update order'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useUpdateOrderStatus;
