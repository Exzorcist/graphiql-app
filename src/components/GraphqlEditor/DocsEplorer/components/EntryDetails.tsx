import { GraphQLObjectType, GraphQLInputObjectType, getNamedType, isEnumType } from 'graphql';
import { GraphQLDocsEntry, isGraphQLField, isTypeWithFields } from '@/types/graphqlTypes';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import EntryList from './EntryList';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

type Props = {
  entry: GraphQLDocsEntry;
} & PropsWithClassName;

function EntryDetails({ entry, className }: Props) {
  const entryType = getNamedType(entry instanceof GraphQLObjectType ? entry : entry.type);
  const { t } = useLocalizationContext();

  return (
    <div className={className}>
      <p className="mb-4 text-sm">{entry?.description}</p>
      {isGraphQLField(entry) && !!entry.args.length && (
        <EntryList entries={entry.args} header={t.page.editor.args} className="mb-4" />
      )}
      {isTypeWithFields(entryType) && (
        <EntryList
          entries={Object.values(entryType.getFields())}
          header={
            entryType instanceof GraphQLInputObjectType
              ? `${t.page.editor.inputFields}`
              : `${t.page.editor.fields}`
          }
          className="mb-4"
        />
      )}
      {entryType.description && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">
            {t.page.editor.metadataFor} {entryType.name} {t.page.editor.type}
          </h4>
          <p className="text-sm">{entryType.description}</p>
        </div>
      )}
      {isEnumType(entryType) && (
        <div>
          <h4 className="font-semibold mb-2">Enum {t.page.editor.values}</h4>
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
