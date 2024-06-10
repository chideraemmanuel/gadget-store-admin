'use client';

import { headers } from '@/constants';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface Props {}

const DashboardHeaderText: FC<Props> = () => {
  const pathname = usePathname();

  const header = headers.find((header) => {
    return `${header.href}` === pathname;
  });

  return (
    <div className="pt-6 pb-8">
      <h2 className="font-bold text-2xl">{header?.text}</h2>
    </div>
  );
};

export default DashboardHeaderText;
