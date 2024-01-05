import { GraphQLSchema } from 'graphql';
import { createContext, memo, useContext, useMemo, useRef, useState } from 'react';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import DocsBreadcrumb from './components/DocsBreadcrumb';
import EntryScreen from './components/EntryScreen';
import RootTypeList from './components/RootTypeList';

type DocsExlorerContextType = {
  openEntry(entry: GraphQLDocsEntry): void;
  leaveEntry(): void;
  goToIndex(index: number): void;
};

const DocsExplorerContext = createContext<DocsExlorerContextType | null>(null);

type DocsExplorerProps = {
  graphqlSchema: GraphQLSchema;
};

function DocsExplorer({ graphqlSchema }: DocsExplorerProps) {
  const [navStack, setNavStack] = useState<GraphQLDocsEntry[]>([]);
  const prevSchema = useRef(graphqlSchema);

  if (prevSchema.current !== graphqlSchema) {
    prevSchema.current = graphqlSchema;

    if (navStack.length) {
      setNavStack([]);
    }
  }

  const contextValue: DocsExlorerContextType = useMemo(() => {
    return {
      openEntry(entry) {
        setNavStack((prev) => [...prev, entry]);
      },
      leaveEntry() {
        setNavStack((prev) => prev.slice(0, -1));
      },
      goToIndex(index: number) {
        setNavStack((prev) => prev.slice(0, index + 1));
      },
    };
  }, []);

  return (
    <DocsExplorerContext.Provider value={contextValue}>
      <DocsBreadcrumb navStack={navStack} onItemClick={contextValue.goToIndex} className="mb-10" />
      {navStack.length ? <EntryScreen entry={navStack.at(-1)!} /> : <RootTypeList />}
    </DocsExplorerContext.Provider>
  );
}

export default memo(DocsExplorer);

export function useDocsExplorer() {
  const value = useContext(DocsExplorerContext);

  if (!value) {
    throw new Error('useDocsExplorer must be used inside DocsExlorerContext');
  }

  return value;
}
