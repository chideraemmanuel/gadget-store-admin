'use client';

import TableSkeleton from '@/components/TableSkeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SearchParams } from '@/types';
import { FC, useEffect } from 'react';
import OrdersTableDropdown from './OrdersTableDropdown';
import ResourcePagination from '@/components/ResourcePagination';
import useGetOrders from '@/lib/hooks/orders/useGetOrders';

interface Props {
  searchParams: SearchParams;
}

const headers = ['items', 'status', 'total price', 'date'];

const OrdersTable: FC<Props> = ({ searchParams }) => {
  // const orders = ordersReturn.data;
  // const orders: any[] = [];
  const {
    data: ordersReturn,
    isLoading,
    isError,
    error,
  } = useGetOrders(searchParams);

  const orders = ordersReturn?.data;

  useEffect(() => {
    if (error) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching orders'
      );
    }
  }, [error]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      {ordersReturn && (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead className="capitalize min-w-[130px]" key={index}>
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {/* CELLS MUST BE IN THE SAME ORDER AS HEADERS ARRAY */}
                {ordersReturn?.data?.length > 0 ? (
                  orders?.map((order) => (
                    <TableRow key={order._id}>
                      {/* <TableCell></TableCell> */}
                      {/* 
                      <TableCell>
                        {order.order_items[0].product.product_name},{' '}
                        {order.order_items?.[1].product.product_name}
                      </TableCell> */}
                      {/* 
                      <TableCell>
                        {order.order_items.map(
                          (order_item, index) =>
                            `${order_item.product.product_name}${index > 0 && ','}`
                        )}
                      </TableCell> */}

                      <TableCell>
                        {order.order_items
                          .map((order_item) => order_item.product.product_name)
                          .join()
                          .slice(0, 20)}
                        ...
                      </TableCell>

                      <TableCell className="capitalize">
                        {order.status}
                      </TableCell>

                      <TableCell>{order.total_price}</TableCell>

                      <TableCell>{order.order_date.toString()}</TableCell>

                      <TableCell>
                        <OrdersTableDropdown
                          _id={order._id}
                          status={order.status}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length}
                      className="h-24 text-center"
                    >
                      No Orders to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* <ResourcePagination totalPages={orders.pagination.totalPages} /> */}
          {/* <ResourcePagination totalPages={5} /> */}
          {ordersReturn?.pagination?.total_pages > 1 && (
            <ResourcePagination
              totalPages={ordersReturn?.pagination?.total_pages}
            />
          )}
        </>
      )}
    </>
  );
};

export default OrdersTable;
