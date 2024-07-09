import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const logoutAdmin = async () => {
  const response = await axios.get('/auth/admin/logout', {
    // withCredentials: true,
  });

  return response.data;
};

const useLogoutAdmin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationKey: ['logout admin'],
      mutationFn: logoutAdmin,
      onSuccess: () => {
        queryClient.invalidateQueries('get current admin');

        toast({
          description: 'Logout Successful',
        });

        router.replace('/auth/login');
      },
      onError: (error: any) => {
        console.log(error);

        toast({
          description: `${
            error?.response?.data?.error || error?.message || 'Logout Failed'
          }`,
          variant: 'destructive',
        });
      },
    }
    // { enabled: false }
  );
};

export default useLogoutAdmin;
