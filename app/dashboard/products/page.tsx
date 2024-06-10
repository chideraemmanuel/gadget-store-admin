'use client';

import { FC } from 'react';
import { useGetProducts } from '@/lib/hooks/useProduct';
// import ProductsTable from '@/container/tables/productsTable/ProductsTable';
import ProductsTable from '@/container/products-table/ProductsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';

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
      <DashboardHeaderText />
      {/* <ProductsTable
          data={products?.data}
          isLoading={isLoading}
          isError={isError}
        /> */}
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
