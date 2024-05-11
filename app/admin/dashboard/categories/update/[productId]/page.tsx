'use client';

import UpdateCategoryForm from '@/container/forms/categories/updateCategoryForm/UpdateCategoryForm';
import UpdateProductForm from '@/container/forms/products/updateProductForm/UpdateProductForm';
import { useGetBillboards } from '@/lib/hooks/useBillboard';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { useGetCategories, useGetCategory } from '@/lib/hooks/useCategory';
import { useGetProduct } from '@/lib/hooks/useProduct';
import { FC } from 'react';

interface Props {
  params: {
    categoryId: string;
  };
}

const UpdateCategoryPage: FC<Props> = ({ params: { categoryId } }) => {
  // console.log(params);

  const {
    data: category,
    isLoading: isFetchingCategory,
    isError: isErrorFetchingCategory,
  } = useGetCategory(categoryId);

  const {
    data: billboards,
    isError: isErrorFetchingBillboards,
    isLoading: isFetchingBillboards,
  } = useGetBillboards();

  // console.log(isErrorFetchingCategories);
  // console.log(isErrorFetchingProduct);
  console.log('[CATEGORY]', category);

  return (
    <>
      <div className="container mx-auto py-10 max-w-4xl">
        <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
          Update Category
        </h3>

        {(isFetchingCategory ?? isFetchingBillboards) && (
          <span>Loading...</span>
        )}

        {(isErrorFetchingCategory ?? isFetchingBillboards) && (
          <span>An error occured</span>
        )}

        {category && billboards && (
          <UpdateCategoryForm category={category} billboards={billboards} />
        )}
      </div>
    </>
  );
};

export default UpdateCategoryPage;
