import { GraphQLArgument } from 'graphql';
import { GraphQLAnyField } from '@/types/graphqlTypes';
import Entry from './Entry/Entry';
import { useDocsExplorer } from '../DocsExplorer';
import { PropsWithClassName } from '@/types/PropsWithClassName';

type Props = {
  header?: string;
  entries: ReadonlyArray<GraphQLAnyField | GraphQLArgument>;
} & PropsWithClassName;

function EntryList({ entries, header, className }: Props) {
  const { openEntry } = useDocsExplorer();

  return (
    <div className={className}>
      <h4 className="font-semibold">{header}</h4>
      <ul className="font-mono">
        {entries.map((entry) => (
          <li key={entry.name}>
            <Entry entry={entry} onClick={openEntry} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EntryList;
