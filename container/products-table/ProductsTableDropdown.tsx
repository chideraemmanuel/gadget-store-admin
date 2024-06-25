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
import useDeleteProductOnClient from '@/lib/hooks/products/useDeleteProductOnClient';
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  id: string;
}

const ProductsTableDropdown: FC<Props> = ({ id }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const { toast } = useToast();

  const {
    mutate: deleteProduct,
    isLoading: isDeletingProduct,
    isSuccess,
    isError,
  } = useDeleteProductOnClient();

  // CLOSE DIALOG ONCE MUTATION IS COMPLETE
  useEffect(() => {
    if (isSuccess) {
      setDialogOpen(false);
    }
  }, [isSuccess]);

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
                  description: 'Product ID Copied Successfully!',
                });
              }}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Product ID</span>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => router.push(`/dashboard/products/update/${id}`)}
            >
              <Edit className="h-4 w-4" />
              <span>Update Product</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <AlertDialogTrigger asChild>
              {/* <DropdownMenuItem>Delete Product</DropdownMenuItem> */}
              <DropdownMenuItem className="text-destructive hover:text-destructive focus:text-destructive hover:bg-destructive/30 focus:bg-destructive/hover:bg-destructive/30 flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                <span>Delete Product</span>
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
              disabled={isDeletingProduct}
              variant={'destructive'}
              onClick={() => {
                deleteProduct(id);
              }}
            >
              Delete Product
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductsTableDropdown;
