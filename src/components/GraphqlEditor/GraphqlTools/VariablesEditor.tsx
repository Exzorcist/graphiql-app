import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { updateSchema } from 'codemirror-json-schema';
import { useDebouncedCallback } from 'use-debounce';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { buildVariablesJSONSchema, variablesJsonSchema } from './utils';
import { primaryEditorThemeSettings } from '../themeSettings';
import { Editor } from '@/components/Editor';
import {
  changeVariablesValue,
  selectGraphQLSchema,
  selectRequestValue,
} from '@/redux/slices/graphql/graphqlSlice';

const storageKey = 'variablesValue';
const defaultValue = '{\n\n}';
const initialValue = localStorage.getItem(storageKey) ?? defaultValue;

function VariablesEditor() {
  const dispatch = useAppDispatch();
  const requestValue = useAppSelector(selectRequestValue);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
  const [editorValue, setEditorValue] = useState(initialValue);

  const updateStoreValue = useDebouncedCallback((value: string) => {
    localStorage.setItem(storageKey, value);

    try {
      const varObject = JSON.parse(value);
      dispatch(changeVariablesValue(varObject));
    } catch (error) {
      dispatch(changeVariablesValue({}));
    }
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
      const value = defaultValue;
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
        ref={editorRef}
        value={editorValue}
        data-scrollbar-gutter
        extensions={extension}
        onChange={handleChange}
        themeSettings={primaryEditorThemeSettings}
      />
    </Editor>
  );
}

export default memo(VariablesEditor);
