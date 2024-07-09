import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from 'react';
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
  ({ label, defaultImage, error, className, disabled, ...props }, ref) => {
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
              {defaultImage && (
                <Image
                  src={defaultImage}
                  // src={phone}
                  alt={label || ''}
                  width={1000}
                  height={1000}
                  className="max-h-full w-auto"
                />
              )}

              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center">
                <UploadIcon className="w-7 h-7" />
                {/* <UploadIcon /> */}
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
