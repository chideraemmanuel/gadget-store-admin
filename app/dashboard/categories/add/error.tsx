'use client';

import { Button } from '@/components/ui/button';
import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const CategoryCreationErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <>
      <h2>An error occured while loading category creation page</h2>
      <span>{error.message}</span>
      <Button onClick={() => reset()}>Retry</Button>
    </>
  );
};

export default CategoryCreationErrorPage;
