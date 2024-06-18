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
import CategoriesTableDropdown from './CategoriesTableDropdown';
import { SearchParams } from '@/types';
import { getCategoriesOnServer } from '@/lib/actions/categories';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResourcePagination from '@/components/ResourcePagination';
import useGetCategoriesOnClient from '@/lib/hooks/categories/useGetCategoriesOnClient';
import TableSkeleton from '@/components/TableSkeleton';

interface Props {
  searchParams: SearchParams;
}

const headers = ['category name', 'billboard'];

// const categories = [
//   {
//     _id: '1',
//     name: 'Laptops',
//     billboard: {
//       name: 'Laptops',
//     },
//   },
//   {
//     _id: '2',
//     name: 'Phones',
//     billboard: {
//       name: 'Phones',
//     },
//   },
// ];

const CategoriesTable: FC<Props> = ({ searchParams }) => {
  // const categoriesReturn = await getCategoriesOnServer(searchParams);
  // const categories = categoriesReturn.data;
  // const categories: any[] = [];

  const {
    data: categoriesReturn,
    isLoading,
    isError,
    error,
  } = useGetCategoriesOnClient({
    searchParamsObject: searchParams,
    paginated: true,
  });

  const categories = categoriesReturn?.data;

  useEffect(() => {
    if (error) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching categories'
      );
    }
  }, [error]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <>
      {categoriesReturn && (
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
                {categoriesReturn?.data?.length > 0 ? (
                  categories?.map((category) => (
                    <TableRow key={category._id}>
                      {/* <TableCell>
                    <div className="w-10 h-auto">
                      <Image
                        className="w-full h-full"
                        src={category.category_image}
                        alt={category.category_name}
                        width={300}
                        height={300}
                      />
                    </div>
                  </TableCell> */}

                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.billboard.name}</TableCell>

                      <TableCell>
                        <CategoriesTableDropdown id={category._id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length}
                      className="h-24 text-center"
                    >
                      No categories to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* <ResourcePagination totalPages={categories.pagination.totalPages} /> */}
          {/* <ResourcePagination totalPages={5} /> */}
          {categoriesReturn.pagination.total_pages > 0 && (
            <ResourcePagination
              totalPages={categoriesReturn.pagination.total_pages}
            />
          )}
        </>
      )}
    </>
  );
};

export default CategoriesTable;
