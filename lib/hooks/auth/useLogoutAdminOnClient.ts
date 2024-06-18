import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from 'react-query';

const logoutAdmin = async () => {
  const response = await axios.get('/auth/admin/logout', {
    // withCredentials: true,
  });

  return response.data;
};

const useLogoutAdminOnClient = () => {
  const router = useRouter();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useQuery(
    {
      queryKey: 'logout admin',
      queryFn: logoutAdmin,
      enabled: false,
      retry: false,
      onSuccess: (data) => {
        queryClient.invalidateQueries('get current admin');

        toast({
          description: 'Logout Successful',
        });

        router.replace('/auth/login');
      },
      onError: (error: any) => {
        console.log(error);

        toast({
          description: 'Logout Failed',
          variant: 'destructive',
        });
      },
    }
    // { enabled: false }
  );
};

export default useLogoutAdminOnClient;
