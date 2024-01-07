import { GraphQLObjectType, OperationTypeNode } from 'graphql';
import EntryContainer, { EntryContainerProps } from './EntryContainer';
import TypeLabel from '../TypeLabel';

type Props = {
  operation: OperationTypeNode;
  type: GraphQLObjectType;
} & EntryContainerProps;

function RootEntry({ operation, type, ...delegated }: Props) {
  return (
    <EntryContainer {...delegated}>
      {operation}: <TypeLabel>{type.name}</TypeLabel>
    </EntryContainer>
  );
}

export default RootEntry;
