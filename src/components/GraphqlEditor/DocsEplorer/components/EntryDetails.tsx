import { GraphQLObjectType, GraphQLInputObjectType, getNamedType, isEnumType } from 'graphql';
import { GraphQLDocsEntry, isGraphQLField, isTypeWithFields } from '@/types/graphqlTypes';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import EntryList from './EntryList';

type Props = {
  entry: GraphQLDocsEntry;
} & PropsWithClassName;

function EntryDetails({ entry, className }: Props) {
  const entryType = getNamedType(entry instanceof GraphQLObjectType ? entry : entry.type);

  return (
    <div className={className}>
      <p className="mb-4 text-sm">{entry?.description}</p>
      {isGraphQLField(entry) && !!entry.args.length && (
        <EntryList entries={entry.args} header="Arguments" className="mb-4" />
      )}
      {isTypeWithFields(entryType) && (
        <EntryList
          entries={Object.values(entryType.getFields())}
          header={entryType instanceof GraphQLInputObjectType ? 'Input Fields' : 'Fields'}
          className="mb-4"
        />
      )}
      {entryType.description && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Metadata for {entryType.name} Type</h4>
          <p className="text-sm">{entryType.description}</p>
        </div>
      )}
      {isEnumType(entryType) && (
        <div>
          <h4 className="font-semibold mb-2">Enum Values</h4>
          <ul className="font-mono text-sm">
            {entryType.getValues().map((value) => (
              <li key={value.name}>
                {value.name} {value.description && `- ${value.description}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EntryDetails;
