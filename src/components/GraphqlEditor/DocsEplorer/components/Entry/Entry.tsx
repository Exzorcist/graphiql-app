import { useCallback } from 'react';
import { GraphQLArgument } from 'graphql';
import { GraphQLAnyField } from '@/types/graphqlTypes';
import EntryContainer, { EntryContainerProps } from './EntryContainer';
import GraphQLType from '../GraphQLType';

type Props<T extends GraphQLAnyField | GraphQLArgument> = {
  entry: T;
  onClick?(entry: T): void;
} & EntryContainerProps;

function Entry<T extends GraphQLAnyField | GraphQLArgument>({
  entry,
  onClick,
  ...delegated
}: Props<T>) {
  const handleClick = useCallback(() => {
    onClick?.(entry);
  }, [onClick, entry]);

  return (
    <EntryContainer onClick={handleClick} {...delegated}>
      {entry.name}: <GraphQLType>{entry.type.toString()}</GraphQLType>
    </EntryContainer>
  );
}

export default Entry;
