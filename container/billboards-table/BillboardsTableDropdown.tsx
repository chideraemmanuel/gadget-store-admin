'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { deleteBillboardOnServer } from '@/lib/actions/billboard-mutation';
import useDeleteBillboardOnClient from '@/lib/hooks/billboards/useDeleteBillboardOnClient';
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useFormStatus } from 'react-dom';

interface Props {
  id: string;
}

const BillboardsTableDropdown: FC<Props> = ({ id }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const {
    mutate: deleteBillboard,
    isLoading: isDeletingBillboard,
    isSuccess,
    isError,
  } = useDeleteBillboardOnClient();

  return (
    <>
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
              className="flex items-center gap-2"
              onClick={() => {
                navigator.clipboard.writeText(id);
                toast({
                  description: 'Billboard ID Copied Successfully!',
                });
              }}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Billboard ID</span>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => router.push(`/dashboard/billboards/update/${id}`)}
            >
              <Edit className="h-4 w-4" />
              <span>Update Billboard</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="text-destructive hover:text-destructive focus:text-destructive hover:bg-red-100 focus:bg-red-100 flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>Delete Billboard</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel disabled={isDeletingProduct}> */}
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button
              disabled={isDeleting}
              variant={'destructive'}
              onClick={async () => {
                setIsDeleting(true);
                // deleteBillboard(id);
                const { data, error } = await deleteBillboardOnServer(id);

                if (error) {
                  toast({
                    description: error,
                    variant: 'destructive',
                  });
                } else {
                  toast({
                    description: 'Billboard Deleted Successfully!',
                  });
                }

                setIsDeleting(false);
                setDialogOpen(false);
              }}
            >
              Delete Billboard
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BillboardsTableDropdown;
