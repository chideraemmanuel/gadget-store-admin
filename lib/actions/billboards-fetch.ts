import { BillboardReturnTypes, BillboardTypes, SearchParams } from '@/types';
import createSearchParams from '../createSearchParam';
import { revalidatePath } from 'next/cache';
import axios from '@/config/axios';

export const getBillboardsOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  //   const params = new URLSearchParams(searchParamsObject);
  const params = createSearchParams(searchParamsObject);

  // delete paginated from query params if it gets added, and then set to true to enable paginated response from api
  params.delete('paginated');
  params.set('paginated', 'true');

  console.log('params', params);

  // const response = await fetch(
  //   `http://localhost:5000/api/v1/billboards?${params}`,
  //   { credentials: 'include', cache: 'no-store' }
  // );

  // if (!response.ok) {
  //   console.log('respose not ok from getBillboardsOnServer', response);
  //   throw new Error('An error occured while fetching billboards');
  // }

  // const promise: Promise<BillboardReturnTypes> = response.json();

  // return promise;

  return axios.get<BillboardReturnTypes>(
    `http://localhost:5000/api/v1/billboards?${params}`
  );
};

export const getBillboardByIdOnServer = async (billboardId: string) => {
  // const response = await fetch(
  //   `http://localhost:5000/api/v1/billboards/${billboardId}`,
  //   { credentials: 'include' }
  // );

  // if (!response.ok) {
  //   console.log('respose not ok from getBillboardByIdOnServer', response);
  //   throw new Error('An error occured while fetching billboard by id');
  // }

  // const promise: Promise<BillboardTypes> = response.json();

  // return promise;
  return axios.get<BillboardTypes>(
    `http://localhost:5000/api/v1/billboards/${billboardId}`
  );
};
