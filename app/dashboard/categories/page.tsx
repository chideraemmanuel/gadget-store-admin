'use client';

import MobileDashboardHeader from '@/container/mobileDashboardHeader/MobileDashboardHeader';
import CategoriesTable from '@/container/tables/categoriesTable/CategoriesTable';
import { useGetCategories } from '@/lib/hooks/useCategory';
import { FC } from 'react';

interface Props {}

const CategoriesPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetCategories();

  return (
    <div className="container mx-auto">
      <MobileDashboardHeader>
        <CategoriesTable data={data} isLoading={isLoading} isError={isError} />
      </MobileDashboardHeader>
    </div>
  );
};

export default CategoriesPage;
