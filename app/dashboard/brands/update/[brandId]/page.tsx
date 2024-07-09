'use client';

import FullScreenLoader from '@/components/FullScreenLoader';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import UpdateBrandForm from '@/containers/forms/brands/UpdateBrandForm';
import { getBrandByIdOnServer } from '@/lib/actions/brands';
import useGetBrandById from '@/lib/hooks/brands/useGetBrandById';
import { FC, useEffect } from 'react';

interface Props {
  params: {
    brandId: string;
  };
}

const UpdateBrandPage: FC<Props> = ({ params: { brandId } }) => {
  // console.log(params);

  const {
    data: brand,
    isLoading: isFetchingBrand,
    isError: isErrorFetchingBrand,
    error,
  } = useGetBrandById(brandId);

  // const brand = await getBrandByIdOnServer(brandId);

  console.log('[BRAND]', brand);

  useEffect(() => {
    if (error) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching brand'
      );
    }
  }, [error]);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Brand details
      </h3>

      {isFetchingBrand && (
        // <span>Loading form...</span>
        <FullScreenLoader />
      )}

      {brand && <UpdateBrandForm brand={brand} />}
      {/* <UpdateBrandForm brand={brand} /> */}
    </div>
  );
};

export default UpdateBrandPage;
