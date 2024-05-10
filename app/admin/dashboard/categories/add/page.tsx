import AddCategoryForm from '@/container/addCategoryForm/AddCategoryForm';
import { useGetBillboards } from '@/lib/hooks/useBillboard';
import { FC } from 'react';

interface Props {}

const AddCategoryPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBillboards();

  return (
    <>
      <div className="container mx-auto py-10 max-w-4xl">
        <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
          Fill in category details
        </h3>

        {isLoading && <span>Loading...</span>}

        {isError && <span>An error occured</span>}

        {data && <AddCategoryForm billboards={data} />}
      </div>
    </>
  );
};

export default AddCategoryPage;
