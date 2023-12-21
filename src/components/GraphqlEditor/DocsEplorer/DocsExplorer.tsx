import { ComponentProps, createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as GraphQL from 'graphql';
import { selectGraphqlSchema } from '@/redux/graphqlSlice';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import RootTypeList from './components/RootTypeList';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import Separator from '@/components/ui/Separator';
import { cn } from '@/utils/cn';
import EntryScreen from './components/EntryScreen';

type DocsExlorerContextType = {
  openEntry(entry: GraphQLDocsEntry): void;
  leaveEntry(): void;
};

const DocsExplorerContext = createContext<DocsExlorerContextType | null>(null);

function DocsExplorer({ className, ...delegated }: ComponentProps<'div'>) {
  const graphqlSchema = useAppSelector(selectGraphqlSchema);
  const [navStack, setNavStack] = useState<GraphQLDocsEntry[]>([]);

  useEffect(() => {
    Object.assign(window, { GraphQL });
    if (graphqlSchema) {
      Object.assign(window, {
        graphqlSchema,
      });
    }
  }, [graphqlSchema]);

  const contextValue: DocsExlorerContextType = useMemo(() => {
    return {
      openEntry(entry) {
        setNavStack((prev) => [...prev, entry]);
      },
      leaveEntry() {
        setNavStack((prev) => prev.slice(0, -1));
      },
    };
  }, []);

  return (
    <DocsExplorerContext.Provider value={contextValue}>
      <div className="h-full flex flex-col">
        <div
          className={cn(
            'bg-editor-primary p-4 h-full w-full font-sans min-h-0 flex-[1_1_0px] overflow-auto fancy-scrollbar',
            className
          )}
          {...delegated}
        >
          <h3 className="text-lg font-semibold">Documentation</h3>
          <Separator />
          {navStack.length ? <EntryScreen entry={navStack.at(-1)!} /> : <RootTypeList />}
        </div>
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
