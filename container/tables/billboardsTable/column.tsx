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
import {
  BillboardReturnTypes,
  useDeleteBillboard,
} from '@/lib/hooks/useBillboard';

export const billboardsColumns: ColumnDef<BillboardReturnTypes>[] = [
  {
    accessorKey: 'name',
    header: 'Billboard name',
  },
  {
    accessorKey: 'head_text',
    header: 'Billboard head text',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { _id } = row.original;

      const [dialogOpen, setDialogOpen] = useState(false);
      const [dropdownOpen, setDropdownOpen] = useState(false);
      const router = useRouter();
      const {
        mutate: deleteBillboard,
        isLoading: isDeletingBillboard,
        isSuccess: hasDeletedBillboard,
        isError,
      } = useDeleteBillboard();

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
                Copy Billboard ID
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/admin/dashboard/billboards/update/${_id}`)
                }
              >
                Update Billboard
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialogTrigger asChild>
                <Button
                  className="h-auto bg-transparent relative flex cursor-default select-none items-center justify-start rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-100 text-red-700 focus:bg-bg-red-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-start"
                  tabIndex={0}
                >
                  Delete Billboard
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
                  <AlertDialogCancel disabled={isDeletingBillboard}>
                    Cancel
                  </AlertDialogCancel>

                  <Button
                    disabled={isDeletingBillboard}
                    variant={'destructive'}
                    onClick={() => deleteBillboard(_id)}
                  >
                    Delete billboard
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

export const billboardsSkeletonColumns: ColumnDef<BillboardReturnTypes>[] = [
  {
    accessorKey: 'name',
    header: 'Billboard name',
  },
  {
    accessorKey: 'head_text',
    header: 'Billboard head text',
  },
];
