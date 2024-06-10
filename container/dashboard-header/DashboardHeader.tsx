'use client';

import Logo from '@/components/Logo';
import { Menu, MenuIcon } from 'lucide-react';
import { FC } from 'react';
import profileImage from '../../assets/profile.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import NavigationLink from '@/components/NavigationLink';
import NavigationLinks from '../navigation-links/NavigationLinks';
import { useAdminLogout } from '@/lib/hooks/useAdminAuth';
import { headers } from '@/constants';
import { usePathname } from 'next/navigation';
import MobileNavigationMenu from '../mobile-navigation-menu/MobileNavigationMenu';
import { Separator } from '@/components/ui/separator';

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
    <>
      <header className="sticky top-0 z-20 backdrop-blur-lg bg-background bg-opacity-80">
        <div className="h-[70px] flex items-center justify-between px-8">
          <MobileNavigationMenu />

          <div>
            <Logo />
          </div>

          {/* <div className="hidden md:block">
        <h2 className="font-bold text-2xl">{header?.text}</h2>
      </div> */}

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
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />
      </header>
    </>
  );
};

export default DashboardHeader;
