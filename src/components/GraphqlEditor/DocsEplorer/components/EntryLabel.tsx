import { GraphQLObjectType } from 'graphql';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import TypeLabel from './TypeLabel';

type Props = {
  entry: GraphQLDocsEntry;
};

function EntryLabel({ entry }: Props) {
  return entry instanceof GraphQLObjectType ? (
    entry.toString()
  ) : (
    <>
      {entry.name}: <TypeLabel>{entry.type.toString()}</TypeLabel>
    </>
  );
}
export default EntryLabel;
