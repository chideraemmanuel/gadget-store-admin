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
import { Textarea } from './ui/textarea';

interface TextareaInputProps extends ComponentPropsWithoutRef<typeof Textarea> {
  label?: string;
  error?: string;
}

type TextareaInputRef = ElementRef<typeof Textarea>; //HTMLInputElement

const TextareaInput = React.forwardRef<TextareaInputRef, TextareaInputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <>
        <div className="w-full">
          <Label htmlFor={id}>{label}</Label>
          <Textarea
            id={id}
            className={cn(`${error && 'border-destructive'}`, className)}
            ref={ref}
            {...props}
          />

          <span className="text-xs text-destructive">{error}</span>
        </div>
      </>
    );
  }
);

export default TextareaInput;
