import { createAction } from '@reduxjs/toolkit';
import { GraphQLSchema } from 'graphql';
import { IntrospectionState } from './types';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export const setGraphqlSchema = createAction(
  'graphql/setGraphqlSchema',
  withPayloadType<GraphQLSchema>()
);

export const setIntrospection = createAction(
  'graphql/setIntrospection',
  withPayloadType<Partial<IntrospectionState>>()
);
