import axios from '@/config/axios';
import { setAdmin } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const getCurrentAdmin = async () => {
  const response = await axios.get('/auth/admin', { withCredentials: true });

  return response.data;
};

const useGetCurrentAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useQuery('get current admin', getCurrentAdmin, {
    // enabled: false,
    retry: false,
    onSuccess: (data) => {
      dispatch(setAdmin(data));
    },
    onError: (error: any) => {
      router.replace('/auth/login');
    },
  });
};

export default useGetCurrentAdmin;
