'use client';

import FullScreenLoader from '@/components/FullScreenLoader';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import AddCategoryForm from '@/containers/forms/categories/AddCategoryForm';
import { getBillboardsOnServer } from '@/lib/actions/billboards-fetch';
import { getCategoryByIdOnServer } from '@/lib/actions/categories';
import useGetBillboards from '@/lib/hooks/billboards/useGetBillboards';
import { FC, useEffect } from 'react';

interface Props {}

const AddCategoryPage: FC<Props> = () => {
  // const billboards = await getBillboardsOnServer();

  const {
    data: billboards,
    isLoading,
    isError,
    error,
  } = useGetBillboards({ paginated: false });

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

      {isLoading && (
        // <span>Loading form...</span>
        <FullScreenLoader />
      )}

      {billboards && (
        <AddCategoryForm billboards={billboards?.data || billboards} />
      )}
      {/* <AddCategoryForm billboards={billboards} /> */}
    </div>
  );
};

export default AddCategoryPage;
