/**
 * this function create a valid URLSearchParams object from an object with value type as either STRING, ARRAY OF STRINGS, or UNDEFINED
 */

const createSearchParams = (params: {
  [key: string]: string | string[] | undefined;
}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => {
        searchParams.append(key, value);
      });
    } else {
      searchParams.append(key, value as string);
    }
  });

  return searchParams;
};

export default createSearchParams;
