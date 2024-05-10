import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { ProductsReturnTypes, useDeleteProduct } from '@/lib/hooks/useProduct';
import { useState } from 'react';

// export type Product = {
//   _id: string;
//   product_name: string;
//   // brand: string;
//   brand: {
//     _id: string;
//     name: string;
//     brand_logo: string;
//   };
//   description: string;
//   price: number;
//   category: { _id: string; name: string };
//   product_image: string;
//   count_in_stock: number;
//   featured: boolean;
// };

export const productsColumns: ColumnDef<ProductsReturnTypes>[] = [
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
    accessorKey: 'price',
    header: 'Price ($)',
    // cell: ({ row }) => {
    //   return (
    //     <div className="">
    //       $
    //     </div>
    //   )
    // }
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

      const [dialogOpen, setDialogOpen] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const router = useRouter();
      const {
        mutate: deleteProduct,
        isLoading: isDeletingProduct,
        isSuccess: hasDeletedProduct,
        isError,
      } = useDeleteProduct();

      return (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(_id)}
              >
                Copy Product ID
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/admin/dashboard/products/update/${_id}`)
                }
              >
                Update Product
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                {/* <DropdownMenuItem>Delete Product</DropdownMenuItem> */}

                <Button
                  className="h-auto bg-transparent relative flex cursor-default select-none items-center justify-start rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-100 text-red-700 focus:bg-bg-red-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-start"
                  tabIndex={0}
                >
                  Delete Product
                </Button>

                {/* <Button asChild>
                  <DropdownMenuItem>Delete Product</DropdownMenuItem>
                </Button> */}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeletingProduct}>
                    Cancel
                  </AlertDialogCancel>

                  {/* <AlertDialogAction asChild onClick={() => deleteProduct(_id)}>
                    <DropdownMenuItem className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:bg-destructive/90 focus:text-destructive-foreground inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Continue
                    </DropdownMenuItem>
                  </AlertDialogAction> */}

                  <Button
                    disabled={isDeletingProduct}
                    variant={'destructive'}
                    onClick={() => deleteProduct(_id)}
                  >
                    Delete product
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </DropdownMenuContent>
          </DropdownMenu>
        </AlertDialog>
      );
    },
  },
];

export const productsSkeletonColumns: ColumnDef<ProductsReturnTypes>[] = [
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
