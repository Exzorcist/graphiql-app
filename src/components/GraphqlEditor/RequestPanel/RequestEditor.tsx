import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useDebouncedCallback } from 'use-debounce';
import { updateSchema } from 'cm6-graphql';
import { memo, useEffect, useMemo, useRef } from 'react';
import { diagnosticCount } from '@codemirror/lint';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import EditorArea from '@/components/Editor/EditorArea';
import {
  changeRequestValue,
  selectGraphQLSchema,
  selectRequestValue,
  setHasRequestEditorLintErrors,
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
    const editorState = editorAreaRef.current?.view?.state;

    if (editorState) {
      const isError = !!diagnosticCount(editorState);
      dispatch(setHasRequestEditorLintErrors(isError));
    }

    dispatch(changeRequestValue(value));
    // should be atleast a lint delay
  }, 310);

  const extension = useMemo(() => graphql(graphqlSchema), [graphqlSchema]);

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
