import axios from '@/config/axios';
import { setAdmin } from '@/redux/slices/authSlice';
import { AdminInfoTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

const getCurrentAdmin = async () => {
  const response = await axios.get<AdminInfoTypes>('/auth/admin', {
    withCredentials: true,
  });

  return response.data;
};

const useGetCurrentAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useQuery('get current admin', getCurrentAdmin, {
    // enabled: false,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      // dispatch(setAdmin(data));
    },
    onError: (error: any) => {
      // if (error?.response?.data?.error) {
      //   router.replace('/auth/login');
      // }
    },
  });
};

export default useGetCurrentAdmin;
