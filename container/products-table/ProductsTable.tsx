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
import ProductsTableDropdown from './ProductsTableDropdown';
import { getProductsOnServer } from '@/lib/actions/products';
import { SearchParams } from '@/types';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResourcePagination from '@/components/ResourcePagination';
import useGetProductsOnClient from '@/lib/hooks/products/useGetProductsOnClient';
import TableSkeleton from '@/components/TableSkeleton';

interface Props {
  searchParams: SearchParams;
}

const headers = [
  'product image',
  'product name',
  'price',
  'count in stock',
  'featured',
];

// const products = [
//   {
//     _id: '1',
//     product_name: 'iPhone X',
//     product_image: image.src,
//     count_in_stock: 12,
//     featured: true,
//     price: 999.99,
//   },
//   {
//     _id: '2',
//     product_name: 'iPhone 13',
//     product_image: image.src,
//     count_in_stock: 29,
//     featured: false,
//     price: 799.99,
//   },
// ];

const ProductsTable: FC<Props> = ({ searchParams }) => {
  // const productsReturn = await getProductsOnServer(searchParams);
  // const products = productsReturn.data;
  // const products: any[] = [];

  // console.log(productsReturn);

  const {
    data: productsReturn,
    isLoading,
    isError,
    error,
  } = useGetProductsOnClient(searchParams);

  const products = productsReturn?.data;

  console.log('error', error);

  useEffect(() => {
    // IF ERROR IS A NETWORK ERROR, THROW ERROR (WILL BE CAUGHT BY ERROR.TSX IN ROOT)
    // @ts-ignore
    // if (error?.message === 'Network Error') {
    //   console.log('network error');
    //   throw new Error('Network Error');
    // }

    if (error) {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching products'
      );
    }
  }, [error]);

  if (isLoading) {
    return <TableSkeleton />;
  }

  // if (error) {
  //   return <span>error occured</span>;
  // }

  return (
    <>
      {productsReturn && (
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
                {productsReturn?.data?.length > 0 ? (
                  products?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <div className="w-10 h-auto">
                          <Image
                            className="w-full h-full"
                            src={product.product_image}
                            alt={product.product_name}
                            width={300}
                            height={300}
                          />
                        </div>
                      </TableCell>

                      <TableCell>{product.product_name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.count_in_stock}</TableCell>
                      <TableCell>{JSON.stringify(product.featured)}</TableCell>

                      <TableCell>
                        <ProductsTableDropdown id={product._id} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={headers.length}
                      className="h-24 text-center"
                    >
                      No products to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* <ResourcePagination totalPages={products.pagination.totalPages} /> */}
          {/* <ResourcePagination totalPages={5} /> */}
          {productsReturn?.pagination?.total_pages > 0 && (
            <ResourcePagination
              totalPages={productsReturn?.pagination?.total_pages}
            />
          )}
        </>
      )}
    </>
  );
};

export default ProductsTable;
