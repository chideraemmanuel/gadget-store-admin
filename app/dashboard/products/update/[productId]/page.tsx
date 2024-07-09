'use client';

import FullScreenLoader from '@/components/FullScreenLoader';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import UpdateProductForm from '@/containers/forms/products/UpdateProductForm';
import { getBrandsOnServer } from '@/lib/actions/brands';
import { getCategoriesOnServer } from '@/lib/actions/categories';
import { getProductByIdOnServer } from '@/lib/actions/products';
import useGetBrands from '@/lib/hooks/brands/useGetBrands';
import useGetCategories from '@/lib/hooks/categories/useGetCategories';
import useGetProductById from '@/lib/hooks/products/useGetProductById';
import { FC, useEffect } from 'react';

interface Props {
  params: {
    productId: string;
  };
}

const UpdateProductPage: FC<Props> = ({ params: { productId } }) => {
  // console.log(params);

  const {
    data: product,
    isLoading: isFetchingProduct,
    isError: isErrorFetchingProduct,
    error: errorFetchingProduct,
  } = useGetProductById(productId);

  const {
    data: categories,
    isError: isErrorFetchingCategories,
    isLoading: isFetchingCategories,
    error: errorFetchingCategories,
  } = useGetCategories({ paginated: false });

  const {
    data: brands,
    isError: isErrorFetchingBrands,
    isLoading: isFetchingBrands,
    error: errorFetchingBrands,
  } = useGetBrands({ paginated: false });

  useEffect(() => {
    if (
      errorFetchingProduct ||
      errorFetchingBrands ||
      errorFetchingCategories
    ) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      const error =
        errorFetchingProduct || errorFetchingBrands || errorFetchingCategories;

      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured'
      );
    }
  }, [errorFetchingProduct, errorFetchingBrands, errorFetchingCategories]);

  // console.log(isErrorFetchingCategories);
  // console.log(isErrorFetchingProduct);
  // console.log('[PRODUCT]', product);

  // const fetchProduct = getProductByIdOnServer(productId);
  // const fetchCategories = getCategoriesOnServer();
  // const fetchBrands = getBrandsOnServer();

  // const [product, categories, brands] = await Promise.all([
  //   fetchProduct,
  //   fetchCategories,
  //   fetchBrands,
  // ]);

  return (
    <div className="container mx-auto md:py-7 max-w-4xl">
      <DashboardHeaderText />
      <h3 className="font-medium md:text-xl text-lg pb-1 mb-5 text-gray-500 border border-x-0 border-t-0">
        Modify Product details
      </h3>

      {(isFetchingProduct ?? isFetchingCategories ?? isFetchingBrands) && (
        // <span>Loading form...</span>
        <FullScreenLoader />
      )}

      {/* 
      {(isErrorFetchingProduct ??
        isErrorFetchingCategories ??
        isErrorFetchingBrands) && <span>An error occured</span>} */}

      {product && categories && brands && (
        <UpdateProductForm
          product={product}
          categories={categories.data}
          brands={brands.data}
        />
      )}
    </div>
  );
};

export default UpdateProductPage;
