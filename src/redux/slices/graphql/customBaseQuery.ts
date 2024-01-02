import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';

export type Meta = {
  responseTime: number;
};

export type CustomBaseQueryMeta = Meta & FetchBaseQueryMeta;

const fetchWithBQ = fetchBaseQuery({ method: 'POST' });

export const customBaseQuery: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError,
  NonNullable<unknown>,
  CustomBaseQueryMeta
> = async (args, api, extraOptions) => {
  const timestampBefore = Date.now();
  const baseResult = await fetchWithBQ(args, api, extraOptions);
  const responseTime = Date.now() - timestampBefore;

  return {
    ...baseResult,
    meta: baseResult.meta && { ...baseResult.meta, responseTime },
  };
};
