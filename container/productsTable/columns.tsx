import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  _id: string;
  product_name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  product_image: string;
  count_in_stock: number;
  featured: boolean;
};

export const columns: ColumnDef<Product>[] = [
  //   {
  //     accessorKey: 'status',
  //     header: 'Status',
  //   },
  // {
  //   accessorKey: 'product_image',
  //   // header: 'Product',
  //   cell: ({ row }) => {},
  // },
  {
    accessorKey: 'product_image',
    header: 'Product Image',
    cell: ({ row }) => {
      return (
        <div className="w-10 h-auto">
          <img
            src={row.original.product_image}
            alt={row.original.product_name}
          />
        </div>
      );
    },
  },
  {
    accessorKey: 'product_name',
    header: 'Product',
  },
  {
    accessorKey: 'count_in_stock',
    header: 'Count',
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
    cell: ({ row }) => {
      // console.log('row original', row.original.featured);
      // console.log('row get featured value', row.getValue('featured'));
      // const featured = row.getValue('featured')

      return (
        <div className="capitalize">
          {JSON.stringify(row.original.featured)}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { _id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(_id)}
            >
              Copy Product ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Update Product</DropdownMenuItem>
            <DropdownMenuItem>Delete Product</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const productsSkeletonColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'product_image',
    header: 'Product Image',
  },
  {
    accessorKey: 'product_name',
    header: 'Product',
  },
  {
    accessorKey: 'count_in_stock',
    header: 'Count',
  },
  {
    accessorKey: 'featured',
    header: 'Featured',
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const { _id } = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(_id)}
  //           >
  //             Copy Product ID
  //           </DropdownMenuItem>
  //           {/* <DropdownMenuSeparator /> */}
  //           <DropdownMenuItem>Update Product</DropdownMenuItem>
  //           <DropdownMenuItem>Delete Product</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
