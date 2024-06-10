'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { SheetClose } from '@/components/ui/sheet';

interface Props {
  href: string;
  text: string;
  icon: React.ReactNode;
  mobile?: boolean;
}

const NavigationLink: FC<Props> = ({ href, text, icon, mobile }) => {
  const pathname = usePathname();

  // console.log(pathname);

  return (
    <li>
      {mobile ? (
        <SheetClose asChild>
          <Link
            href={href}
            className={`flex items-center gap-2 py-3 px-3 rounded-md transition-colors ${
              pathname === `${href}`
                ? 'bg-primary/30'
                : 'text-muted-foreground hover:bg-primary/10 hover:text-secondary-foreground'
            }`}
          >
            {icon}
            <span>{text}</span>
          </Link>
        </SheetClose>
      ) : (
        <Link
          href={href}
          className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${
            pathname === `${href}`
              ? 'bg-primary/30'
              : 'text-muted-foreground hover:bg-primary/10 hover:text-secondary-foreground'
          }`}
        >
          {icon}
          <span>{text}</span>
        </Link>
      )}
    </li>
  );
};

export default NavigationLink;
