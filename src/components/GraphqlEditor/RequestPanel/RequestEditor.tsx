import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { updateSchema, graphql } from 'cm6-graphql';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import {
  changeRequestValue,
  selectGraphQLSchema,
  selectRequestValue,
} from '@/redux/slices/graphqlSlice';
import EditorArea from '@/components/Editor/EditorArea';

/* const stateFields = { history: historyField };
const storageState = JSON.parse(localStorage.getItem('requestEditorState') ?? 'null');
const initialState = storageState ? { json: storageState, fields: stateFields } : undefined; */

function RequestEditor() {
  const editorAreaRef = useRef<ReactCodeMirrorRef | null>(null);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const storeValue = useAppSelector(selectRequestValue);
  const [editorValue, setEditorValue] = useState(storeValue);
  const langExtensionRef = useRef([graphql(editorValue ? graphqlSchema : undefined)]);
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebouncedCallback((value: string) => {
    dispatch(changeRequestValue(value));
  }, 500);

  useEffect(() => {
    if (editorAreaRef.current?.view) {
      updateSchema(editorAreaRef.current.view, editorValue ? graphqlSchema : undefined);
    }
  }, [editorValue, editorAreaRef.current?.view, graphqlSchema]);

  const handleChange = useCallback((value: string) => {
    /* const state = viewUpdate.state.toJSON(stateFields);
    localStorage.setItem('requestEditorState', JSON.stringify(state)); */
    setEditorValue(value);
    dispatchDebounced(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- because of dispatchDebounced
  }, []);

  return (
    <EditorArea
      value={storeValue}
      // initialState={initialState}
      onChange={handleChange}
      ref={editorAreaRef}
      extensions={langExtensionRef.current}
    />
  );
}

export default RequestEditor;
