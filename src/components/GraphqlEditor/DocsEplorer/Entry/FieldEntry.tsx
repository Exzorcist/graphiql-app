import { getNamedType } from 'graphql';
import { GraphQLAnyField } from '@/types/graphqlTypes';
import Entry, { EntryProps } from './Entry';

type Props = {
  field: GraphQLAnyField;
} & EntryProps;

function FieldEntry({ field, ...delegated }: Props) {
  return (
    <Entry {...delegated}>
      {field.name}: {getNamedType(field.type).toString()}
    </Entry>
  );
}

export default FieldEntry;
