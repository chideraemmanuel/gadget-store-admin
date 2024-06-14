import Logo from '@/components/Logo';
import Image from 'next/image';
import { FC } from 'react';
import image from '@/assets/phone.png';
import AuthRoutesGuard from '@/decorators/AuthRoutesGuard';

interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <AuthRoutesGuard>
      <main>
        <div className="absolute lg:fixed top-6 left-6 z-50 lg:text-[hsl(210_40%_98%)]">
          <Logo />
        </div>

        {/* button goes here..? */}

        <section className="fixed left-0 w-[50vw] min-h-screen hidden lg:flex items-end after:content-[''] after:w-full after:h-full after:bg-slate-950 after:bg-opacity-70 after:absolute after:top-0">
          <Image
            src={image.src}
            alt=""
            width={300}
            height={300}
            className="absolute w-full h-full"
          />

          <div className="container relative z-10 pb-7 text-[hsl(210_40%_98%)] ">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio aperiam iure pariatur consectetur voluptates? Sint sunt
              aspernatur tempora quos dolore, molestiae esse. Adipisci pariatur
              fugit quo modi officiis recusandae illo.
            </p>
          </div>
        </section>

        <section
          className="relative flex items-center justify-center py-7 min-h-screen after:content-[''] after:inset-0 after:bg-[hsl(210_40%_98%)] lg:after:bg-white dark:after:bg-slate-950 lg:dark:after:bg-slate-950 after:bg-opacity-95 dark:after:bg-opacity-95  after:absolute lg:ml-[50vw]"
          style={{
            background: `url(${image.src}) no-repeat center center/cover`,
          }}
        >
          {/* <div className="relative z-10 w-[min(90%,_600px)] pt-20"> */}
          {children}
          {/* </div> */}
        </section>
      </main>
    </AuthRoutesGuard>
  );
};

export default AuthLayout;
