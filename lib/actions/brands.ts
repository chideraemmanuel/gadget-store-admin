import { BrandReturnTypes } from '@/types';

export const getBrandsOnServer = async () => {
  const response = await fetch('http://localhost:5000/api/v1/brands');

  if (!response.ok) {
    console.log('respose not ok from getBrandsOnServer', response);
    throw new Error('An error occured while fetching brands');
  }

  const promise: Promise<BrandReturnTypes[]> = response.json();

  return promise;
};
