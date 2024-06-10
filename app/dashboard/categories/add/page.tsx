'use client';

import AddCategoryForm from '@/container/forms/categories/addCategoryForm/AddCategoryForm';
import MobileDashboardHeader from '@/container/mobile-dashboard-header/MobileDashboardHeader';
import { useGetBillboards } from '@/lib/hooks/useBillboard';
import { FC } from 'react';

interface Props {}

const AddCategoryPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBillboards();

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <MobileDashboardHeader>
        <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
          Fill in category details
        </h3>

        {isLoading && <span>Loading...</span>}

        {isError && <span>An error occured</span>}

        {data && <AddCategoryForm billboards={data} />}
      </MobileDashboardHeader>
    </div>
  );
};

export default AddCategoryPage;
