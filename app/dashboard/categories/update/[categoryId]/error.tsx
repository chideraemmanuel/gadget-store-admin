'use client';

import NetworkError from '@/container/network-error/NetworkError';
import ServerError from '@/container/server-error/ServerError';
import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const UpdateCategoryErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  // CATCHES NETWORK ERROR
  if (error.message === 'Network Error' || error.message === 'failed fetch') {
    return <NetworkError retry={reset} />;
  }

  // CATCHES SERVER ERROR
  if (error.message === 'Internal Server Error') {
    return <ServerError retry={reset} />;
  }

  return (
    <>
      <h2>An error occured while loading category to update</h2>
      <span>{error.message}</span>
      <button onClick={() => reset()}>Retry</button>
    </>
  );
};

export default UpdateCategoryErrorPage;
