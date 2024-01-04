import { IntrospectionQuery } from 'graphql';
import { AsyncStatus } from '@/types/AsyncStatus';

export type IntrospectionState = {
  readonly data: IntrospectionQuery | null;
  endpoint: string;
  status: AsyncStatus;
};
