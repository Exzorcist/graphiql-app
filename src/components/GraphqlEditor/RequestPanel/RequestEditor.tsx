import { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { changeRequestValue } from '@/redux/slices/graphqlSlice';
import GraphQLEditorArea from '@/components/Editor/GraphQLEditorArea';

function RequestEditor() {
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebouncedCallback((value: string) => {
    dispatch(changeRequestValue(value));
  }, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(dispatchDebounced, []);

  return <GraphQLEditorArea onChange={handleChange} />;
}

export default RequestEditor;
