'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import Error from '@/containers/error/Error';
import NetworkError from '@/containers/network-error/NetworkError';
import ServerError from '@/containers/server-error/ServerError';
import { getIndividualItemTotal, getSubTotal } from '@/lib/helpers/getTotals';
import useGetOrderById from '@/lib/hooks/orders/useGetOrderById';
import { cn } from '@/lib/utils';
import { Copy, CreditCard, MoreVertical, Truck } from 'lucide-react';
import moment from 'moment';
import { FC } from 'react';

interface Props {
  params: {
    orderId: string;
  };
}

const OrderDetailsPage: FC<Props> = ({ params: { orderId } }) => {
  const { toast } = useToast();

  const { data: order, isLoading, isError, error } = useGetOrderById(orderId);

  // @ts-ignore
  if (error?.message === 'Network Error') {
    console.log('network error');
    return <NetworkError />;
  }

  if (
    // @ts-ignore
    error?.response?.data?.error === 'Internal Server Error' ||
    // @ts-ignore
    error?.response?.status === 500
  ) {
    console.log('server error');
    return <ServerError />;
  }

  if (
    error &&
    // @ts-ignore
    !(error?.response?.status > 400 && error?.response?.status < 500)
  ) {
    // @ts-ignore
    return <Error message={error?.response?.data?.error || error.message} />;
  }

  return (
    <>
      <div className="container mx-auto py-7">
        {isLoading && (
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <Skeleton className="h-5 w-40 max-w-[80%]" />
                <Skeleton className="h-3 w-20 max-w-[80%]" />
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Skeleton className="h-2 rounded-full w-7" />
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Items</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <Skeleton className="w-10 h-4" />
                    <Skeleton className="w-10 h-4" />
                  </li>
                  <li className="flex items-center justify-between">
                    <Skeleton className="w-10 h-4" />
                    <Skeleton className="w-10 h-4" />
                  </li>
                </ul>
                <Separator className="my-2" />
                <div className="font-semibold">Price</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <Skeleton className="w-10 h-4" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <Skeleton className="w-10 h-4" />
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <Skeleton className="w-10 h-4" />
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <Skeleton className="w-10 h-4" />
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  {/* <address className="grid gap-0.5 not-italic text-muted-foreground"> */}
                  <address className="grid gap-3 not-italic text-muted-foreground">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-20 h-4" />
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <Skeleton className="w-10 h-4" />
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <Skeleton className="w-10 h-4" />
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <Skeleton className="w-10 h-4" />
                  </div> */}
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-10 h-4" />
                    <Skeleton className="w-20 h-4" />
                  </div>
                </dl>
              </div>
            </CardContent>
            {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
          </CardFooter> */}
          </Card>
        )}

        {!isLoading && order && (
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Order {orderId}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => {
                      navigator.clipboard.writeText(orderId);
                      toast({
                        description: 'Order ID Copied Successfully!',
                      });
                    }}
                  >
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Copy Order ID</span>
                  </Button>
                </CardTitle>
                {/* <CardDescription>Date: November 23, 2023</CardDescription> */}
                <CardDescription>
                  Date: {moment(order.order_date).format('MMMM DD, YYYY')}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Badge
                  variant="outline"
                  // className="h-8 gap-1 text-blue-400 border-blue-400"
                  className={cn(
                    'capitalize',
                    order.status === 'pending' &&
                      'text-blue-400 border-blue-400',
                    order.status === 'shipped' &&
                      'text-orange-400 border-orange-400',
                    order.status === 'delivered' &&
                      'text-green-400 border-green-400'
                  )}
                >
                  {order.status}
                </Badge>
                {/* <Button size="sm" variant="outline" className="h-8 gap-1">
                <Truck className="h-3.5 w-3.5" />
                <span className="lg:not-sr-only sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
              </Button> */}
                {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Items</div>
                <ul className="grid gap-3">
                  {order.order_items.map((order_item) => (
                    <li
                      key={order_item.product._id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">
                        <div className="grid gap-1">
                          <span className="font-semibold">
                            {order_item.product.product_name}
                          </span>
                          <span className="text-xs">
                            Quantity: {order_item.quantity}
                          </span>
                        </div>
                        {/* {order_item.product.product_name} x{' '}
                        <span>{order_item.quantity}</span> */}
                      </span>
                      <span>{`₦${getIndividualItemTotal(order_item).toFixed(2)}`}</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-2" />
                <div className="font-semibold">Price</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      {`₦${getSubTotal(order.order_items).toFixed(2)}`}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₦0.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₦0.00</span>
                  </li>
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    {/* <span>{`₦${getTotal({ items: order.order_items }).toFixed(2)}`}</span> */}
                    <span>{order.total_price}</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <div className="font-semibold">Shipping Information</div>
                  <address className="grid gap-0.5 not-italic text-muted-foreground">
                    <span>{order.billing_address.receipent_name}</span>
                    <span>{order.billing_address.address}.</span>
                    <span>
                      {order.billing_address.state},{' '}
                      {order.billing_address.country}{' '}
                      {order.billing_address.postal_code}
                    </span>
                  </address>
                </div>
                <div className="grid auto-rows-max gap-3">
                  <div className="font-semibold">Billing Information</div>
                  <div className="text-muted-foreground">
                    Same as shipping address
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>
                      {order.user?.first_name} {order.user?.last_name}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>{order.user?.email}</dd>
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Phone</dt>
                    <dd>
                      <a href="tel:">+1 234 567 890</a>
                    </dd>
                  </div> */}
                </dl>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Payment Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <CreditCard className="h-4 w-4" />
                      Visa
                    </dt>
                    <dd>**** **** **** 4532</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="text-xs text-muted-foreground">
              Updated <time dateTime="2023-11-23">November 23, 2023</time>
            </div>
          </CardFooter> */}
          </Card>
        )}
      </div>
    </>
  );
};

export default OrderDetailsPage;
