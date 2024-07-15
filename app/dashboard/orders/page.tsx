'use client';

import ResourceSearch from '@/components/ResourceSearch';
import SelectInput from '@/components/SelectInput';
import DashboardHeaderText from '@/containers/dashboard-header-text/DashboardHeaderText';
import OrdersTable from '@/containers/orders-table/OrdersTable';
import createSearchParams from '@/lib/helpers/createSearchParam';
import { SearchParams } from '@/types';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface Props {
  searchParams: SearchParams;
}

const orderStatuses = [
  {
    id: 'all',
    name: 'all',
    value: 'all',
  },
  {
    id: 'pending',
    name: 'pending',
    value: 'pending',
  },
  {
    id: 'shipped',
    name: 'shipped',
    value: 'shipped',
  },
  {
    id: 'delivered',
    name: 'delivered',
    value: 'delivered',
  },
];

const OrdersPage: FC<Props> = ({ searchParams }) => {
  const router = useRouter();

  const updateSearchParam = (value: string) => {
    const transformedSearchParams = createSearchParams(searchParams);

    // const newParams = new URLSearchParams(transformedSearchParams.toString());

    // newParams.set('status', value);

    // return `${searchParamKey}=${value}`
    const newSearchParams = new URLSearchParams(
      transformedSearchParams.toString()
    );

    // console.log('passed value', value);

    if (value === '') {
      newSearchParams.delete('status');
    } else {
      newSearchParams.set('status', value);
    }

    router.replace(`?${newSearchParams}`);
  };

  return (
    <>
      <div className="container mx-auto">
        <DashboardHeaderText />

        <section className="flex flex-col gap-5">
          <div className="w-[min(100%,_350px)]">
            <SelectInput
              label="Order Status"
              selectInputItems={orderStatuses}
              selectInputItemProps={{ className: 'capitalize' }}
              selectInputTriggerProps={{ className: 'capitalize' }}
              defautlValue={'all'}
              onItemSelect={(value) => {
                console.log({ value });

                if (value === 'all') {
                  updateSearchParam('');
                } else {
                  updateSearchParam(value.toLowerCase());
                }
              }}
            />
          </div>

          {/* <Suspense fallback={<TableSkeleton />}> */}
          <OrdersTable searchParams={searchParams} />
          {/* </Suspense> */}
        </section>
      </div>
    </>
  );
};

export default OrdersPage;
