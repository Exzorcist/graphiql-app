import { OperationTypeNode } from 'graphql';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectGraphqlSchema } from '@/redux/graphqlSlice';
import Separator from '@/components/ui/Separator';
import RootEntry from './Entry/RootEntry';
import { useDocsExplorer } from '../DocsExplorer';

function RootTypeList() {
  const graphqlSchema = useAppSelector(selectGraphqlSchema);
  const { openEntry } = useDocsExplorer();

  return (
    <div>
      <h4 className="text-lg font-semibold">Root types</h4>
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
