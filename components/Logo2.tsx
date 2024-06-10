import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {}

const Logo: FC<Props> = () => {
  return (
    <>
      <Link href={'/'} className="flex items-center gap-1">
        <ShoppingCart />
        <span>Ecommerce</span>
      </Link>
    </>
  );
};

export default Logo;
