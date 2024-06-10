import AddBrandForm from '@/container/forms/brands/addBrandForm/AddBrandForm';
import MobileDashboardHeader from '@/container/mobile-dashboard-header/MobileDashboardHeader';
import { FC } from 'react';

interface Props {}

const AddBrandPage: FC<Props> = () => {
  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <MobileDashboardHeader>
        <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
          Fill in brand details
        </h3>

        <AddBrandForm />
      </MobileDashboardHeader>
    </div>
  );
};

export default AddBrandPage;
