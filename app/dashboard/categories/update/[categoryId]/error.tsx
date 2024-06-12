'use client';

import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const UpdateCategoryErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <>
      <h2>An error occured while loading category to update</h2>
      <span>{error.message}</span>
      <button onClick={() => reset()}>Retry</button>
    </>
  );
};

export default UpdateCategoryErrorPage;
