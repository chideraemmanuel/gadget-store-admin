import { ProductsReturnTypes } from '@/types';

export const getProductByIdOnServer = async (productId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/products/${productId}`
  );

  if (!response.ok) {
    console.log('respose not ok from getProductByIdOnServer', response);
    throw new Error('An error occured while fetching product');
  }

  const promise: Promise<ProductsReturnTypes> = response.json();

  return promise;
};
