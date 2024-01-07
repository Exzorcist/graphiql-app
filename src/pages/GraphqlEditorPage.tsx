import { Suspense, lazy } from 'react';
import GlobalSpinner from '@/components/ui/GlobalSpinner';

const GraphqlEditor = lazy(() => import('../components/GraphqlEditor'));

function GraphqlEditorPage() {
  return (
    <Suspense fallback={<GlobalSpinner className="bg-editor-primary" />}>
      <GraphqlEditor />
    </Suspense>
  );
}

export default GraphqlEditorPage;
