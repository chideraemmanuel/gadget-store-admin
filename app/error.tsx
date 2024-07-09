'use client';

import { Button } from '@/components/ui/button';
import GlobalNetworkError from '@/containers/network-error/GlobalNetworkError';
import NetworkError from '@/containers/network-error/NetworkError';
import GlobalServerError from '@/containers/server-error/GlobalServerError';
import ServerError from '@/containers/server-error/ServerError';
import { ErrorPageProps } from '@/types';
import { redirect, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

const RootErrorPage: FC<ErrorPageProps> = ({ error, reset }) => {
  //   console.log('error name:', error.name);
  //   console.log('error cause:', error.cause);
  //   console.log('error stack:', error.stack);

  console.log('from erro page', error);

  const router = useRouter();

  // if (
  //   error.message === 'Unauthorized' ||
  //   error.message === 'Forbidden' ||
  //   error.message === 'Not found'
  // ) {
  //   console.log('will redirect');
  //   router.replace('/auth/login');
  //   return;
  // }

  // CATCHES NETWORK ERROR
  if (error.message === 'Network Error' || error.message === 'failed fetch') {
    return <GlobalNetworkError retry={reset} />;
  }

  // CATCHES SERVER ERROR
  if (error.message === 'Internal Server Error') {
    return <GlobalServerError retry={reset} />;
  }

  return (
    <>
      <div>
        <h2>An error occured in the application</h2>
        <span>{error.message}</span>
        <Button onClick={() => reset()}>Retry</Button>
      </div>
    </>
  );
};

export default RootErrorPage;
