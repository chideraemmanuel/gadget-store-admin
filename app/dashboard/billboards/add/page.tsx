import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import AddBillboardForm from '@/containers/forms/billboards/AddBillboardForm';
import { FC } from 'react';

interface Props {}

const AddBillboardPage: FC<Props> = () => {
  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Fill in billboard details
      </h3>

      <AddBillboardForm />
    </div>
  );
};

export default AddBillboardPage;
