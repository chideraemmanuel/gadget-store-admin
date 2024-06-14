import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BrandFormDataTypes, BrandTypes } from '@/types';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

const addBrand = async (brand: BrandFormDataTypes) => {
  console.log('brand', brand);

  const response = await axios.post<BrandTypes>('/brands', brand, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddBrandOnClient = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addBrand, {
    onSuccess: (data) => {
      console.log(data);

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
          'Something went wrong'
        }`,
        variant: 'destructive',
      });
    },
  });
};

export default useAddBrandOnClient;
