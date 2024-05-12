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
import { ProductReturnTypes, useDeleteProduct } from '@/lib/hooks/useProduct';
import { useState } from 'react';
import {
  CategoryReturnTypes,
  useDeleteCategory,
} from '@/lib/hooks/useCategory';

export const categoriesColumns: ColumnDef<CategoryReturnTypes>[] = [
  {
    accessorKey: 'name',
    header: 'Category name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => {
      console.log('row', row);

      return <div className="">{row?.original?.billboard?.name}</div>;
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
        mutate: deleteCategory,
        isLoading: isDeletingCategory,
        isSuccess: hasDeletedCategory,
        isError,
      } = useDeleteCategory();

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
                Copy Category ID
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/admin/dashboard/categories/update/${_id}`)
                }
              >
                Update Category
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                {/* <DropdownMenuItem>Delete Product</DropdownMenuItem> */}

                <Button
                  className="h-auto bg-transparent relative flex cursor-default select-none items-center justify-start rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-100 text-red-700 focus:bg-bg-red-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-start"
                  tabIndex={0}
                >
                  Delete Category
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
                  <AlertDialogCancel disabled={isDeletingCategory}>
                    Cancel
                  </AlertDialogCancel>

                  <Button
                    disabled={isDeletingCategory}
                    variant={'destructive'}
                    onClick={() => deleteCategory(_id)}
                  >
                    Delete category
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

export const categoriesSkeletonColumns: ColumnDef<CategoryReturnTypes>[] = [
  {
    accessorKey: 'name',
    header: 'Category name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
  },
];
