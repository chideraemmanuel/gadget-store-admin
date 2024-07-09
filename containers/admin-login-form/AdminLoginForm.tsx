'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginCredentialsTypes } from '@/types';
import { Github } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import useLoginAdmin from '@/lib/hooks/auth/useLoginAdmin';
import FormInput from '@/components/FormInput';
// import { DevTool } from '@hookform/devtools';

interface Props {}

const AdminLoginForm: FC<Props> = () => {
  const form = useForm<LoginCredentialsTypes>();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,5})(\.[a-z]{2,5})?$/;

  const { mutate: login, isSuccess, isError, isLoading } = useLoginAdmin();

  const onSubmit = (credentials: LoginCredentialsTypes) => {
    console.log(credentials);
    login(credentials);
  };

  return (
    <>
      {/* <Form {...form}> */}
      <Card className="shadow-md lg:shadow-none lg:bg-transparent lg:border-none lg:dark:border-none  lg:dark:bg-transparent dark:bg-slate-900 py-3">
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio
            a, veritatis rem ratione qui explicabo!
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" flex flex-col gap-3">
              <FormInput
                label="Email"
                placeholder="e.g johndoe@email.com"
                id="email"
                {...register('email', {
                  required: 'Please enter an email address',
                  pattern: {
                    value: emailRegex,
                    message: 'Invalid email format',
                  },
                })}
                disabled={isLoading}
                error={errors.email?.message}
              />

              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                id="password"
                {...register('password', {
                  required: 'Please enter a password',
                })}
                disabled={isLoading}
                error={errors.password?.message}
                addForgotPassword
              />

              <Button
                className="w-full flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading && <div className="spinner"></div>}
                <span>Login</span>
              </Button>
            </div>
          </form>

          <FormBreak />

          <Button
            variant="outline"
            className="bg-transparent"
            disabled={isLoading}
            asChild
          >
            <Link
              // href={generateGoogleOauthUrl()}
              href={'#'}
              className="flex items-center gap-2"
            >
              <FcGoogle />
              <span>Login in with google</span>
            </Link>
          </Button>
        </CardContent>

        {/* <CardFooter className="text-center w-[90%] md:w-[80%] lg:w-[70%] mx-auto">
          <p className="text-muted-foreground text-sm w-full">
            By clicking continue, you agree to our{' '}
            <Link href={'/'} className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href={'/'} className="underline">
              Privacy policy
            </Link>
          </p>
        </CardFooter> */}
      </Card>
      {/* </Form> */}
    </>
  );
};

export default AdminLoginForm;

const FormBreak: FC = () => {
  return (
    <div className="relative w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div className="bg-border h-[1px]"></div>
      <span className="text-muted-foreground">or</span>
      <div className="bg-border h-[1px]"></div>
    </div>
  );
};
