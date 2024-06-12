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
import BillboardsTableDropdown from './BillboardsTableDropdown';
import { BillboardReturnTypes, SearchParams } from '@/types';
import { getBillboardsOnServer } from '@/lib/actions/billboards';
import ResourcePagination from '@/components/ResourcePagination';
import ResourceSearch from '@/components/ResourceSearch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  // billboards: BillboardReturnTypes[];
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

const BillboardsTable: FC<Props> = async ({ searchParams }) => {
  // const billboards = await getBillboardsOnServer(searchParams);
  const billboards: any[] = [];

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <ResourceSearch placeholder="Search billboards" />

        <Button asChild>
          <Link href={'/dashboard/billboards/add'}>Add billboard</Link>
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
            {billboards.length > 0 ? (
              billboards.map((billboard) => (
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
                    <BillboardsTableDropdown _id={billboard._id} />
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
      <ResourcePagination totalPages={5} />
      {/* {billboards.length > 0 && <ResourcePagination totalPages={5} />} */}
    </section>
  );
};

export default BillboardsTable;
