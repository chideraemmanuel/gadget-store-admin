import { OrderItemTypes } from '@/types';

export const getSubTotal = (items: OrderItemTypes[]) => {
  let subTotal = 0;

  items.forEach((item) => {
    subTotal = subTotal + item.product.price * item.quantity;
  });

  return subTotal;
};

export const getIndividualItemTotal = (item: OrderItemTypes) => {
  return item.product.price * item.quantity;
};
