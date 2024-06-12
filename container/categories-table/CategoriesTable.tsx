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
import CategoriesTableDropdown from './CategoriesTableDropdown';
import { SearchParams } from '@/types';
import { getCategoriesOnServer } from '@/lib/actions/categories';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ResourcePagination from '@/components/ResourcePagination';

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

const CategoriesTable: FC<Props> = async ({ searchParams }) => {
  // const categories = await getCategoriesOnServer(searchParams);
  const categories: any[] = [];

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <ResourceSearch placeholder="Search categories" />

        <Button asChild>
          <Link href={'/dashboard/categories/add'}>Add category</Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead className="capitalize min-w-[130px]">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* cells must be in the same order as headers array  */}
            {categories.length > 0 ? (
              categories.map((category) => (
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
                    <CategoriesTableDropdown _id={category._id} />
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
      <ResourcePagination totalPages={5} />
      {/* {categories.length > 0 && <ResourcePagination totalPages={5} />} */}
    </section>
  );
};

export default CategoriesTable;
