import { GraphQLObjectType, OperationTypeNode } from 'graphql';
import Entry, { EntryProps } from './Entry';

type Props = {
  operation: OperationTypeNode;
  type: GraphQLObjectType;
} & EntryProps;

function RootEntry({ operation, type, ...delegated }: Props) {
  return (
    <Entry {...delegated}>
      {operation}: {type.name}
    </Entry>
  );
}

export default RootEntry;
