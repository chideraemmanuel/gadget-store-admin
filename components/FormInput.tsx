'use client';

import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  useState,
} from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FormInputProps extends ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  error?: string;
  addForgotPassword?: boolean;
}

type FormInputRef = ElementRef<typeof Input>; //HTMLInputElement

const FormInput = React.forwardRef<FormInputRef, FormInputProps>(
  ({ label, error, id, type, className, addForgotPassword, ...props }, ref) => {
    const [currentType, setCurrentType] = useState(type);

    return (
      <>
        <div className="w-full">
          <Label htmlFor={id}>{label}</Label>
          <div className="relative">
            <Input
              id={id}
              type={type === 'password' ? currentType : type}
              className={cn(`${error && 'border-destructive'}`, className)}
              ref={ref}
              {...props}
            />

            {type === 'password' && (
              <Button
                type="button"
                variant={'secondary'}
                className="h-fit w-fit p-0 bg-transparent hover:bg-transparent focus:bg-transparent absolute right-3 top-[50%] -translate-y-1/2"
                aria-description={`Toggle ${label}`}
                onClick={() =>
                  setCurrentType((previous) =>
                    previous === 'password' ? 'text' : 'password'
                  )
                }
              >
                {currentType === 'password' ? (
                  <EyeIcon className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
                )}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-destructive">{error}</span>

            {type === 'password' && addForgotPassword && (
              <Button
                type="button"
                variant={'link'}
                asChild
                className="flex justify-end h-fit px-0 py-0 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Link href={'/auth/reset-password/initiate'}>
                  Forgot password?
                </Link>
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default FormInput;
