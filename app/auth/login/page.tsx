'use client';

import { FC } from 'react';
import AdminLoginForm from '@/containers/admin-login-form/AdminLoginForm';

interface Props {}

const AdminLoginPage: FC<Props> = () => {
  return (
    <>
      {/* <Button
        asChild
        variant={'outline'}
        className="absolute top-6 right-6 z-50 bg-transparent"
      >
        <Link href={'/auth/register'}>Sign up</Link>
      </Button> */}

      <div className="relative z-10 w-[min(90%,_600px)] pt-20">
        <AdminLoginForm />
      </div>
    </>
  );
};

export default AdminLoginPage;
