'use client';

import UpdateProductForm from '@/container/updateProductForm/UpdateProductForm';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { useGetCategories } from '@/lib/hooks/useCategory';
import { useGetProduct } from '@/lib/hooks/useProduct';
import { FC } from 'react';

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
  } = useGetProduct(productId);

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

  // console.log(isErrorFetchingCategories);
  // console.log(isErrorFetchingProduct);
  console.log('[PRODUCT]', product);

  return (
    <>
      <div className="container mx-auto py-10 max-w-4xl">
        <h3 className="font-medium text-xl pb-1 mb-5 text-gray-700 border border-x-0 border-t-0">
          Update Product
        </h3>

        {(isFetchingProduct ?? isFetchingCategories ?? isFetchingBrands) && (
          <span>Loading...</span>
        )}

        {(isErrorFetchingProduct ??
          isErrorFetchingCategories ??
          isErrorFetchingBrands) && <span>An error occured</span>}

        {product && categories && brands && (
          <UpdateProductForm
            product={product}
            categories={categories}
            brands={brands}
          />
        )}
      </div>
    </>
  );
};

export default UpdateProductPage;
