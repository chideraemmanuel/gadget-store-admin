import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
// import { BillboardFormDataTypes } from '@/container/forms/billboards/addBillboardForm/AddBillboardForm';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';

export interface BillboardReturnTypes {
  _id: string;
  name: string;
  head_text: string;
  paragraph?: string;
  billboard_image: string;
}

const getBillboards = async () => {
  const response = await axios.get<BillboardReturnTypes[]>('/billboards');

  console.log('response from get billboards hook', response);

  return response.data;
};

export const useGetBillboards = () => {
  return useQuery({
    queryKey: ['get billboards'],
    queryFn: getBillboards,
    retry: false,
  });
};

const getBillboard = async ({ queryKey }: { queryKey: any[] }) => {
  const billboardId = queryKey[1];

  console.log('billboards id from get billboards hook', billboardId);

  const response = await axios.get<BillboardReturnTypes>(
    `/billboards/${billboardId}`
  );

  console.log('response from get billboards hook', response);

  return response.data;
};

export const useGetBillboard = (billboardId: string) => {
  return useQuery(['get billboard', billboardId], getBillboard, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get billboard hook', error);
    },
  });
};

interface BillboardFormDataTypes {
  name: string;
  head_text: string;
  paragraph?: string;
  billboard_image: File;
}

const addBillboard = async (billboard: BillboardFormDataTypes) => {
  console.log('billboard', billboard);

  const response = await axios.post<BillboardReturnTypes>(
    '/billboards',
    billboard,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const useAddBillboard = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addBillboard, {
    onSuccess: (data) => {
      console.log(data);

      toast({
        description: 'Billboard Added Successfully!',
      });

      router.replace('/dashboard/billboards');
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

export interface BillboardUpdateTypes {
  name?: string;
  head_text?: string;
  paragraph?: string;
}

const updateBillboard = async ({
  billboardId,
  updates,
}: {
  billboardId: string;
  updates: BillboardUpdateTypes;
}) => {
  console.log('billboard id from update billboard hook', billboardId);
  console.log('updates from update billboard hook', updates);

  const response = await axios.put<BillboardReturnTypes>(
    `/billboards/${billboardId}`,
    updates
  );

  console.log('response from update billboard hook', response);

  return response.data;
};

export const useUpdateBillboard = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateBillboard, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/dashboard/products/update/[categoryId]', 'page');
      // TODO: make revalidatePath work

      toast({
        description: 'Billboard Updated Successfully!',
      });

      router.replace('/dashboard/billboards');
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

const deleteBillboard = async (billboardId: string) => {
  const response = await axios.delete(`/billboards/${billboardId}`, {
    // withCredentials: true,
  });

  console.log('response from delete billboard hook', response);

  return response.data;
};

export const useDeleteBillboard = () => {
  const { toast } = useToast();

  return useMutation(deleteBillboard, {
    onSuccess: (data) => {
      toast({
        description: 'Billboard Deleted Successfully!',
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
