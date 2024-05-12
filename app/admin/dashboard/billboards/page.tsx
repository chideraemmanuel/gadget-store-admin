'use client';

import BillboardsTable from '@/container/tables/billboardsTable/BillboardsTable';
import { useGetBillboards } from '@/lib/hooks/useBillboard';
import { FC } from 'react';

interface Props {}

const BillboardsPage: FC<Props> = () => {
  const { data, isLoading, isError } = useGetBillboards();

  return (
    <>
      <BillboardsTable data={data} isLoading={isLoading} isError={isError} />
    </>
  );
};

export default BillboardsPage;
