'use client';

import { FC, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import image from '@/assets/phone.png';
import BillboardsTableDropdown from './BillboardsTableDropdown';
import { SearchParams } from '@/types';
import { getBillboardsOnServer } from '@/lib/actions/billboards-fetch';
import ResourcePagination from '@/components/ResourcePagination';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import useGetBillboardsOnClient from '@/lib/hooks/billboards/useGetBillboardsOnClient';
import TableSkeleton from '@/components/TableSkeleton';

interface Props {
  searchParams: SearchParams;
}

// const headers = ['billboard image', 'billboard name', 'billboard head text'];
const headers = ['billboard image', 'billboard name'];

// const billboards = [
//   {
//     _id: '1',
//     name: 'Home page',
//     billboard_image: image.src,
//   },
//   {
//     _id: '2',
//     name: 'Laptops',
//     billboard_image: image.src,
//   },
// ];
// const billboards: any[] = [];

const BillboardsTable: FC<Props> = ({ searchParams }) => {
  // const billboardsReturn = await getBillboardsOnServer(searchParams);
  // const billboards = billboardsReturn.data.data;
  // const billboards: any[] = [];

  const {
    data: billboardsReturn,
    isLoading,
    isError,
    error,
  } = useGetBillboardsOnClient({
    searchParamsObject: searchParams,
    paginated: true,
  });

  const billboards = billboardsReturn?.data;

  console.log('error', error);

  // useEffect(() => {
  //   if (error) {
  //     // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
  //     throw new Error(
  //       // @ts-ignore
  //       error?.message?.data?.error ||
  //         // @ts-ignore
  //         error?.message ||
  //         'An error occured while fetching billboards'
  //     );
  //   }
  // }, [error]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      {billboardsReturn && (
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
                {billboardsReturn?.data?.length > 0 ? (
                  billboards?.map((billboard) => (
                    <TableRow key={billboard._id}>
                      <TableCell>
                        <div className="w-10 h-auto">
                          <Image
                            className="w-full h-full"
                            src={billboard.billboard_image}
                            alt={billboard.name}
                            width={300}
                            height={300}
                          />
                        </div>
                      </TableCell>

                      <TableCell>{billboard.name}</TableCell>

                      <TableCell>
                        <BillboardsTableDropdown id={billboard._id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length}
                      className="h-24 text-center"
                    >
                      No billboards to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* <ResourcePagination totalPages={billboards.pagination.totalPages} /> */}
          {/* <ResourcePagination totalPages={5} /> */}
          {billboardsReturn?.pagination?.total_pages > 0 && (
            <ResourcePagination
              totalPages={billboardsReturn?.pagination?.total_pages}
            />
          )}
        </>
      )}
    </>
  );
};

export default BillboardsTable;
