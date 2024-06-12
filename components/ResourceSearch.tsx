'use client';

import {
  ComponentPropsWithoutRef,
  FC,
  FormEvent,
  forwardRef,
  useState,
} from 'react';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = ComponentPropsWithoutRef<typeof Input>;

const ResourceSearch: FC<Props> = (props) => {
  const [searchString, setSearchString] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set('search_query', searchString);

    // return `${searchParamKey}=${searchString}`
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // console.log('passed searchString', searchString);

    if (searchString === '') {
      newSearchParams.delete('search_query');
    } else {
      newSearchParams.set('search_query', searchString);
    }

    router.replace(`?${newSearchParams}`);
  };

  return (
    <form onSubmit={(e) => updateSearchParam(e)}>
      <Input
        {...props}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </form>
  );
};

export default ResourceSearch;
