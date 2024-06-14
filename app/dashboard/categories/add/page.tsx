import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import AddCategoryForm from '@/container/forms/categories/addCategoryForm/AddCategoryForm';
import { getBillboardsOnServer } from '@/lib/actions/billboards-fetch';
import { getCategoryByIdOnServer } from '@/lib/actions/categories';
import { FC } from 'react';

interface Props {}

const AddCategoryPage: FC<Props> = async () => {
  const billboards = await getBillboardsOnServer();

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Fill in category details
      </h3>

      {/* {billboards && <AddCategoryForm billboards={billboards} />} */}
      <AddCategoryForm billboards={billboards} />
    </div>
  );
};

export default AddCategoryPage;
