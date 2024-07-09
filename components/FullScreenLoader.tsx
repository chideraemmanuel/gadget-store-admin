import { FC } from 'react';

interface Props {}

const FullScreenLoader: FC<Props> = () => {
  return (
    <div className="fixed z-[60] w-screen h-screen left-0 top-0 flex items-center justify-center bg-background/10 backdrop-blur-sm">
      <div
        className="spinner-fs"
        style={{ width: '48px', height: '48px' }}
      ></div>
      {/* <div className="spinner"></div> */}
    </div>
  );
};

export default FullScreenLoader;
