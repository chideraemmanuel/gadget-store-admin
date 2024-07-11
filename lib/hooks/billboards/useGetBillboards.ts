import axios from '@/config/axios';
import createSearchParams from '@/lib/createSearchParam';
import { BillboardReturnTypes, SearchParams } from '@/types';
import { useQuery } from 'react-query';

const getBillboards = async ({ queryKey }: { queryKey: any[] }) => {
  console.log('query key', queryKey);

  const searchParamsObject = queryKey[1];
  const paginated = queryKey[2];

  console.log('searchParamsObject', searchParamsObject);
  console.log('should paginate?', paginated);

  const params = createSearchParams(searchParamsObject);

  // // delete paginated from query params if it gets added
  // params.delete('paginated');

  // // if paginated is set to true on hook call, set paginated param
  // if (paginated) {
  //   params.set('paginated', 'true');
  // }

  params.set('paginated', paginated);

  console.log('params', params);

  // const qs = `${paginated}${params.size > 0 ? '&' : ''}${params}`;

  // console.log('qs', qs);

  const response = await axios.get<BillboardReturnTypes>(
    `/billboards?${params}`
  );

  console.log('response from get billboards hook', response);

  return response.data;
};

interface Params {
  searchParamsObject?: SearchParams;
  paginated?: boolean;
}

const useGetBillboards = ({
  searchParamsObject = {},
  paginated = true,
}: Params) => {
  return useQuery({
    queryKey: ['get billboards', searchParamsObject, paginated],
    queryFn: getBillboards,
    retry: false,
    // retry: 3,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    onSuccess: () => {},
    onError: (error: any) => {
      // WILL BE CAUGHT BY ERROR.TSX IN SEGMENT
      throw new Error(
        // @ts-ignore
        error?.message?.data?.error ||
          // @ts-ignore
          error?.message ||
          'An error occured while fetching billboards'
      );
    },
  });
};

export default useGetBillboards;
