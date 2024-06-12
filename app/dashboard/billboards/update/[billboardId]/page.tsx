import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import UpdateBillboardForm from '@/container/forms/billboards/updateBillboardForm/UpdateBillboardForm';
import { getBillboardByIdOnServer } from '@/lib/actions/billboards';
import useGetBillboardByIdOnClient from '@/lib/hooks/billboards/useGetBillboardByIdOnClient';
import { FC } from 'react';

interface Props {
  params: {
    billboardId: string;
  };
}

const UpdateBillboardPage: FC<Props> = async ({ params: { billboardId } }) => {
  // console.log(params);

  // const {
  //   data: billboard,
  //   isLoading: isFetchingBillboard,
  //   isError: isErrorFetchingBillboard,
  // } = useGetBillboardByIdOnClient(billboardId);

  const billboard = await getBillboardByIdOnServer(billboardId);

  console.log('[BILLBOARD]', billboard);

  return (
    <div className="container mx-auto md:py-6  max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Billboard details
      </h3>

      {/* {billboard && <UpdateBillboardForm billboard={billboard} />} */}
      <UpdateBillboardForm billboard={billboard} />
    </div>
  );
};

export default UpdateBillboardPage;
