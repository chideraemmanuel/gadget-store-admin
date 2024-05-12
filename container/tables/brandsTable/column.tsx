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
import { useState } from 'react';
import { BrandReturnTypes, useDeleteBrand } from '@/lib/hooks/useBrands';

export const brandsColumns: ColumnDef<BrandReturnTypes>[] = [
  {
    accessorKey: 'brand_logo',
    header: 'Brand logo',
    cell: ({ row }) => {
      return (
        <div className="w-10 h-auto">
          <img src={row.original.brand_logo} alt={row.original.name} />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Brand name',
    // cell: ({ row }) => {
    //   return <div className="">{row.original}</div>;
    // },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { _id } = row.original;

      const [dialogOpen, setDialogOpen] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const router = useRouter();
      const {
        mutate: deleteBrand,
        isLoading: isDeletingBrand,
        isSuccess: hasDeletedBrand,
        isError,
      } = useDeleteBrand();

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
                Copy Brand ID
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/admin/dashboard/brands/update/${_id}`)
                }
              >
                Update Brand
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                <Button
                  className="h-auto bg-transparent relative flex cursor-default select-none items-center justify-start rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-100 text-red-700 focus:bg-bg-red-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-start"
                  tabIndex={0}
                >
                  Delete Brand
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeletingBrand}>
                    Cancel
                  </AlertDialogCancel>

                  <Button
                    disabled={isDeletingBrand}
                    variant={'destructive'}
                    onClick={() => deleteBrand(_id)}
                  >
                    Delete brand
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

export const brandsSkeletonColumns: ColumnDef<BrandReturnTypes>[] = [
  {
    accessorKey: 'brand_logo',
    header: 'Brand logo',
  },
  {
    accessorKey: 'name',
    header: 'Brand name',
  },
];
