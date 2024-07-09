import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BrandFormDataTypes, BrandTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';

const addBrand = async (data: BrandFormDataTypes) => {
  const brand = { ...data, brand_logo: data.brand_logo[0] };

  console.log('brand', brand);

  const response = await axios.post<BrandTypes>('/brands', brand, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddBrand = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(addBrand, {
    onSuccess: (data) => {
      console.log(data);

      queryClient.invalidateQueries('get brands');

      toast({
        description: 'Brand Added Successfully!',
      });

      router.replace('/dashboard/brands');
    },
    onError: (error: any) => {
      // console.log('error', error);

      toast({
        description: `${
          error?.response?.data?.error ||
          error?.message ||
          'Failed to add brand'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddBrand;
