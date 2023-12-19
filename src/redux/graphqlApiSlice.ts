import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const graphqlApi = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    introspectApi: builder.query<string, string>({
      query: (url) => url,
    }),
  }),
});

export default graphqlApi;
export const { useIntrospectApiQuery } = graphqlApi;
