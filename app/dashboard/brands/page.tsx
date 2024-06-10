'use client';

import BrandsTable from '@/container/brands-table/BrandsTable';
import MobileDashboardHeader from '@/container/mobile-dashboard-header/MobileDashboardHeader';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { FC } from 'react';

interface Props {}

const BrandsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBrands();

  return (
    <div className="container mx-auto">
      <MobileDashboardHeader>
        {/* <BrandsTable data={data} isLoading={isLoading} isError={isError} /> */}
        <BrandsTable />
      </MobileDashboardHeader>
    </div>
  );
};

export default BrandsPage;
