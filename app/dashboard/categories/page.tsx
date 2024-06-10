'use client';

import CategoriesTable from '@/container/categories-table/CategoriesTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { useGetCategories } from '@/lib/hooks/useCategory';
import { FC } from 'react';

interface Props {}

const CategoriesPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetCategories();

  return (
    <div className="container mx-auto">
      <DashboardHeaderText />
      {/* <CategoriesTable data={data} isLoading={isLoading} isError={isError} /> */}
      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
