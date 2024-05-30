'use client';

import { headers } from '@/constants';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const MobileDashboardHeader: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  const header = headers.find((header) => {
    return `/admin${header.href}` === pathname;
  });

  return (
    <div className="pt-6 pb-8">
      <div className="block md:hidden">
        <h2 className="font-bold text-2xl pb-5">{header?.text}</h2>
      </div>

      {children}
    </div>
  );
};

export default MobileDashboardHeader;
