import NavigationLink from '@/components/NavigationLink';
import { DASHBOARD_NAVIGATION_LINKS } from '@/constants';
import { FC } from 'react';

// import { SheetClose } from '@/components/ui/sheet';

interface Props {
  mobile?: boolean;
}

const NavigationLinks: FC<Props> = ({ mobile }) => {
  return (
    <ul className="flex flex-col gap-1 h-full pt-3 md:pb-20 pb-10">
      {DASHBOARD_NAVIGATION_LINKS.map((link, index) => (
        <NavigationLink
          href={`${link.href}`}
          text={link.title}
          icon={<link.icon />}
          key={index}
          mobile={mobile}
        />
      ))}
    </ul>
  );
};

export default NavigationLinks;
