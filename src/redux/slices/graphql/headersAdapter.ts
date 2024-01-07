import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { HttpHeader } from '@/types/HttpHeader';
import { RootState } from '@/redux/store';

export const headersAdapter = createEntityAdapter<HttpHeader>();
export const headersInitialState = headersAdapter.getInitialState();

export const { selectAll: selectHeaders } = headersAdapter.getSelectors(
  (state: RootState) => state.graphql.headers
);

export const selectHeaderMap = createSelector(selectHeaders, (headers) => {
  return headers.reduce((acc, { header: headerKey, value: headerValue }) => {
    const key = headerKey.trim();
    const value = headerValue.trim();

    if (!key || !value) return acc;

    return { ...acc, [key]: value };
  }, {});
});
