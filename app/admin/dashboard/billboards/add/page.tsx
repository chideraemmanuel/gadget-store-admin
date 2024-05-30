import AddBillboardForm from '@/container/forms/billboards/addBillboardForm/AddBillboardForm';
import MobileDashboardHeader from '@/container/mobileDashboardHeader/MobileDashboardHeader';
import { FC } from 'react';

interface Props {}

const AddBillboardPage: FC<Props> = () => {
  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <MobileDashboardHeader>
        <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
          Fill in billboard details
        </h3>

        <AddBillboardForm />
      </MobileDashboardHeader>
    </div>
  );
};

export default AddBillboardPage;
