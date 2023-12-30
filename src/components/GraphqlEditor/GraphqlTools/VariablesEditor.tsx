import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { updateSchema } from 'codemirror-json-schema';
import { useDebouncedCallback } from 'use-debounce';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { buildVariablesJSONSchema, variablesJsonSchema } from './utils';
import { primaryEditorThemeSettings } from '../themeSettings';
import { Editor } from '@/components/Editor';
import {
  changeVariablesValue,
  selectGraphQLSchema,
  selectRequestValue,
  selectVariablesValue,
} from '@/redux/slices/graphqlSlice';

function VariablesEditor() {
  const dispatch = useAppDispatch();
  const requestValue = useAppSelector(selectRequestValue);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const storeValue = useAppSelector(selectVariablesValue);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
  const [editorValue, setEditorValue] = useState(storeValue);

  const updateStoreValue = useDebouncedCallback((value: string) => {
    dispatch(changeVariablesValue(value));
  }, 500);

  const handleChange = useCallback((value: string) => {
    setEditorValue(value);
    updateStoreValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef.current?.view) {
      updateSchema(editorRef.current.view, buildVariablesJSONSchema(graphqlSchema, requestValue));
    }
  }, [graphqlSchema, requestValue]);

  useEffect(() => {
    if (editorValue.trim() === '') {
      const value = '{\n\n}';
      handleChange(value);
    }
  }, [editorValue, handleChange]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const extension = useMemo(
    () => variablesJsonSchema(graphqlSchema, requestValue),
    [graphqlSchema, requestValue]
  );

  return (
    <Editor>
      <Editor.Area
        value={editorValue}
        onChange={handleChange}
        ref={editorRef}
        themeSettings={primaryEditorThemeSettings}
        extensions={extension}
      />
    </Editor>
  );
}

export default VariablesEditor;
