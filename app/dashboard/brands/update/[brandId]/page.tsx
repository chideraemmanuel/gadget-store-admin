'use client';

import UpdateBrandForm from '@/container/forms/brands/updateBrandForm/UpdateBrandForm';
import MobileDashboardHeader from '@/container/mobile-dashboard-header/MobileDashboardHeader';
import { useGetBrand } from '@/lib/hooks/useBrands';
import { FC } from 'react';

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
  } = useGetBrand(brandId);

  console.log('[BRAND]', brand);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <MobileDashboardHeader>
        <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
          Modify Brand details
        </h3>

        {isFetchingBrand && <span>Loading...</span>}

        {isErrorFetchingBrand && <span>An error occured</span>}

        {brand && <UpdateBrandForm brand={brand} />}
      </MobileDashboardHeader>
    </div>
  );
};

export default UpdateBrandPage;
