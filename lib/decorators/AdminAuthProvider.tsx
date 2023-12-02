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
  const { splashScreenActive } = useSelector(
    (store: StoreTypes) => store.splashScreen
  );

  const { data, isLoading, isFetching, error, isError, isSuccess, refetch } =
    useGetCurrentAdmin();

  useEffect(() => {
    dispatch(setAdmin(data));
  }, [data]);

  if (isError) {
    router.replace('/admin/auth/login');
    return;
  }

  if (isLoading || splashScreenActive) {
    return (
      <>
        <span>Loading...</span>
      </>
    );
  }

  return <>{isSuccess && !isLoading && data && children}</>;
};

export default AdminAuthProvider;
