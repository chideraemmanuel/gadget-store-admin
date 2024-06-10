import Logo from '@/components/Logo';
import NavigationLink from '@/components/NavigationLink';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import NavigationLinks from '../navigation-links/NavigationLinks';

interface Props {}

const Sidebar: FC<Props> = () => {
  return (
    // <div className="h-full fixed w-[min(270px,_30vw)] hidden md:block bg-slate-100 border-r-[2px] border-gray-200">
    <div className="fixed top-[70px] bottom-0 w-[min(270px,_30vw)] h-full hidden md:block bg-accent dark:bg-background px-4 border-r-[1px]">
      <NavigationLinks />
    </div>
  );
};

export default Sidebar;

// TODO: add overflow: scroll to div and style scrollbar
