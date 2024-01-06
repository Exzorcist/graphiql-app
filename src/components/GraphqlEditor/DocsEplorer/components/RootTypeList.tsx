import { OperationTypeNode } from 'graphql';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectGraphQLSchema } from '@/redux/slices/graphql/graphqlSlice';
import Separator from '@/components/ui/Separator';
import RootEntry from './Entry/RootEntry';
import { useDocsExplorer } from '../DocsExplorer';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

function RootTypeList() {
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const { openEntry } = useDocsExplorer();
  const { t } = useLocalizationContext();

  return (
    <div>
      <h4 className="text-2xl font-semibold">{t.page.editor.types}</h4>
      <Separator />
      {Object.values(OperationTypeNode).map((operationType) => {
        const type = graphqlSchema?.getRootType(operationType as OperationTypeNode);
        return (
          type && (
            <RootEntry
              key={operationType}
              operation={operationType}
              type={type}
              onClick={() => openEntry(type)}
            />
          )
        );
      })}
    </div>
  );
}

export default RootTypeList;
