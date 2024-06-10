'use client';

import BillboardsTable from '@/container/billboards-table/BillboardsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { useGetBillboards } from '@/lib/hooks/useBillboard';
import { FC } from 'react';

interface Props {}

const BillboardsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBillboards();

  return (
    <div className="container mx-auto">
      <DashboardHeaderText />
      {/* <BillboardsTable data={data} isLoading={isLoading} isError={isError} /> */}
      <BillboardsTable />
    </div>
  );
};

export default BillboardsPage;
