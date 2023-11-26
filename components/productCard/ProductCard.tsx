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

interface Props {
  imageSrc: string;
  name: string;
  description: string;
}

const ProductCard: FC<Props> = ({ imageSrc, name, description }) => {
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
        <img src={imageSrc} alt={name} />
      </CardHeader>

      <CardContent>
        <div className="flex md:flex-row flex-col md:justify-between justify-stretch md:items-center items-stretch pb-3">
          <span>Rating H!</span>
          <span className="font-semibold">$799.00</span>
        </div>

        <div className="">
          <CardTitle className="font-bold pb-1 leading-7">{name}</CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </div>
      </CardContent>

      <CardFooter>
        <Button>Add to featured</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
