import { BrandReturnTypes, BrandTypes, SearchParams } from '@/types';
import createSearchParams from '../helpers/createSearchParam';

export const getBrandsOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  const params = createSearchParams(searchParamsObject);

  // delete paginated from query params if it gets added, and then set to true to enable paginated response from api
  params.delete('paginated');
  params.set('paginated', 'true');

  console.log('params', params);

  const response = await fetch(
    `http://localhost:5000/api/v1/brands?${params}`,
    { credentials: 'include', cache: 'no-store' }
  );

  if (!response.ok) {
    console.log('respose not ok from getBrandsOnServer', response);
    throw new Error('An error occured while fetching brands');
  }

  const promise: Promise<BrandReturnTypes> = response.json();

  return promise;
};

export const getBrandByIdOnServer = async (brandId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/brands/${brandId}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    console.log('respose not ok from getBillboardByIdOnServer', response);
    throw new Error('An error occured while fetching billboard by id');
  }

  const promise: Promise<BrandTypes> = response.json();

  return promise;
};
