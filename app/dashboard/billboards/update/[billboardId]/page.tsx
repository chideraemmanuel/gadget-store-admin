'use client';

import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import UpdateBillboardForm from '@/container/forms/billboards/updateBillboardForm/UpdateBillboardForm';
import { getBillboardByIdOnServer } from '@/lib/actions/billboards-fetch';
import useGetBillboardByIdOnClient from '@/lib/hooks/billboards/useGetBillboardByIdOnClient';
import { FC, useEffect } from 'react';

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
    error,
  } = useGetBillboardByIdOnClient(billboardId);

  // const billboard = await getBillboardByIdOnServer(billboardId);

  console.log('[BILLBOARD]', billboard);

  useEffect(() => {
    if (error) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching billboard'
      );
    }
  }, [error]);

  return (
    <div className="container mx-auto md:py-6  max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Billboard details
      </h3>

      {isFetchingBillboard && <span>Loading form...</span>}

      {billboard && <UpdateBillboardForm billboard={billboard} />}
      {/* <UpdateBillboardForm billboard={billboard} /> */}
    </div>
  );
};

export default UpdateBillboardPage;
