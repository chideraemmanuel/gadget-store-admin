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
    title: 'Categories',
    href: '/dashboard/categories',
    icon: ActivityIcon,
  },
  {
    title: 'Brands',
    href: '/dashboard/brands',
    icon: ActivityIcon,
  },
  {
    title: 'Billboards',
    href: '/dashboard/billboards',
    icon: ActivityIcon,
  },
  {
    title: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingBagIcon,
  },
];

export const headers = [
  {
    href: '/dashboard',
    text: 'Overview',
  },
  {
    href: '/dashboard/products',
    text: 'Products',
  },
  {
    href: '/dashboard/products/add',
    text: 'Add Product',
  },
  {
    href: '/dashboard/products/update',
    text: 'Update Product',
  },
  {
    href: '/dashboard/categories',
    text: 'Categories',
  },
  {
    href: '/dashboard/categories/add',
    text: 'Add Category',
  },
  {
    href: '/dashboard/categories/update',
    text: 'Update Category',
  },
  {
    href: '/dashboard/brands',
    text: 'Brands',
  },
  {
    href: '/dashboard/brands/add',
    text: 'Add Brand',
  },
  {
    href: '/dashboard/brands/update',
    text: 'Update Brand',
  },
  {
    href: '/dashboard/billboards',
    text: 'Billboards',
  },
  {
    href: '/dashboard/billboards/add',
    text: 'Add Billboard',
  },
  {
    href: '/dashboard/billboards/update',
    text: 'Update Billboard',
  },
  {
    href: '/dashboard/orders',
    text: 'Orders',
  },
];
