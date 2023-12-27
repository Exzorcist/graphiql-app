import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { ReactCodeMirrorRef, ViewUpdate } from '@uiw/react-codemirror';
import { updateSchema, graphql } from 'cm6-graphql';
import { historyField } from '@codemirror/commands';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { changeRequestValue, selectGraphQLSchema } from '@/redux/slices/graphqlSlice';
import EditorArea from '@/components/Editor/EditorArea';

const stateFields = { history: historyField };
const storageState = JSON.parse(localStorage.getItem('requestEditorState') ?? 'null');
const initialState = storageState ? { json: storageState, fields: stateFields } : undefined;

function RequestEditor() {
  const editorAreaRef = useRef<ReactCodeMirrorRef | null>(null);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const [editorValue, setEditorValue] = useState(storageState?.doc);
  const langExtension = useRef([graphql(editorValue ? graphqlSchema : undefined)]);
  const dispatch = useAppDispatch();
  const dispatchDebounced = useDebouncedCallback((value: string) => {
    dispatch(changeRequestValue(value));
  }, 500);

  useEffect(() => {
    if (editorAreaRef.current?.view) {
      updateSchema(editorAreaRef.current.view, editorValue ? graphqlSchema : undefined);
    }
  }, [editorValue, editorAreaRef.current?.view, graphqlSchema]);

  const handleChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    const state = viewUpdate.state.toJSON(stateFields);
    localStorage.setItem('requestEditorState', JSON.stringify(state));
    setEditorValue(value);
    dispatchDebounced(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- because of dispatchDebounced
  }, []);

  return (
    <EditorArea
      value={storageState?.doc}
      initialState={initialState}
      onChange={handleChange}
      ref={editorAreaRef}
      extensions={langExtension.current}
    />
  );
}

export default RequestEditor;
