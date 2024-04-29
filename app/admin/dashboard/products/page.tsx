'use client';

import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import ProductsShowcase from '@/container/productsShowcase/ProductsShowcase';
import AddProductForm from '@/container/addProductForm/AddProductForm';
import { useGetProducts } from '@/lib/hooks/useProduct';
import ProductsTable from '@/container/productsTable/ProductsTable';

interface Props {}

const ProductsPage: FC<Props> = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetProducts();

  return (
    <>
      {/* showcase */}
      {/* <ProductsShowcase
        products={products}
        isLoading={isLoading}
        isError={isError}
      /> */}
      <ProductsTable data={products} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default ProductsPage;
