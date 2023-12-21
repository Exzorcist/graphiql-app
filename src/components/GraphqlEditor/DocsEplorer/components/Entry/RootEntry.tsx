import { GraphQLObjectType, OperationTypeNode } from 'graphql';
import EntryContainer, { EntryContainerProps } from './EntryContainer';
import GraphQLType from '../GraphQLType';

type Props = {
  operation: OperationTypeNode;
  type: GraphQLObjectType;
} & EntryContainerProps;

function RootEntry({ operation, type, ...delegated }: Props) {
  return (
    <EntryContainer {...delegated}>
      {operation}: <GraphQLType>{type.name}</GraphQLType>
    </EntryContainer>
  );
}

export default RootEntry;
