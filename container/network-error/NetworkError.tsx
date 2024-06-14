import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface Props {
  retry: () => void;
}

const NetworkError: FC<Props> = ({ retry }) => {
  return (
    <>
      <span>Network errorrr</span>
      <Button onClick={() => retry()}>Retry</Button>
    </>
  );
};

export default NetworkError;
