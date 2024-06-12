import CategoriesTable from '@/container/categories-table/CategoriesTable';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import { SearchParams } from '@/types';
import { FC, Suspense } from 'react';

interface Props {
  searchParams: SearchParams;
}

const CategoriesPage: FC<Props> = ({ searchParams }) => {
  return (
    <div className="container mx-auto">
      <DashboardHeaderText />
      {/* <Suspense fallback={<div>Loading categories...</div>}> */}
      <CategoriesTable searchParams={searchParams} />
      {/* </Suspense> */}
    </div>
  );
};

export default CategoriesPage;
