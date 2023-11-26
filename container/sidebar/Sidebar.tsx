import Logo from '@/components/logo/Logo';
import SidebarLink from '@/components/sidebarLink/SidebarLink';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import DashboardNavLinks from '../dashboardNavLinks/DashboardNavLinks';

interface Props {}

const Sidebar: FC<Props> = () => {
  return (
    <div className="h-full fixed w-[min(270px,_30vw)] hidden md:block bg-slate-100 border-r-[2px] border-gray-200">
      <div className="py-7 px-4">
        <Logo />
      </div>

      <div className="px-4 h-full">
        <DashboardNavLinks />
      </div>
    </div>
  );
};

export default Sidebar;
