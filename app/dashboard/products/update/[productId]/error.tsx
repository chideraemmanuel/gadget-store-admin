'use client';

import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const UpdateProductErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <>
      <h2>An error occured while loading product to update</h2>
      <span>{error.message}</span>
      <button onClick={() => reset()}>Retry</button>
    </>
  );
};

export default UpdateProductErrorPage;
