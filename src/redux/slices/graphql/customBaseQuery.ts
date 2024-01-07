import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query';
import { selectHeaderMap } from './headersAdapter';
import { RootState } from '@/redux/store';

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
  const state = api.getState() as RootState;
  const headers = selectHeaderMap(state);

  const timestampBefore = Date.now();

  const baseResult = await fetchWithBQ({ headers, ...args }, api, extraOptions);

  const responseTime = Date.now() - timestampBefore;

  return {
    ...baseResult,
    meta: baseResult.meta && { ...baseResult.meta, responseTime },
  };
};
