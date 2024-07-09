'use client';

import { Button } from '@/components/ui/button';
import { FC } from 'react';
import networkErrorImage from '@/assets/no-result.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {}

const NetworkError: FC<Props> = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center gap-7 min-h-[calc(100vh-70px)] container mx-auto p-10">
      <div className="max-w-[300px] h-auto">
        <Image
          src={networkErrorImage}
          alt=""
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-3 text-center">
        <h2 className="font-bold text-2xl md:3xl">Network Error</h2>

        <p className="text-muted-foreground w-[90%] mx-auto">
          Please check your internet connection and try again
        </p>

        <Button onClick={() => router.refresh()} className="w-[200px] mx-auto">
          Retry
        </Button>
      </div>
    </div>
  );
};

export default NetworkError;
