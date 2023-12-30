import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { updateSchema } from 'codemirror-json-schema';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef } from 'react';
import { diagnosticCount } from '@codemirror/lint';
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

  useEffect(() => {
    if (editorRef.current?.view) {
      updateSchema(editorRef.current.view, buildVariablesJSONSchema(graphqlSchema, requestValue));
    }
  }, [graphqlSchema, requestValue]);

  const handleChange = useDebouncedCallback((value: string) => {
    const state = editorRef.current?.view?.state;

    if (state && !diagnosticCount(state)) {
      dispatch(changeVariablesValue(value));
    }
  }, 500);

  return (
    <Editor>
      <Editor.Area
        value={storeValue}
        onChange={handleChange}
        ref={editorRef}
        themeSettings={primaryEditorThemeSettings}
        extensions={variablesJsonSchema(graphqlSchema, requestValue)}
      />
    </Editor>
  );
}

export default VariablesEditor;
