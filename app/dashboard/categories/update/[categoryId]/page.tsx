'use client';

import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import UpdateCategoryForm from '@/container/forms/categories/updateCategoryForm/UpdateCategoryForm';
import { getBillboardsOnServer } from '@/lib/actions/billboards-fetch';
import { getCategoryByIdOnServer } from '@/lib/actions/categories';
import useGetBillboardsOnClient from '@/lib/hooks/billboards/useGetBillboardsOnClient';
import useGetCategoryByIdOnClient from '@/lib/hooks/categories/useGetCategoryByIdOnClient';
import { FC, useEffect } from 'react';

interface Props {
  params: {
    categoryId: string;
  };
}

const UpdateCategoryPage: FC<Props> = ({ params: { categoryId } }) => {
  // console.log(params);

  const {
    data: category,
    isLoading: isFetchingCategory,
    isError: isErrorFetchingCategory,
    error: errorFetchingCategory,
  } = useGetCategoryByIdOnClient(categoryId);

  const {
    data: billboards,
    isError: isErrorFetchingBillboards,
    isLoading: isFetchingBillboards,
    error: errorFetchingBillboards,
  } = useGetBillboardsOnClient({ paginated: false });

  // console.log(isErrorFetchingCategories);
  // console.log(isErrorFetchingProduct);
  // console.log('[CATEGORY]', category);

  // const fetchCategory = getCategoryByIdOnServer(categoryId);
  // const fetchBillboards = getBillboardsOnServer();

  // const [category, billboards] = await Promise.all([
  //   fetchCategory,
  //   fetchBillboards,
  // ]);

  useEffect(() => {
    if (errorFetchingCategory || errorFetchingBillboards) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      const error = errorFetchingCategory || errorFetchingBillboards;

      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured'
      );
    }
  }, [errorFetchingCategory, errorFetchingBillboards]);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Category details
      </h3>

      {(isFetchingCategory ?? isFetchingBillboards) && (
        <span>Loading form...</span>
      )}

      {category && billboards && (
        <UpdateCategoryForm
          category={category}
          billboards={billboards?.data || billboards}
        />
      )}

      {/* <UpdateCategoryForm category={category} billboards={billboards} /> */}
    </div>
  );
};

export default UpdateCategoryPage;
