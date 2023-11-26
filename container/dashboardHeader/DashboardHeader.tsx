import Logo from '@/components/logo/Logo';
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

import SidebarLink from '@/components/sidebarLink/SidebarLink';
import DashboardNavLinks from '../dashboardNavLinks/DashboardNavLinks';

interface Props {}

const DashboardHeader: FC<Props> = () => {
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
            <DashboardNavLinks />
          </div>
        </SheetContent>
      </Sheet>

      <div className="block md:hidden">
        <Logo />
      </div>

      <div className="hidden md:block">
        <h2 className="font-bold text-2xl">Overview</h2>
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
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
