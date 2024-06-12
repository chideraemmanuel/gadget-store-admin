'use client';

import { Button } from '@/components/ui/button';
import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const CategoriesErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <>
      <h2>An error occured while loading categories</h2>
      <span>{error.message}</span>
      <Button onClick={() => reset()}>Retry</Button>
    </>
  );
};

export default CategoriesErrorPage;
