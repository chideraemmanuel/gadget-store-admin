'use client';

import { Button } from '@/components/ui/button';
import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const ProductsErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <>
      <h2>An error occured while loading products</h2>
      <span>{error.message}</span>
      <Button onClick={() => reset()}>Retry</Button>
    </>
  );
};

export default ProductsErrorPage;
