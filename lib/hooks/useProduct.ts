import { useToast } from '@/components/ui/use-toast';
import axios from '@/config/axios';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';

interface FormData {
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  product_image: File;
  count_in_stock: number;
  featured: boolean;
}

const addProduct = async (product: FormData) => {
  console.log('product', product);

  const response = await axios.post<ProductReturnTypes[]>(
    '/products',
    product,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

export const useAddProduct = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(addProduct, {
    onSuccess: (data) => {
      console.log(data);

      toast({
        description: 'Product Added Successfully!',
      });

      router.replace('/admin/dashboard/products');
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

export interface ProductReturnTypes {
  _id: string;
  product_name: string;
  // brand: string;
  brand: {
    _id: string;
    name: string;
    brand_logo: string;
  };
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    billboard: {
      _id: string;
      name: string;
      head_text: string;
      paragraph?: string;
      billboard_image: string;
    };
  };
  product_image: string;
  count_in_stock: number;
  featured: boolean;
}

const getProducts = async ({ queryKey }: { queryKey: any[] }) => {
  const filters = queryKey[1];
  console.log('query key', queryKey);
  console.log('filters', filters);

  const response = await axios.get<ProductReturnTypes[]>('/products', {
    params: filters,
  });

  console.log('response', response.data);

  return response.data;
};

interface FiltersTypes {
  product_name: string;
  brand: string;
}

export const useGetProducts = (filters?: FiltersTypes) => {
  return useQuery({
    queryKey: ['get products', filters],
    queryFn: getProducts,
    retry: false,
    // retry: 3,
  });
};

const getProduct = async ({ queryKey }: { queryKey: any[] }) => {
  const productId = queryKey[1];

  console.log('product id from get product hook', productId);

  const response = await axios.get<ProductReturnTypes>(
    `/products/${productId}`
  );

  console.log('response from get product hook', response);

  return response.data;
};

export const useGetProduct = (productId: string) => {
  return useQuery(['get product', productId], getProduct, {
    retry: false,
    onError: (error: any) => {
      console.log('error from get product hook', error);
    },
  });
};

export interface ProductUpdateTypes {
  product_name?: string;
  brand?: string;
  description?: string;
  price?: number;
  category?: string;
  product_image?: File;
  count_in_stock?: number;
  featured?: boolean;
}

const updateProduct = async ({
  productId,
  updates,
}: {
  productId: string;
  updates: ProductUpdateTypes;
}) => {
  console.log('product id from update product hook', productId);
  console.log('updates from update product hook', updates);

  const response = await axios.put<ProductReturnTypes>(
    `/products/${productId}`,
    updates
    // { withCredentials: true }
  );

  console.log('response from update product hook', response);

  return response.data;
};

export const useUpdateProduct = () => {
  const { toast } = useToast();
  const router = useRouter();

  return useMutation(updateProduct, {
    onSuccess: (data) => {
      console.log(data);

      // revalidatePath('/admin/dashboard/products/update/[productId]', 'page');
      // TODO: make revalidatePath work

      toast({
        description: 'Product Updated Successfully!',
      });

      router.replace('/admin/dashboard/products');
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

const deleteProduct = async (productId: string) => {
  const response = await axios.delete(`/products/${productId}`, {
    // withCredentials: true,
  });

  console.log('response from delete product hook', response);

  return response.data;
};

export const useDeleteProduct = () => {
  const { toast } = useToast();

  return useMutation(deleteProduct, {
    onSuccess: (data) => {
      toast({
        description: 'Product Deleted Successfully!',
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
