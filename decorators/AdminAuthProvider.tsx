'use client';

import { FC, useEffect } from 'react';
import useGetCurrentAdmin from '../lib/hooks/auth/useGetCurrentAdmin ';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { setAdmin } from '@/redux/slices/authSlice';
import { getCurrentAdminOnServer } from '@/lib/actions/auth';

interface Props {
  children: React.ReactNode;
}

const AdminAuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();

  const {
    data: admin,
    isLoading,
    error,
    isError,
    isSuccess,
    refetch,
  } = useGetCurrentAdmin();

  useEffect(() => {
    // IF ERROR IS A NETWORK ERROR, THROW ERROR (WILL BE CAUGHT BY ERROR.TSX IN ROOT)
    if (error?.message === 'Network Error') {
      console.log('network error');
      throw new Error('Network Error');
    }

    if (
      error?.response?.data?.error === 'Internal Server Error' ||
      error?.response?.status === 500
    ) {
      console.log('server error');
      throw new Error('Internal Server Error');
    }

    // NAVIGATE TO LOGIN PAGE IF SERVER SENDS BACK AN ERROR (USER NOT AUTHENTICATED)
    if (error) {
      router.replace('/auth/login');
    }
  }, [error]);

  // if (isLoading) {
  //   return (
  //     <>
  //       <span>Loading...</span>
  //     </>
  //   );
  // }

  // A PROPER AXIOS ERROR MESSAGE ISN'T SENT TO ERROR.TSX (NEXT.JS STRIPS SENSITIVE ERROR MESSAGES IT ON PURPOSE), THEREFORE, A VALID ERROR PAGE TO DISPLAY CANNOT BE DETERMINED IF FETCHED WITH AXIOS ON THE SERVER
  // await getCurrentAdminOnServer();

  // RENDER CHILDREN ONLY WHEN FETCH IS SUCCESSFUL
  return <>{isSuccess && !isLoading && admin && children}</>;
  // return <>{children}</>;
};

export default AdminAuthProvider;
