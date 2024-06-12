import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import UpdateCategoryForm from '@/container/forms/categories/updateCategoryForm/UpdateCategoryForm';
import { getBillboardsOnServer } from '@/lib/actions/billboards';
import { getCategoryByIdOnServer } from '@/lib/actions/categories';
import { FC } from 'react';

interface Props {
  params: {
    categoryId: string;
  };
}

const UpdateCategoryPage: FC<Props> = async ({ params: { categoryId } }) => {
  // console.log(params);

  // const {
  //   data: category,
  //   isLoading: isFetchingCategory,
  //   isError: isErrorFetchingCategory,
  // } = useGetCategory(categoryId);

  // const {
  //   data: billboards,
  //   isError: isErrorFetchingBillboards,
  //   isLoading: isFetchingBillboards,
  // } = useGetBillboards();

  // console.log(isErrorFetchingCategories);
  // console.log(isErrorFetchingProduct);
  // console.log('[CATEGORY]', category);

  const fetchCategory = getCategoryByIdOnServer(categoryId);
  const fetchBillboards = getBillboardsOnServer();

  const [category, billboards] = await Promise.all([
    fetchCategory,
    fetchBillboards,
  ]);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Category details
      </h3>

      {/* {category && billboards && (
        <UpdateCategoryForm category={category} billboards={billboards} />
      )} */}

      <UpdateCategoryForm category={category} billboards={billboards} />
    </div>
  );
};

export default UpdateCategoryPage;
