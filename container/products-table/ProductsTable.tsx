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
import ProductsTableDropdown from './ProductsTableDropdown';

interface Props {}

const headers = [
  'product image',
  'product name',
  'price',
  'count in stock',
  'featured',
];

const products = [
  {
    _id: '1',
    product_name: 'iPhone X',
    product_image: image.src,
    count_in_stock: 12,
    featured: true,
    price: 999.99,
  },
  {
    _id: '2',
    product_name: 'iPhone 13',
    product_image: image.src,
    count_in_stock: 29,
    featured: false,
    price: 799.99,
  },
];
// const products: any[] = [];

const ProductsTable: FC<Props> = () => {
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
            {products.length > 0 ? (
              products.map((product) => (
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
                    <ProductsTableDropdown _id={product._id} />
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
    </>
  );
};

export default ProductsTable;
