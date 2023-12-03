'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface Props {
  href: string;
  text: string;
  icon: React.ReactNode;
  SheetClose?: any;
}

const SidebarLink: FC<Props> = ({ href, text, icon, SheetClose }) => {
  const pathname = usePathname();

  // console.log(pathname);

  return (
    <>
      {SheetClose ? (
        <SheetClose asChild>
          <Link
            href={href}
            className={`flex items-center gap-2 py-4 px-5 rounded-sm transition ${
              pathname === `${href}`
                ? 'bg-slate-900 text-white'
                : 'text-gray-400 hover:bg-slate-300 hover:text-slate-700'
            }`}
          >
            {icon}
            <span>{text}</span>
          </Link>
        </SheetClose>
      ) : (
        <Link
          href={href}
          className={`flex items-center gap-2 py-4 px-5 rounded-sm transition ${
            pathname === `${href}`
              ? 'bg-slate-900 text-white'
              : 'text-gray-400 hover:bg-slate-300 hover:text-slate-700'
          }`}
        >
          {icon}
          <span>{text}</span>
        </Link>
      )}
    </>
  );
};

export default SidebarLink;
