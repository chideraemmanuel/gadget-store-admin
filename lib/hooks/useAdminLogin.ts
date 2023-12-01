import axios from '@/config/axios';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { useToast } from '@/components/ui/use-toast';

// const loginAdmin = async ({ queryKey }: { queryKey: any }) => {
//   console.log(queryKey);
//   const credentials = queryKey[0];
//   console.log('credentials', credentials);
//   const response = await axios.post('/admin/login', credentials);

//   return response.data;
// };

// const useAdminLogin = (credentials: { email: string; password: string }) => {
//   return useQuery(['login admin', credentials], loginAdmin, { enabled: false});
// };

// export default useAdminLogin;

const loginAdmin = async (credentials: { email: string; password: string }) => {
  // console.log('credentials', credentials);
  const response = await axios.post('/auth/admin/login', credentials, {
    withCredentials: true,
  });

  return response.data;
};

const useAdminLogin = () => {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation(loginAdmin, {
    onSuccess: (data) => {
      console.log(data);

      toast({
        description: 'Login Successful!',
      });
      router.replace('/admin/dashboard');
    },
    onError: (error: any) => {
      // console.log('error', error);

      toast({
        description: `${error?.response?.data?.error}`,
        variant: 'destructive',
      });
    },
  });
};

export default useAdminLogin;
