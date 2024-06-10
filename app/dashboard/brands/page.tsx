'use client';

import MobileDashboardHeader from '@/container/mobileDashboardHeader/MobileDashboardHeader';
import BrandsTable from '@/container/tables/brandsTable/BrandsTable';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { FC } from 'react';

interface Props {}

const BrandsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBrands();

  return (
    <div className="container mx-auto">
      <MobileDashboardHeader>
        <BrandsTable data={data} isLoading={isLoading} isError={isError} />
      </MobileDashboardHeader>
    </div>
  );
};

export default BrandsPage;
