'use client';

import { FC } from 'react';

interface Props {
  error: Error;
  reset: () => void;
}

const UpdateProductErrorPage: FC<Props> = ({ error, reset }) => {
  return (
    <>
      <h2>An error occured</h2>
      <span>{error.message}</span>
      <button onClick={() => reset()}>Retry</button>
    </>
  );
};

export default UpdateProductErrorPage;
