'use client';

import { FC, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo/Logo';
import { useForm } from 'react-hook-form';
import useAdminLogin from '@/lib/hooks/useAdminLogin';
import { useRouter } from 'next/navigation';

interface Props {}

interface LoginCredentials {
  email: string;
  password: string;
}

const AdminLoginPage: FC<Props> = () => {
  const form = useForm<LoginCredentials>();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const router = useRouter();

  const { mutate: login, isSuccess, isError } = useAdminLogin();

  //   useEffect(() => {
  //     if (isSuccess) {
  //         router.replace()
  //     }
  //   }, [isSuccess, isError])

  const onSubmit = (credentials: LoginCredentials) => {
    console.log(credentials);
    login(credentials);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <Card className="w-[min(500px,_90%)]">
        <CardHeader className="flex flex-col gap-2 text-center">
          <div className="mx-auto mb-2">
            <Logo />
          </div>
          <CardTitle>Enter credentials to login</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
            soluta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                placeholder="chideraemmanuel01@hotmail.com"
                id="email"
                {...register('email', {
                  required: 'Please enter an email address',
                  // pattern:
                })}
                className={`${errors.email?.message && 'border-red-700'}`}
              />
              <span className="text-xs text-red-700">
                {errors.email?.message}
              </span>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                id="password"
                {...register('password', {
                  required: 'Please enter a password',
                })}
                className={`${errors.password?.message && 'border-red-700'}`}
              />
              <span className="text-xs text-red-700">
                {errors.password?.message}
              </span>
            </div>

            <Button>Login</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
