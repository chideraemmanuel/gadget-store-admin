import Logo from '@/components/Logo';
import SidebarLink from '@/components/SidebarLink';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import DashboardNavigationLinks from '../dashboard-navigation-links/DashboardNavigationLinks';

interface Props {}

const Sidebar: FC<Props> = () => {
  return (
    <div className="h-full fixed w-[min(270px,_30vw)] hidden md:block bg-slate-100 border-r-[2px] border-gray-200">
      <div className="py-7 px-4">
        <Logo />
      </div>

      <div className="px-4 h-full">
        <DashboardNavigationLinks />
      </div>
    </div>
  );
};

export default Sidebar;
