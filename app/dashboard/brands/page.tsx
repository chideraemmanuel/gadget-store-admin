import ResourceSearch from '@/components/ResourceSearch';
import TableSkeleton from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import BrandsTable from '@/container/brands-table/BrandsTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { SearchParams } from '@/types';
import Link from 'next/link';
import { FC, Suspense } from 'react';

interface Props {
  searchParams: SearchParams;
}

const BrandsPage: FC<Props> = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />

      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ResourceSearch placeholder="Search brands" />

          <Button asChild>
            <Link href={'/dashboard/brands/add'}>Add brand</Link>
          </Button>
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <BrandsTable searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
};

export default BrandsPage;
