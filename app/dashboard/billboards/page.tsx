'use client';

import MobileDashboardHeader from '@/container/mobileDashboardHeader/MobileDashboardHeader';
import BillboardsTable from '@/container/tables/billboardsTable/BillboardsTable';
import { useGetBillboards } from '@/lib/hooks/useBillboard';
import { FC } from 'react';

interface Props {}

const BillboardsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBillboards();

  return (
    <div className="container mx-auto">
      <MobileDashboardHeader>
        <BillboardsTable data={data} isLoading={isLoading} isError={isError} />
      </MobileDashboardHeader>
    </div>
  );
};

export default BillboardsPage;
