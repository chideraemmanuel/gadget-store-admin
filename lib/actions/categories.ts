import { CategoryReturnTypes, CategoryTypes, SearchParams } from '@/types';
import createSearchParams from '../helpers/createSearchParam';

export const getCategoriesOnServer = async (
  searchParamsObject: SearchParams = {}
) => {
  const params = createSearchParams(searchParamsObject);

  // delete paginated from query params if it gets added, and then set to true to enable paginated response from api
  params.delete('paginated');
  params.set('paginated', 'true');

  console.log('params', params);

  const response = await fetch(
    `http://localhost:5000/api/v1/categories?${params}`,
    { credentials: 'include', cache: 'no-store' }
  );

  if (!response.ok) {
    console.log('respose not ok from getCategoriesOnServer', response);
    throw new Error('An error occured while fetching categories');
  }

  const promise: Promise<CategoryReturnTypes> = response.json();

  return promise;
};

export const getCategoryByIdOnServer = async (categoryId: string) => {
  const response = await fetch(
    `http://localhost:5000/api/v1/categories/${categoryId}`,
    { credentials: 'include' }
  );

  if (!response.ok) {
    console.log('respose not ok from getCategoryByIdOnServer', response);
    throw new Error('An error occured while fetching category by id');
  }

  const promise: Promise<CategoryTypes> = response.json();

  return promise;
};
