'use client';

import Logo from '@/components/Logo';
// import ThemeSwitcher from '@/components/ThemeSwitcher';
import Image from 'next/image';
import { FC } from 'react';
import networkErrorImage from '@/assets/no-result.svg';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import FullScreenLoader from '@/components/FullScreenLoader';

interface Props {}

const GlobalNetworkError: FC<Props> = () => {
  const router = useRouter();

  return (
    <>
      {/* {true && <FullScreenLoader />} */}

      <div className="fixed top-0 left-0 right-0 min-w-screen min-h-screen bg-background z-50 flex flex-col justify-center items-center gap-7 mx-auto py-10 px-7">
        <div className="absolute top-6 container flex justify-between items-center">
          <Logo />
          {/* <ThemeSwitcher /> */}
        </div>

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

          <Button
            onClick={() => router.refresh()}
            className="w-[200px] mx-auto"
          >
            Retry
          </Button>
        </div>
      </div>
    </>
  );
};

export default GlobalNetworkError;
