import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useDebouncedCallback } from 'use-debounce';
import { updateSchema } from 'cm6-graphql';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import EditorArea from '@/components/Editor/EditorArea';
import {
  changeRequestValue,
  selectGraphQLSchema,
  selectRequestValue,
} from '@/redux/slices/graphqlSlice';
import { graphql } from './utils';

function RequestEditor() {
  const dispatch = useAppDispatch();
  const storeValue = useAppSelector(selectRequestValue);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const editorAreaRef = useRef<ReactCodeMirrorRef | null>(null);

  useEffect(() => {
    if (editorAreaRef.current?.view) {
      updateSchema(editorAreaRef.current.view, graphqlSchema);
    }
  }, [graphqlSchema]);

  const handleChange = useDebouncedCallback((value: string) => {
    dispatch(changeRequestValue(value));
  }, 500);

  // no need to update hook, "updateSchema" function handles subsequent schema updates
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const extension = useMemo(() => graphql(graphqlSchema), []);

  return (
    <EditorArea
      value={storeValue}
      onChange={handleChange}
      ref={editorAreaRef}
      extensions={extension}
      data-scrollbar-gutter
    />
  );
}

export default memo(RequestEditor);
