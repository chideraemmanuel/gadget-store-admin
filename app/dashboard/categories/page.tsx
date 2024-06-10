'use client';

import CategoriesTable from '@/container/categories-table/CategoriesTable';
import MobileDashboardHeader from '@/container/mobile-dashboard-header/MobileDashboardHeader';
import { useGetCategories } from '@/lib/hooks/useCategory';
import { FC } from 'react';

interface Props {}

const CategoriesPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetCategories();

  return (
    <div className="container mx-auto">
      <MobileDashboardHeader>
        {/* <CategoriesTable data={data} isLoading={isLoading} isError={isError} /> */}
        <CategoriesTable />
      </MobileDashboardHeader>
    </div>
  );
};

export default CategoriesPage;
