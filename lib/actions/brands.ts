import { BrandReturnTypes, SearchParams } from '@/types';
import createSearchParams from '../createSearchParam';

export const getBrandsOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  const params = createSearchParams(searchParamsObject);

  console.log('params', params);

  const response = await fetch(`http://localhost:5000/api/v1/brands?${params}`);

  if (!response.ok) {
    console.log('respose not ok from getBrandsOnServer', response);
    throw new Error('An error occured while fetching brands');
  }

  const promise: Promise<BrandReturnTypes[]> = response.json();

  return promise;
};

export const getBrandByIdOnServer = async (brandId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/brands/${brandId}`
  );

  if (!response.ok) {
    console.log('respose not ok from getBillboardByIdOnServer', response);
    throw new Error('An error occured while fetching billboard by id');
  }

  const promise: Promise<BrandReturnTypes> = response.json();

  return promise;
};
