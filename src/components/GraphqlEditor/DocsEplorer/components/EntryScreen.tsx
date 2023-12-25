import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import CurrentEntry from './CurrentEntry';
import EntryDetails from './EntryDetails';

type Props = {
  entry: GraphQLDocsEntry;
};

function EntryScreen({ entry }: Props) {
  return (
    <div>
      <CurrentEntry entry={entry} className="mb-4" />
      <EntryDetails entry={entry} />
    </div>
  );
}

export default EntryScreen;
