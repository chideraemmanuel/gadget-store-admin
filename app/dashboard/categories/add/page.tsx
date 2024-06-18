'use client';

import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import AddCategoryForm from '@/container/forms/categories/addCategoryForm/AddCategoryForm';
import { getBillboardsOnServer } from '@/lib/actions/billboards-fetch';
import { getCategoryByIdOnServer } from '@/lib/actions/categories';
import useGetBillboardsOnClient from '@/lib/hooks/billboards/useGetBillboardsOnClient';
import { FC, useEffect } from 'react';

interface Props {}

const AddCategoryPage: FC<Props> = () => {
  // const billboards = await getBillboardsOnServer();

  const {
    data: billboards,
    isLoading,
    isError,
    error,
  } = useGetBillboardsOnClient({ paginated: false });

  useEffect(() => {
    if (error) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching billboards'
      );
    }
  }, [error]);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Fill in category details
      </h3>

      {isLoading && <span>Loading form...</span>}

      {billboards && (
        <AddCategoryForm billboards={billboards?.data || billboards} />
      )}
      {/* <AddCategoryForm billboards={billboards} /> */}
    </div>
  );
};

export default AddCategoryPage;
