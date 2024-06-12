import { BillboardReturnTypes, SearchParams } from '@/types';
import createSearchParams from '../createSearchParam';

export const getBillboardsOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  //   const params = new URLSearchParams(searchParamsObject);
  const params = createSearchParams(searchParamsObject);

  console.log('params', params);

  const response = await fetch(
    `http://localhost:5000/api/v1/billboards?${params}`
  );

  if (!response.ok) {
    throw new Error('An error occured');
  }

  const promise: Promise<BillboardReturnTypes[]> = response.json();

  return promise;
};

export const getBillboardByIdOnServer = async (billboardId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/billboards/${billboardId}`
  );

  if (!response.ok) {
    throw new Error('An error occured');
  }

  const promise: Promise<BillboardReturnTypes> = response.json();

  return promise;
};
