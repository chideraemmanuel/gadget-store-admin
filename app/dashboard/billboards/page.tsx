import { FC, Suspense } from 'react';
import BillboardsTable from '@/container/billboards-table/BillboardsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { getBillboardsOnServer } from '@/lib/actions/billboards-fetch';
import { SearchParams } from '@/types';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TableSkeleton from '@/components/TableSkeleton';

interface Props {
  searchParams: SearchParams;
}

const BillboardsPage: FC<Props> = async ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />

      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ResourceSearch placeholder="Search billboards" />

          <Button asChild>
            <Link href={'/dashboard/billboards/add'}>Add billboard</Link>
          </Button>
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <BillboardsTable searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
};

export default BillboardsPage;
