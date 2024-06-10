import axios from '@/config/axios';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast, useToast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { setAdmin } from '@/redux/slices/authSlice';

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

export const useAdminLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();

  return useMutation(loginAdmin, {
    onSuccess: (data) => {
      // console.log(data);

      toast({
        description: 'Login Successful!',
      });

      router.replace('/dashboard');
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

const logoutAdmin = async () => {
  const response = await axios.get('/auth/admin/logout', {
    withCredentials: true,
  });

  return response.data;
};

export const useAdminLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useQuery(
    {
      queryKey: 'logout admin',
      queryFn: logoutAdmin,
      enabled: false,
      retry: false,
      onSuccess: (data) => {
        // console.log(data);
        dispatch(setAdmin(null));
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
