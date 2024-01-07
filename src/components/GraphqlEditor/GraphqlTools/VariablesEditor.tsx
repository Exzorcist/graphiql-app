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
  selectRequestAST,
} from '@/redux/slices/graphql/graphqlSlice';

const storageKey = 'variablesValue';
const defaultValue = '{\n\n}';

function VariablesEditor() {
  const dispatch = useAppDispatch();
  const requestAST = useAppSelector(selectRequestAST);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
  const [editorValue, setEditorValue] = useState(
    () => localStorage.getItem(storageKey) ?? defaultValue
  );

  const updateStoreValue = useDebouncedCallback((value: string) => {
    localStorage.setItem(storageKey, value);

    try {
      const varObject = JSON.parse(value);
      dispatch(changeVariablesValue(varObject));
    } catch (error) {
      dispatch(changeVariablesValue({}));
    }
  }, 300);

  const handleChange = useCallback((value: string) => {
    setEditorValue(value);
    updateStoreValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef.current?.view) {
      updateSchema(editorRef.current.view, buildVariablesJSONSchema(graphqlSchema, requestAST));
    }
  }, [graphqlSchema, requestAST]);

  useEffect(() => {
    if (editorValue.trim() === '') {
      const value = defaultValue;
      handleChange(value);
    }
  }, [editorValue, handleChange]);

  const extension = useMemo(
    () => variablesJsonSchema(graphqlSchema, requestAST),
    [graphqlSchema, requestAST]
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
