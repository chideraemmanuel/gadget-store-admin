import { CategoryReturnTypes } from '@/types';

const getCategoriesOnServer = async () => {
  const response = await fetch('http://localhost:5000/api/v1/categories');

  if (!response.ok) {
    console.log('respose not ok from getCategoriesOnServer', response);
    throw new Error('An error occured while fetching categories');
  }

  const promise: Promise<CategoryReturnTypes[]> = response.json();

  return promise;
};

export default getCategoriesOnServer;
