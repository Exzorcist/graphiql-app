import { useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { updateSchema } from 'cm6-graphql';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import {
  changeRequestValue,
  selectGraphQLSchema,
  selectRequestValue,
} from '@/redux/slices/graphqlSlice';
import EditorArea from '@/components/Editor/EditorArea';
import { graphql } from './utils';

function RequestEditor() {
  const editorAreaRef = useRef<ReactCodeMirrorRef | null>(null);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const storeValue = useAppSelector(selectRequestValue);
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebouncedCallback((value: string) => {
    dispatch(changeRequestValue(value));
  }, 500);

  useEffect(() => {
    if (editorAreaRef.current?.view) {
      updateSchema(editorAreaRef.current.view, graphqlSchema);
    }
  }, [graphqlSchema]);

  return (
    <EditorArea
      value={storeValue}
      onChange={dispatchDebounced}
      ref={editorAreaRef}
      extensions={[graphql(graphqlSchema)]}
    />
  );
}

export default RequestEditor;
