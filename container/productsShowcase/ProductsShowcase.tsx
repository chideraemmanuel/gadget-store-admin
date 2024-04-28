'use client';

import ProductCard from '@/components/productCard/ProductCard';
import { FC } from 'react';
import phone from '@/assets/phone.png';
import { ProductsReturnTypes, useGetProducts } from '@/lib/hooks/useProduct';

interface Props {
  products?: ProductsReturnTypes[];
  isLoading?: boolean;
  isError?: boolean;
}

const ProductsShowcase: FC<Props> = ({ products, isLoading, isError }) => {
  // const {
  //   data: products,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   error,
  // } = useGetProducts();

  // console.log(error);

  return (
    <>
      {isLoading && (
        <div className="w-full h-[75vh] flex items-center justify-center">
          Loading...
        </div>
      )}

      {isError && (
        <div className="w-full h-[75vh] flex items-center justify-center">
          An error occured while fetching products
        </div>
      )}

      {products?.length === 0 && (
        <div className="w-full h-[75vh] flex items-center justify-center">
          No products to display.
        </div>
      )}

      {products && (
        <div className="px-4 grid md:grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]  grid-cols-[repeat(auto-fill,_minmax(165px,_1fr))] gap-4">
          {products?.map((product, index) => (
            <ProductCard
              key={product._id}
              // imageSrc={product.product_image}
              // name={product.product_name}
              product_name={product.product_name}
              product_image={product.product_image}
              description={product.description}
              price={product.price}
              // brand={product.brand}
              // category={product.category}
              featured={product.featured}
              // count_in_stock={product.count_in_stock}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsShowcase;
