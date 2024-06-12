import { CategoryReturnTypes, SearchParams } from '@/types';
import createSearchParams from '../createSearchParam';

export const getCategoriesOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  const params = createSearchParams(searchParamsObject);

  console.log('params', params);

  const response = await fetch(
    `http://localhost:5000/api/v1/categories?${params}`
  );

  if (!response.ok) {
    console.log('respose not ok from getCategoriesOnServer', response);
    throw new Error('An error occured while fetching categories');
  }

  const promise: Promise<CategoryReturnTypes[]> = response.json();

  return promise;
};

export const getCategoryByIdOnServer = async (categoryId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/categories/${categoryId}`
  );

  if (!response.ok) {
    console.log('respose not ok from getCategoryByIdOnServer', response);
    throw new Error('An error occured while fetching category by id');
  }

  const promise: Promise<CategoryReturnTypes> = response.json();

  return promise;
};
