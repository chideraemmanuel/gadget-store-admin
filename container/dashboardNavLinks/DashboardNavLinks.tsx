import SidebarLink from '@/components/sidebarLink/SidebarLink';
import { DASHBOARD_NAVIGATION_LINKS } from '@/constants';
import { FC } from 'react';

// import { SheetClose } from '@/components/ui/sheet';

interface Props {
  SheetClose?: any;
}

const DashboardNavLinks: FC<Props> = ({ SheetClose }) => {
  return (
    <div className="flex flex-col gap-1 h-full overflow-scroll pt-6 md:pb-20 pb-10 nav-links sidebar-links">
      {DASHBOARD_NAVIGATION_LINKS.map((link, index) => (
        <SidebarLink
          href={`/admin${link.href}`}
          text={link.title}
          icon={<link.icon />}
          key={index}
          SheetClose={SheetClose}
        />
      ))}
    </div>
  );
};

export default DashboardNavLinks;
