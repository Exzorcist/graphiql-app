import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useDebouncedCallback } from 'use-debounce';
import { updateSchema } from 'cm6-graphql';
import { useEffect, useRef } from 'react';
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

  return (
    <EditorArea
      value={storeValue}
      onChange={handleChange}
      ref={editorAreaRef}
      extensions={graphql(graphqlSchema)}
    />
  );
}

export default RequestEditor;
