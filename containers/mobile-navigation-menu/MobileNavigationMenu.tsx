import { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Logo from '@/components/Logo';
import NavigationLinks from '../navigation-links/NavigationLinks';

interface Props {}

const MobileNavigationMenu: FC<Props> = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="block md:hidden">
          <Button variant="ghost" size="sm" className="lg:hidden px-1 sm:px-2">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side={'left'} className="block md:hidden">
          <SheetHeader>
            <div className="flex justify-start">
              <Logo />
            </div>
          </SheetHeader>

          <div className="h-full py-3">
            <NavigationLinks mobile={true} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavigationMenu;
