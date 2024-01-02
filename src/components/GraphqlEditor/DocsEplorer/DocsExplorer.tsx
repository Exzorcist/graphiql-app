import { createContext, useContext, useMemo, useRef, useState } from 'react';
import { selectGraphQLSchema, selectIntrospectStatus } from '@/redux/slices/graphql/graphqlSlice';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import RootTypeList from './components/RootTypeList';
import { GraphQLDocsEntry } from '@/types/graphqlTypes';
import Separator from '@/components/ui/Separator';
import { cn } from '@/utils/cn';
import EntryScreen from './components/EntryScreen';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import DocsBreadcrumb from './components/DocsBreadcrumb';
import Spinner from '@/components/ui/Spinner';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

type DocsExlorerContextType = {
  openEntry(entry: GraphQLDocsEntry): void;
  leaveEntry(): void;
  goToIndex(index: number): void;
};

const DocsExplorerContext = createContext<DocsExlorerContextType | null>(null);

function DocsExplorer({ className }: PropsWithClassName) {
  const { t } = useLocalizationContext();
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const introspectStatus = useAppSelector(selectIntrospectStatus);
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
      <div className="h-full flex flex-col relative">
        <div
          className={cn(
            'bg-editor-primary p-5 h-full w-full font-sans min-h-0 flex-[1_1_0px] overflow-auto fancy-scrollbar',
            introspectStatus === 'pending' && 'opacity-50 pointer-events-none',
            className
          )}
        >
          <h3 className="text-lg font-semibold">{t.page.editor.docs}</h3>
          <Separator className="mb-4" />
          <DocsBreadcrumb
            navStack={navStack}
            onItemClick={contextValue.goToIndex}
            className="mb-4"
          />
          {navStack.length ? <EntryScreen entry={navStack.at(-1)!} /> : <RootTypeList />}
        </div>
        {introspectStatus === 'pending' && <Spinner className="absolute-center" withLabel />}
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
