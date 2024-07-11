'use client';

import {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  forwardRef,
  useState,
} from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { UploadIcon } from 'lucide-react';
import Image from 'next/image';
import phone from '@/assets/phone.png';
// import phone from '@/assets/p3.webp';
import { cn } from '@/lib/utils';

interface ImageInputProps extends ComponentPropsWithoutRef<typeof Input> {
  label?: string;
  error?: string;
  defaultImage?: string;
}

type ImageInputRef = ElementRef<typeof Input>;

const ImageInput = forwardRef<ImageInputRef, ImageInputProps>(
  (
    { label, defaultImage, error, className, disabled, onChange, ...props },
    ref
  ) => {
    const [selectedImage, setSelectedImage] = useState<undefined | string>(
      undefined
    );

    return (
      <>
        <div className="w-full">
          {/* <div> */}
          <Label className="w-full">
            <span className={`${disabled && 'pointer-events-none'}`}>
              {label}
            </span>

            <Input
              type="file"
              className="hidden"
              ref={ref}
              disabled={disabled}
              onChange={(e) => {
                console.log('selected image File:', e.target.files);
                console.log('selected image value:', e.target.value);

                setSelectedImage(e.target.files?.[0].name);

                if (onChange) {
                  onChange(e);
                }
              }}
              {...props}
            />

            <Card
              // className="w-full h-40 cursor-pointer relative flex justify-center items-center p-5"
              className={cn(
                'w-full h-40 cursor-pointer relative flex justify-center items-center p-5',
                error && 'border-destructive',
                disabled && 'cursor-not-allowed',
                className
              )}
            >
              {defaultImage && !selectedImage && (
                <Image
                  src={defaultImage}
                  // src={phone}
                  alt={label || ''}
                  width={1000}
                  height={1000}
                  className="max-h-full w-auto"
                />
              )}

              <div className="flex flex-col justify-center items-center gap-2 absolute top-0 left-0 w-full h-full bg-accent/40">
                {/* bg-accent/70 dark:bg-accent/40"> */}
                <UploadIcon className="w-7 h-7" />
                {/* <UploadIcon /> */}
                <span className="text-xs max-w-[80%] text-center mx-auto">
                  {/* {selectedImage || 'No Image Selected'} */}
                  {defaultImage
                    ? selectedImage || ''
                    : selectedImage || 'No Image Selected'}
                </span>
              </div>
            </Card>
          </Label>

          <span className="text-xs text-destructive">{error}</span>
          {/* </div> */}
        </div>
      </>
    );
  }
);

export default ImageInput;

// [&:checked+label]:bg-[#bfb]
