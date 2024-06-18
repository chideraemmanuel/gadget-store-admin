'use client';

// import AddProductForm from '@/container/add-product-form/AddProductForm';
import DashboardHeaderText from '@/container/dashboard-header-text/DashboardHeaderText';
import AddProductForm from '@/container/forms/products/addProductForm/AddProductForm';
import { getBrandsOnServer } from '@/lib/actions/brands';
import { getCategoriesOnServer } from '@/lib/actions/categories';
import useGetBrandsOnClient from '@/lib/hooks/brands/useGetBrandsOnClient';
import useGetCategoriesOnClient from '@/lib/hooks/categories/useGetCategoriesOnClient';
import { FC, useEffect } from 'react';

interface Props {}

const AddProductPage: FC<Props> = () => {
  const {
    data: categories,
    isError: isErrorFetchingCategories,
    isLoading: isFetchingCategories,
    error: errorFetchingCategories,
  } = useGetCategoriesOnClient({ paginated: false });

  const {
    data: brands,
    isError: isErrorFetchingBrands,
    isLoading: isFetchingBrands,
    error: errorFetchingBrands,
  } = useGetBrandsOnClient({ paginated: false });

  // const fetchBrands = getBrandsOnServer();
  // const fetchCategories = getCategoriesOnServer();

  // const [brands, categories] = await Promise.all([
  //   fetchBrands,
  //   fetchCategories,
  // ]);

  // const brands: any[] = [];
  // const categories: any[] = [];

  useEffect(() => {
    if (errorFetchingBrands || errorFetchingCategories) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      const error = errorFetchingBrands || errorFetchingCategories;

      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured'
      );
    }
  }, [errorFetchingBrands, errorFetchingCategories]);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Fill in product details
      </h3>

      {(isFetchingCategories ?? isFetchingBrands) && (
        <span>Loading form...</span>
      )}

      {/* {(isErrorFetchingCategories ?? isErrorFetchingBrands) && (
        <span>An error occured</span>
      )} */}

      {brands && categories && (
        <AddProductForm
          categories={categories?.data || categories}
          brands={brands?.data || brands}
        />
      )}

      {/* <AddProductForm /> */}
    </div>
  );
};

export default AddProductPage;
