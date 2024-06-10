'use client';

import Logo from '@/components/Logo';
import { Menu, MenuIcon } from 'lucide-react';
import { FC } from 'react';
import profileImage from '../../assets/profile.jpg';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SidebarLink from '@/components/SidebarLink';
import DashboardNavigationLinks from '../dashboard-navigation-links/DashboardNavigationLinks';
import { useAdminLogout } from '@/lib/hooks/useAdminAuth';
import { headers } from '@/constants';
import { usePathname } from 'next/navigation';

interface Props {}

const DashboardHeader: FC<Props> = () => {
  const pathname = usePathname();
  const { refetch: logout, isLoading } = useAdminLogout();

  const header = headers.find((header) => {
    return `${header.href}` === pathname;
  });

  // console.log('header', header);
  // console.log('pathname', pathname);

  // if (isLoading) {
  //   return (
  //     <>
  //       <span>Is Logging Out...</span>
  //     </>
  //   );
  // }

  return (
    <div className="py-6 px-4 border-b-[2px] border-gray-200 flex items-center justify-between sticky top-0 z-10 backdrop-blur-lg bg-white bg-opacity-80">
      <Sheet>
        <SheetTrigger className="block md:hidden">
          <MenuIcon />
        </SheetTrigger>

        <SheetContent side={'left'} className="block md:hidden">
          <SheetHeader>
            <Logo />
            {/* <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription> */}
          </SheetHeader>

          <div className="bg-blue- h-full">
            <DashboardNavigationLinks SheetClose={SheetClose} />
          </div>
        </SheetContent>
      </Sheet>

      <div className="block md:hidden">
        <Logo />
      </div>

      <div className="hidden md:block">
        {/* <h2 className="font-bold text-2xl">Overview</h2> */}
        <h2 className="font-bold text-2xl">{header?.text}</h2>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          {/* <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
