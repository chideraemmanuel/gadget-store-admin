import ProductCard from '@/components/productCard/ProductCard';
import { FC } from 'react';
import phone from '@/assets/phone.png';

interface Props {}

const ProductsShowcase: FC<Props> = () => {
  return (
    <div className="px-4 grid md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]  grid-cols-[repeat(auto-fill,_minmax(165px,_1fr))] gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((card, index) => (
        <ProductCard
          key={index}
          imageSrc={phone.src}
          name="Iphone 13 Pro"
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum dolor suscipit perferendis illo tempora impedit nostrum consectetur iste soluta delectus? Modi cupiditate, ea excepturi nesciunt officia cumque sed eum tempora."
        />
      ))}
    </div>
  );
};

export default ProductsShowcase;
