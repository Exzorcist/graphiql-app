import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { selectGraphqlSchema } from '@/redux/graphqlSlice';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import Separator from '@/components/ui/Separator';
import RootTypesScreen from './RootTypesScreen';
import { cn } from '@/utils/cn';
import CurrentEntry from './CurrentEntry';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';

type DocsExlorerContextType = {
  openEntry(entry: GraphQLDocsEntry): void;
};

const DocsExplorerContext = createContext<DocsExlorerContextType | null>(null);

function DocsExplorer({ className, ...delegated }: ComponentProps<'div'>) {
  const graphqlSchema = useAppSelector(selectGraphqlSchema);
  const [entryStack, setEntryStack] = useState<GraphQLDocsEntry[]>([]);

  useEffect(() => {
    Object.assign(window, { graphqlSchema });
  }, [graphqlSchema]);

  const leaveEntry = useCallback(() => {
    setEntryStack((prev) => prev.slice(0, -1));
  }, []);

  const contextValue: DocsExlorerContextType = useMemo(() => {
    return {
      openEntry(entry) {
        setEntryStack((prev) => [...prev, entry]);
      },
    };
  }, []);

  return (
    <DocsExplorerContext.Provider value={contextValue}>
      <div className={cn('bg-editor-primary p-4 h-full w-full', className)} {...delegated}>
        <h3 className="text-lg ">Documentation</h3>
        <Separator />
        {!entryStack.length && <RootTypesScreen />}
        {!!entryStack.length && <CurrentEntry entry={entryStack.at(-1)!} onGoBack={leaveEntry} />}
      </div>
    </DocsExplorerContext.Provider>
  );
}

export function useDocsExplorer() {
  const value = useContext(DocsExplorerContext);

  if (!value) {
    throw new Error('useDocsExplorer must be used inside DocsExlorerContext');
  }

  return value;
}

export default DocsExplorer;
