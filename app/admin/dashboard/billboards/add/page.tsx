import AddBillboardForm from '@/container/forms/billboards/addBillboardForm/AddBillboardForm';
import { FC } from 'react';

interface Props {}

const AddBillboardPage: FC<Props> = () => {
  return (
    <>
      <div className="container mx-auto py-10 max-w-4xl">
        <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
          Fill in billboard details
        </h3>

        <AddBillboardForm />
      </div>
    </>
  );
};

export default AddBillboardPage;
