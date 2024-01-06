import { Suspense, lazy } from 'react';
import { useDebounce } from 'use-debounce';
import {
  selectGraphQLDocsSchema,
  selectIntrospectStatus,
} from '@/redux/slices/graphql/graphqlSlice';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import Separator from '@/components/ui/Separator';
import Spinner from '@/components/ui/Spinner';
import { cn } from '@/utils/cn';

const DocsExplorerLazy = lazy(() => import('./DocsExplorer'));

function DocsExplorerContainer({ className }: PropsWithClassName) {
  const { t } = useLocalizationContext();
  const graphqlSchema = useAppSelector(selectGraphQLDocsSchema);
  const introspectStatus = useAppSelector(selectIntrospectStatus);
  const [debounceIntrospectStatus] = useDebounce(introspectStatus, 100);

  return (
    <div className="h-full flex flex-col relative">
      <div
        className={cn(
          'bg-editor-primary p-5 h-full w-full font-sans min-h-0 flex-[1_1_0px] overflow-auto fancy-scrollbar',
          debounceIntrospectStatus === 'pending' && 'opacity-50 pointer-events-none',
          className
        )}
      >
        <h3 className="text-2xl font-semibold">{t.page.editor.docs}</h3>
        <Separator className="mb-4" />
        {graphqlSchema ? (
          <Suspense fallback={<Spinner className="absolute-center" withLabel />}>
            <DocsExplorerLazy graphqlSchema={graphqlSchema} />
          </Suspense>
        ) : (
          <h4>{t.page.editor.schemaNotLoaded}</h4>
        )}
      </div>
      {debounceIntrospectStatus === 'pending' && <Spinner className="absolute-center" withLabel />}
    </div>
  );
}

export default DocsExplorerContainer;
