import BrandsTable from '@/container/brands-table/BrandsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { SearchParams } from '@/types';
import { FC, Suspense } from 'react';

interface Props {
  searchParams: SearchParams;
}

const BrandsPage: FC<Props> = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />
      {/* <Suspense fallback={<div>Loading brandss...</div>}> */}
      <BrandsTable searchParams={searchParams} />
      {/* </Suspense> */}
    </div>
  );
};

export default BrandsPage;
