'use client';

import BrandsTable from '@/container/brands-table/BrandsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { FC } from 'react';

interface Props {}

const BrandsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBrands();

  return (
    <div className="container mx-auto">
      <DashboardHeaderText />
      {/* <BrandsTable data={data} isLoading={isLoading} isError={isError} /> */}
      <BrandsTable />
    </div>
  );
};

export default BrandsPage;
