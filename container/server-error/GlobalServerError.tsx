import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { FC } from 'react';
import errorImage from '@/assets/error.svg';
import Logo from '@/components/Logo';
import ThemeSwitcher from '@/components/ThemeSwitcher';

interface Props {
  retry: () => void;
}

const GlobalServerError: FC<Props> = ({ retry }) => {
  return (
    <div className="fixed top-0 left-0 right-0 min-w-screen min-h-screen bg-background z-50 flex flex-col justify-center items-center gap-7 mx-auto py-10 px-7">
      <div className="absolute top-6 container flex justify-between items-center">
        <Logo />
        <ThemeSwitcher />
      </div>

      <div className="max-w-[300px] h-auto">
        <Image
          src={errorImage}
          alt=""
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-3 text-center">
        <h2 className="font-bold text-2xl md:3xl">Internal Server Error</h2>

        <p className="text-muted-foreground w-[90%] mx-auto">
          Oops! It's not you, it's us. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Reprehenderit, voluptas?
        </p>

        <Button onClick={() => retry()} className="w-[200px] mx-auto">
          Retry
        </Button>
      </div>
    </div>
  );
};

export default GlobalServerError;
