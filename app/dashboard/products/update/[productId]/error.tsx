'use client';

import NetworkError from '@/container/network-error/NetworkError';
import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const UpdateProductErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  // CATCHES NETWORK ERROR
  if (error.message === 'Network Error' || error.message === 'failed fetch') {
    return <NetworkError retry={reset} />;
  }

  return (
    <>
      <h2>An error occured while loading product to update</h2>
      <span>{error.message}</span>
      <button onClick={() => reset()}>Retry</button>
    </>
  );
};

export default UpdateProductErrorPage;
