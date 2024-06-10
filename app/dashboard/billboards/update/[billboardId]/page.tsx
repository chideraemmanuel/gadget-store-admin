'use client';

import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
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
    <div className="container mx-auto md:py-6  max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Billboard details
      </h3>

      {isFetchingBillboard && <span>Loading...</span>}

      {isErrorFetchingBillboard && <span>An error occured</span>}

      {billboard && <UpdateBillboardForm billboard={billboard} />}
    </div>
  );
};

export default UpdateBillboardPage;
