'use client';

import CategoriesTable from '@/container/categoriesTable/CategoriesTable';
import { useGetCategories } from '@/lib/hooks/useCategory';
import { FC } from 'react';

interface Props {}

const CategoriesPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetCategories();

  return (
    <>
      <CategoriesTable data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default CategoriesPage;
