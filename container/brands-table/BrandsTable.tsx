import { FC } from 'react';
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
import BrandsTableDropdown from './BrandsTableDropdown';
import { SearchParams } from '@/types';
import { getBrandsOnServer } from '@/lib/actions/brands';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResourcePagination from '@/components/ResourcePagination';

interface Props {
  searchParams: SearchParams;
}

const headers = ['brand logo', 'brand name'];

// const brands = [
//   {
//     _id: '1',
//     name: 'Apple',
//     brand_logo: image.src,
//   },
//   {
//     _id: '2',
//     name: 'Samsung',
//     brand_logo: image.src,
//   },
// ];

const BrandsTable: FC<Props> = async ({ searchParams }) => {
  // const brands = await getBrandsOnServer(searchParams);
  const brands: any[] = [];

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <ResourceSearch placeholder="Search brands" />

        <Button asChild>
          <Link href={'/dashboard/brands/add'}>Add brand</Link>
        </Button>
      </div>

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
            {/* cells must be in the same order as headers array  */}
            {brands.length > 0 ? (
              brands.map((brand) => (
                <TableRow key={brand._id}>
                  <TableCell>
                    <div className="w-10 h-auto">
                      <Image
                        className="w-full h-full"
                        src={brand.brand_logo}
                        alt={brand.name}
                        width={300}
                        height={300}
                      />
                    </div>
                  </TableCell>

                  <TableCell>{brand.name}</TableCell>

                  <TableCell>
                    <BrandsTableDropdown _id={brand._id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="h-24 text-center"
                >
                  No brands to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <ResourcePagination totalPages={brands.pagination.totalPages} /> */}
      <ResourcePagination totalPages={5} />
      {/* {brands.length > 0 && <ResourcePagination totalPages={5} />} */}
    </section>
  );
};

export default BrandsTable;
