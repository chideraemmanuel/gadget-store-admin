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
import { Github } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';

interface Props {}

const AdminLoginForm: FC<Props> = () => {
  // const form = useForm()

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
          <form action="" className="">
            <div className=" flex flex-col gap-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input placeholder="e.g johndoe@email.com" id="email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input placeholder="Enter your password" id="password" />
                <Button
                  type="button"
                  variant={'link'}
                  asChild
                  className="flex justify-end h-auto px-0 py-0 pt-2 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Link href={'/auth/reset-password/initiate'}>
                    Forgot password?
                  </Link>
                </Button>
              </div>

              <Button className="w-full">Login</Button>
            </div>
          </form>

          <FormBreak />

          <Button variant="outline" className="bg-transparent" asChild>
            <Link
              // href={generateGoogleOauthUrl()}
              href={'/'}
              className="flex items-center gap-2"
            >
              {/* <FcGoogle /> */}
              <Github />
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

// TODO: update password fields to use type password
