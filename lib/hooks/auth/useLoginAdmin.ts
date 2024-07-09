import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const loginAdmin = async (credentials: { email: string; password: string }) => {
  // console.log('credentials', credentials);
  const response = await axios.post('/auth/admin/login', credentials, {
    withCredentials: true,
  });

  return response.data;
};

const useLoginAdmin = () => {
  const router = useRouter();
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

export default useLoginAdmin;
