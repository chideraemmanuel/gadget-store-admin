'use client';

import { FC } from 'react';
import { useGetProducts } from '@/lib/hooks/useProduct';
import ProductsTable from '@/container/tables/productsTable/ProductsTable';
import MobileDashboardHeader from '@/container/mobileDashboardHeader/MobileDashboardHeader';

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
    <div className="container mx-auto">
      {/* showcase */}
      {/* <ProductsShowcase
        products={products}
        isLoading={isLoading}
        isError={isError}
      /> */}
      <MobileDashboardHeader>
        <ProductsTable
          data={products?.data}
          isLoading={isLoading}
          isError={isError}
        />
      </MobileDashboardHeader>
    </div>
  );
};

export default ProductsPage;
