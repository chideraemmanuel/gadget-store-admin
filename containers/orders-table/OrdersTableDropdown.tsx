'use client';

import SelectInput from '@/components/SelectInput';
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
import useDeleteBrand from '@/lib/hooks/brands/useDeleteBrand';
import useUpdateOrderStatus from '@/lib/hooks/orders/useUpdateOrderStatus';
import { OrderStatus } from '@/types';
import { Copy, Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface Props {
  _id: string;
  status: OrderStatus;
}

const orderStatuses = [
  {
    id: 'pending',
    name: 'pending',
    value: 'pending',
  },
  {
    id: 'shipped',
    name: 'shipped',
    value: 'shipped',
  },
  {
    id: 'delivered',
    name: 'delivered',
    value: 'delivered',
  },
];

const OrdersTableDropdown: FC<Props> = ({ _id, status }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [orderStatusState, setOrderStatusState] = useState(status);

  const router = useRouter();

  const { toast } = useToast();

  const {
    // mutate: updateOrderStatus,
    mutateAsync: updateOrderStatus,
    isLoading: isUpdatingOrderStatus,
    isSuccess,
    isError,
  } = useUpdateOrderStatus();

  // CLOSE DIALOG ONCE MUTATION IS COMPLETE
  // useEffect(() => {
  //   if (isSuccess) {
  //     setDialogOpen(false);
  //   }
  // }, [isSuccess]);

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
                navigator.clipboard.writeText(_id);
                toast({
                  description: 'Brand ID Copied Successfully!',
                });
              }}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Order ID</span>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => router.push(`/dashboard/brands/update/${_id}`)}
            >
              <Edit className="h-4 w-4" />
              <span>Update Order</span>
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />

            <AlertDialogTrigger asChild>
              {/* <DropdownMenuItem className="text-destructive hover:text-destructive focus:text-destructive hover:bg-destructive/30 focus:bg-destructive/30 flex items-center gap-2"> */}
              <DropdownMenuItem className="flex items-center gap-2">
                {/* <Trash2 className="h-4 w-4" /> */}
                <Edit className="h-4 w-4" />
                <span>Update Order Status</span>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
          <AlertDialogHeader>
            {/* <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle> */}
            <AlertDialogTitle>Update Order Status</AlertDialogTitle>
            {/* <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription> */}
          </AlertDialogHeader>

          <SelectInput
            label="Order Status"
            selectInputItems={orderStatuses}
            selectInputItemProps={{ className: 'capitalize' }}
            selectInputTriggerProps={{ className: 'capitalize' }}
            defautlValue={status}
            onItemSelect={(value) => {
              console.log({ value });
              setOrderStatusState(value as OrderStatus);
            }}
          />

          <AlertDialogFooter>
            {/* <AlertDialogCancel disabled={isDeletingProduct}> */}
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            {/* <Button
              disabled={orderStatusState === status || isUpdatingOrderStatus}
              onClick={async () => {
                await updateOrderStatus({
                  orderId: _id,
                  status: orderStatusState,
                });
                setDialogOpen(false);
              }}
            >
              Update Order Status
            </Button> */}

            <Button
              className="w-full flex items-center gap-2"
              disabled={orderStatusState === status || isUpdatingOrderStatus}
              onClick={async () => {
                await updateOrderStatus({
                  orderId: _id,
                  status: orderStatusState,
                });
                setDialogOpen(false);
              }}
            >
              {isUpdatingOrderStatus && <div className="spinner"></div>}
              <span>Update Order Status</span>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default OrdersTableDropdown;
