'use client';

import BrandsTable from '@/container/tables/brandsTable/BrandsTable';
import { useGetBrands } from '@/lib/hooks/useBrands';
import { FC } from 'react';

interface Props {}

const BrandsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBrands();

  return (
    <>
      <BrandsTable data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default BrandsPage;
