'use client';

import { FC, useEffect } from 'react';
import useGetCurrentAdmin from '../hooks/useGetCurrentAdmin';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { StoreTypes } from '@/redux/store';
import { setAdmin } from '@/redux/slices/authSlice';

interface Props {
  children: React.ReactNode;
}

const AdminAuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { admin } = useSelector((store: StoreTypes) => store.auth);

  const { data, isLoading, isFetching, error, isError, isSuccess, refetch } =
    useGetCurrentAdmin();

  console.log('error', error);
  console.log('isError', isError);
  console.log('data', data);
  console.log('admin', admin);

  useEffect(() => {
    if (!admin) {
      const getAdmin = async () => {
        await refetch();

        dispatch(setAdmin(data));
      };

      console.log('get admin');
      getAdmin();
    }

    if (isError) {
      console.log('isError! Supposed to route!');
      router.replace('/admin/auth/login');
      return;
    }
  }, [admin, error, isError, isSuccess, data]);

  // if (isError) {
  //   router.replace('/admin/login');
  //   return;
  // }

  if (isLoading) {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  }

  return <>{isSuccess && !isLoading && data && children}</>;
};

export default AdminAuthProvider;
