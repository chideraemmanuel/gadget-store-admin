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
}

const SidebarLink: FC<Props> = ({ href, text, icon }) => {
  const pathname = usePathname();

  // console.log(pathname);

  return (
    <Link
      href={href}
      // className={cn(
      //   `py-4 px-5 block rounded-sm ${
      //     pathname === '/admin/dashboard' ? 'bg-sky-500' : 'bg-red-300'
      //   }`
      // )}
      className={`flex items-center gap-2 py-4 px-5 rounded-sm transition ${
        pathname === `${href}`
          ? 'bg-sky-500 text-white'
          : 'text-gray-400 hover:bg-sky-200'
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default SidebarLink;
