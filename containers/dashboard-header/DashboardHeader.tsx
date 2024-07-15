'use client';

import Logo from '@/components/Logo';
import { LogOut, Menu, MenuIcon, User2 } from 'lucide-react';
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
import { headers } from '@/constants';
import { usePathname } from 'next/navigation';
import MobileNavigationMenu from '../mobile-navigation-menu/MobileNavigationMenu';
import { Separator } from '@/components/ui/separator';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Skeleton } from '@/components/ui/skeleton';
import useGetCurrentAdmin from '@/lib/hooks/auth/useGetCurrentAdmin';
import useLogoutAdmin from '@/lib/hooks/auth/useLogoutAdmin';
import FullScreenLoader from '@/components/FullScreenLoader';

interface Props {}

const DashboardHeader: FC<Props> = () => {
  // const pathname = usePathname();

  const { data: admin, isLoading: isGettingCurrentAdmin } =
    useGetCurrentAdmin();
  const { mutate: logout, isLoading: isLoggingOut } = useLogoutAdmin();

  // const header = headers.find((header) => {
  //   return `${header.href}` === pathname;
  // });

  // console.log('header', header);
  // console.log('pathname', pathname);

  const getInitials = (firstName: string, lastName: string) => {
    const firstNameInitial = firstName.charAt(0);
    const lastNameInitial = lastName.charAt(0);

    return `${firstNameInitial}${lastNameInitial}`;
  };

  // if (isLoggingOut) {
  //   return <FullScreenLoader />
  // }

  return (
    <>
      {isLoggingOut && <FullScreenLoader />}

      <header className="sticky top-0 z-20 backdrop-blur-lg bg-background bg-opacity-80">
        <div className="h-[70px] flex items-center justify-between px-8">
          <MobileNavigationMenu />

          <div>
            <Logo />
          </div>

          <div className="flex items-center gap-3">
            <ThemeSwitcher />

            <DropdownMenu>
              {isGettingCurrentAdmin && (
                <Skeleton className="relative flex shrink-0 h-10 w-10 rounded-full" />
              )}

              {admin && (
                <DropdownMenuTrigger>
                  <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarImage src="" />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                    <AvatarFallback>
                      {getInitials(admin?.first_name, admin?.last_name)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
              )}

              <DropdownMenuContent className="mr-4">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  // onClick={() => logout()}
                >
                  <User2 className="h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator />
      </header>
    </>
  );
};

export default DashboardHeader;
