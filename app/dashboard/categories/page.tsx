import ResourceSearch from '@/components/ResourceSearch';
import TableSkeleton from '@/components/TableSkeleton';
import { Button } from '@/components/ui/button';
import CategoriesTable from '@/container/categories-table/CategoriesTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { SearchParams } from '@/types';
import Link from 'next/link';
import { FC, Suspense } from 'react';

interface Props {
  searchParams: SearchParams;
}

const CategoriesPage: FC<Props> = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />

      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ResourceSearch placeholder="Search categories" />

          <Button asChild>
            <Link href={'/dashboard/categories/add'}>Add category</Link>
          </Button>
        </div>

        <Suspense fallback={<TableSkeleton />}>
          <CategoriesTable searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  );
};

export default CategoriesPage;
