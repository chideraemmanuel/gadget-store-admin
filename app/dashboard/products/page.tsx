'use client';

import { FC } from 'react';
import { useGetProducts } from '@/lib/hooks/useProduct';
// import ProductsTable from '@/container/tables/productsTable/ProductsTable';
import MobileDashboardHeader from '@/container/mobile-dashboard-header/MobileDashboardHeader';
import ProductsTable from '@/container/products-table/ProductsTable';

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
      <MobileDashboardHeader>
        {/* <ProductsTable
          data={products?.data}
          isLoading={isLoading}
          isError={isError}
        /> */}
        <ProductsTable />
      </MobileDashboardHeader>
    </div>
  );
};

export default ProductsPage;
