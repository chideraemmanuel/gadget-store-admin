import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { BrandFormDataTypes } from '@/container/forms/brands/addBrandForm/AddBrandForm';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';

export interface BrandReturnTypes {
  _id: string;
  name: string;
  brand_logo: string;
}

const getBrands = async () => {
  const response = await axios.get<BrandReturnTypes[]>('/brands');

  console.log('response from get brands hook', response);

  return response.data;
};

export const useGetBrands = () => {
  // TODO: configure hook to take in filters
  return useQuery({
    queryKey: ['get brands'],
    queryFn: getBrands,
    retry: false,
  });
};

const getBrand = async ({ queryKey }: { queryKey: any[] }) => {
  const brandId = queryKey[1];

  console.log('brand id from get brand hook', brandId);

  const response = await axios.get<BrandReturnTypes>(`/brands/${brandId}`);

  console.log('response from get brand hook', response);

  return response.data;
};

export const useGetBrand = (brandId: string) => {
  return useQuery(['get brand', brandId], getBrand, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get brand hook', error);
    },
  });
};

const addBrand = async (brand: BrandFormDataTypes) => {
  console.log('brand', brand);

  const response = await axios.post<BrandReturnTypes>('/brands', brand, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useAddBrand = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addBrand, {
    onSuccess: (data) => {
      console.log(data);

      toast({
        description: 'Brand Added Successfully!',
      });

      router.replace('/admin/dashboard/brands');
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

export interface BrandUpdateTypes {
  name?: string;
  brand_logo?: string;
}

const updateBrand = async ({
  brandId,
  updates,
}: {
  brandId: string;
  updates: BrandUpdateTypes;
}) => {
  console.log('brand id from update brand hook', brandId);
  console.log('updates from update brand hook', updates);

  const response = await axios.put<BrandReturnTypes>(
    `/brands/${brandId}`,
    updates
  );

  console.log('response from update brand hook', response);

  return response.data;
};

export const useUpdateBrand = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateBrand, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/admin/dashboard/products/update/[categoryId]', 'page');
      // TODO: make revalidatePath work

      toast({
        description: 'Brand Updated Successfully!',
      });

      router.replace('/admin/dashboard/brands');
    },
    onError: (error: any) => {
      console.log(error);

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

const deleteBrand = async (brandId: string) => {
  const response = await axios.delete(`/brands/${brandId}`, {
    // withCredentials: true,
  });

  console.log('response from delete brand hook', response);

  return response.data;
};

export const useDeleteBrand = () => {
  const { toast } = useToast();

  return useMutation(deleteBrand, {
    onSuccess: (data) => {
      toast({
        description: 'Brand Deleted Successfully!',
      });
    },
    onError: (error: any) => {
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
