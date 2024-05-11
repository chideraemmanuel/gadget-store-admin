import AddProductForm from '@/container/forms/products/addProductForm/AddProductForm';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { useGetCategories } from '@/lib/hooks/useCategory';
import { FC } from 'react';

interface Props {}

const AddProductPage: FC<Props> = () => {
  const {
    data: categories,
    isError: isErrorFetchingCategories,
    isLoading: isFetchingCategories,
  } = useGetCategories();

  const {
    data: brands,
    isError: isErrorFetchingBrands,
    isLoading: isFetchingBrands,
  } = useGetBrands();

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
        Fill in product details
      </h3>

      {(isFetchingCategories ?? isFetchingBrands) && <span>Loading...</span>}

      {(isErrorFetchingCategories ?? isErrorFetchingBrands) && (
        <span>An error occured</span>
      )}

      {brands && categories && (
        <AddProductForm categories={categories} brands={brands} />
      )}
    </div>
  );
};

export default AddProductPage;
