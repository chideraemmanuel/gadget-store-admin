import axios from '@/config/axios';
import { useQuery } from 'react-query';

const getCurrentAdmin = async () => {
  const response = await axios.get('/auth/admin', { withCredentials: true });

  return response.data;
};

const useGetCurrentAdmin = () => {
  return useQuery('get current admin', getCurrentAdmin, {
    enabled: false,
    retry: false,
  });
};

export default useGetCurrentAdmin;
