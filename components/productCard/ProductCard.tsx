import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { ProductReturnTypes } from '@/lib/hooks/useProduct';

interface Props {
  // imageSrc: string;
  // name: string;
  // description: string;
  product_name: string;
  product_image: string;
  description: string;
  price: number;
  featured: boolean;
}

const ProductCard: FC<Props> = ({
  product_name,
  product_image,
  description,
  price,
  featured,
}) => {
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      <CardHeader>
        <img src={product_image} alt={product_name} />
      </CardHeader>

      <CardContent>
        <div className="flex md:flex-row flex-col md:justify-between justify-stretch md:items-center items-stretch pb-3">
          <span>Rating H!</span>
          <span className="font-semibold">${price}</span>
        </div>

        <div className="">
          <CardTitle className="font-bold pb-1 leading-7">
            {product_name}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter>
        {featured ? (
          <Button variant={'secondary'}>Remove from featured</Button>
        ) : (
          <Button>Add to featured</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
