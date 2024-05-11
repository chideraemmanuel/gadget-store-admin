'use client';

import UpdateBrandForm from '@/container/forms/brands/updateBrandForm/UpdateBrandForm';
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
    <>
      <div className="container mx-auto py-10 max-w-4xl">
        <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
          Update Brand
        </h3>

        {isFetchingBrand && <span>Loading...</span>}

        {isErrorFetchingBrand && <span>An error occured</span>}

        {brand && <UpdateBrandForm brand={brand} />}
      </div>
    </>
  );
};

export default UpdateBrandPage;
