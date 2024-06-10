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

interface Props {}

const headers = ['category name', 'billboard'];

const categories = [
  {
    _id: '1',
    name: 'Laptops',
    billboard: {
      name: 'Laptops',
    },
  },
  {
    _id: '2',
    name: 'Phones',
    billboard: {
      name: 'Phones',
    },
  },
];
// const categories: any[] = [];

const CategoriesTable: FC<Props> = () => {
  return (
    <>
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
    </>
  );
};

export default CategoriesTable;
