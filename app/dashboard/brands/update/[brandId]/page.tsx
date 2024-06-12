import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import UpdateBrandForm from '@/container/forms/brands/updateBrandForm/UpdateBrandForm';
import { getBrandByIdOnServer } from '@/lib/actions/brands';
import useGetBrandByIdOnClient from '@/lib/hooks/brands/useGetBrandByIdOnClient';
import { FC } from 'react';

interface Props {
  params: {
    brandId: string;
  };
}

const UpdateBrandPage: FC<Props> = async ({ params: { brandId } }) => {
  // console.log(params);

  // const {
  //   data: brand,
  //   isLoading: isFetchingBrand,
  //   isError: isErrorFetchingBrand,
  // } = useGetBrandByIdOnClient(brandId);

  const brand = await getBrandByIdOnServer(brandId);

  console.log('[BRAND]', brand);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Brand details
      </h3>

      {/* {brand && <UpdateBrandForm brand={brand} />} */}
      <UpdateBrandForm brand={brand} />
    </div>
  );
};

export default UpdateBrandPage;
