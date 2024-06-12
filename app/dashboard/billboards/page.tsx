import { FC, Suspense } from 'react';
import BillboardsTable from '@/container/billboards-table/BillboardsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { getBillboardsOnServer } from '@/lib/actions/billboards';
import { SearchParams } from '@/types';

interface Props {
  searchParams: SearchParams;
}

const BillboardsPage: FC<Props> = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />

      {/* <Suspense fallback={<div>Loading billboards...</div>}> */}
      <BillboardsTable searchParams={searchParams} />
      {/* </Suspense> */}
    </div>
  );
};

export default BillboardsPage;
