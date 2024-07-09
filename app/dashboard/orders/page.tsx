import ResourceSearch from '@/components/ResourceSearch';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import OrdersTable from '@/containers/orders-table/OrdersTable';
import { SearchParams } from '@/types';
import { FC } from 'react';

interface Props {
  searchParams: SearchParams;
}

const OrdersPage: FC<Props> = ({ searchParams }) => {
  return (
    <>
      <div className="container mx-auto">
        <DashboardHeaderText />

        <section className="flex flex-col gap-5">
          {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"> */}
          <ResourceSearch placeholder="Search brands" />
          {/* </div> */}

          {/* <Suspense fallback={<TableSkeleton />}> */}
          <OrdersTable searchParams={searchParams} />
          {/* </Suspense> */}
        </section>
      </div>
    </>
  );
};

export default OrdersPage;
