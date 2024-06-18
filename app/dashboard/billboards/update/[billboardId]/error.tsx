'use client';

import { Button } from '@/components/ui/button';
import NetworkError from '@/container/network-error/NetworkError';
import ServerError from '@/container/server-error/ServerError';
import { ErrorPageProps } from '@/types';
import { FC } from 'react';

const UpdateBillboardErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
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
      <h2>An error occured while loading billboard to update</h2>
      <span>{error.message}</span>
      <Button onClick={() => reset()}>Retry</Button>
    </>
  );
};

export default UpdateBillboardErrorPage;
