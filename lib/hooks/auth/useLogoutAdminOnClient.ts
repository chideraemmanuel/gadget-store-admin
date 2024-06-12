import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

const logoutAdmin = async () => {
  const response = await axios.get('/auth/admin/logout', {
    // withCredentials: true,
  });

  return response.data;
};

const useLogoutAdminOnClient = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useQuery(
    {
      queryKey: 'logout admin',
      queryFn: logoutAdmin,
      enabled: false,
      retry: false,
      onSuccess: (data) => {
        router.replace('/auth/login');

        toast({
          description: 'Logout Successful',
        });
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
