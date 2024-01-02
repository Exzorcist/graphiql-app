import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';

export type Meta = {
  responseTime: number;
  responseStatusCode: number | undefined;
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
  const responseStatusCode = baseResult.meta?.response?.status;

  return {
    ...baseResult,
    meta: baseResult.meta && { ...baseResult.meta, responseTime, responseStatusCode },
  };
};
