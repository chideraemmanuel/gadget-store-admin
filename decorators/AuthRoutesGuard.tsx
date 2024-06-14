'use client';

import { getCurrentAdminOnServer } from '@/lib/actions/auth';
import useGetCurrentAdminOnClient from '@/lib/hooks/auth/useGetCurrentAdminOnClient';
import { redirect, useRouter } from 'next/navigation';
import { FC, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthRoutesGuard: FC<Props> = ({ children }) => {
  const router = useRouter();

  const {
    data: admin,
    isLoading,
    isError,
    error,
  } = useGetCurrentAdminOnClient();

  // console.log('error:', error);

  useEffect(() => {
    // NAVIGATE TO DASHBOARD IF FETCH IS SUCCESSFUL (AN ADMIN IS LOGGED IN)
    if (admin) {
      console.log('redirect from auth routes guard');
      router.replace('/dashboard');
    }

    // IF ERROR IS A NETWORK ERROR, THROW ERROR (WILL BE CAUGHT BY ERROR.TSX IN ROOT)
    if (error?.message === 'Network Error') {
      console.log('network error');
      throw new Error('Network Error');
    }
  }, [admin, error]);

  // if (isLoading) {
  //   return <div>Loadingggg</div>;
  // }

  // ONLY RENDER AUTH PAGE IF SERVER SENDS BACK ERROR (USER NOT AUTHENTICATED), OTHERWISE, PAGE WILL BE REDIRECTED (FROM USE EFFECT)
  return (
    <>
      {!admin &&
        !isLoading &&
        isError &&
        error?.message !== 'Network Error' &&
        children}
    </>
  );
};

export default AuthRoutesGuard;
