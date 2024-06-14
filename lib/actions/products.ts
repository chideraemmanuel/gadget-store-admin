import { ProductTypes, ProductsReturnTypes, SearchParams } from '@/types';
import createSearchParams from '../createSearchParam';

export const getProductsOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  //   const params = new URLSearchParams(searchParamsObject);
  const params = createSearchParams(searchParamsObject);

  console.log('params', params);

  const response = await fetch(
    `http://localhost:5000/api/v1/products?${params}`,
    { credentials: 'include', cache: 'no-store' }
  );

  if (!response.ok) {
    console.log('respose not ok from getProductsOnServer', response);
    throw new Error('An error occured while fetching billboards');
  }

  const promise: Promise<ProductsReturnTypes> = response.json();

  return promise;
};

export const getProductByIdOnServer = async (productId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/products/${productId}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    console.log('respose not ok from getProductByIdOnServer', response);
    throw new Error('An error occured while fetching product');
  }

  const promise: Promise<ProductTypes> = response.json();

  return promise;
};
