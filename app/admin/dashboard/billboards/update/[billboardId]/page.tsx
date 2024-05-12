'use client';

import UpdateBillboardForm from '@/container/forms/billboards/updateBillboardForm/UpdateBillboardForm';
import UpdateBrandForm from '@/container/forms/brands/updateBrandForm/UpdateBrandForm';
import { useGetBillboard } from '@/lib/hooks/useBillboard';
import { useGetBrand } from '@/lib/hooks/useBrands';
import { FC } from 'react';

interface Props {
  params: {
    billboardId: string;
  };
}

const UpdateBillboardPage: FC<Props> = ({ params: { billboardId } }) => {
  // console.log(params);

  const {
    data: billboard,
    isLoading: isFetchingBillboard,
    isError: isErrorFetchingBillboard,
  } = useGetBillboard(billboardId);

  console.log('[BILLBOARD]', billboard);

  return (
    <>
      <div className="container mx-auto py-10 max-w-4xl">
        <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
          Update Brand
        </h3>

        {isFetchingBillboard && <span>Loading...</span>}

        {isErrorFetchingBillboard && <span>An error occured</span>}

        {billboard && <UpdateBillboardForm billboard={billboard} />}
      </div>
    </>
  );
};

export default UpdateBillboardPage;
