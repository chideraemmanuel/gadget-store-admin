import { ActivityIcon, ShoppingBagIcon } from 'lucide-react';

export const DASHBOARD_NAVIGATION_LINKS = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: ActivityIcon,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: ShoppingBagIcon,
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingBagIcon,
  },
];
