import { linter } from '@codemirror/lint';
import { hoverTooltip } from '@codemirror/view';
import { json, jsonLanguage } from '@codemirror/lang-json';
import {
  jsonSchemaLinter,
  jsonSchemaHover,
  jsonCompletion,
  stateExtensions,
  updateSchema,
} from 'codemirror-json-schema';
import { useEffect, useMemo, useRef } from 'react';
import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useDebouncedCallback } from 'use-debounce';
import { Editor } from '@/components/Editor';
import { requestPanelThemeSettings } from '../themeSettings';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import {
  changeVariablesValue,
  selectGraphQLSchema,
  selectRequestValue,
  selectVariablesValue,
} from '@/redux/slices/graphqlSlice';
import { buildVariablesJSONSchema, customJsonParseLinter } from './utils';

function VariablesEditor() {
  const dispatch = useAppDispatch();
  const requestValue = useAppSelector(selectRequestValue);
  const graphqlSchema = useAppSelector(selectGraphQLSchema);
  const storeValue = useAppSelector(selectVariablesValue);
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
  const dispatchDebounced = useDebouncedCallback((value: string) => {
    dispatch(changeVariablesValue(value));
  }, 500);

  useEffect(() => {
    if (editorRef.current?.view && graphqlSchema && requestValue) {
      updateSchema(editorRef.current?.view, buildVariablesJSONSchema(graphqlSchema, requestValue));
    }
  }, [graphqlSchema, requestValue]);

  const extensions = useMemo(
    () => [
      json(),
      linter(customJsonParseLinter(), {
        delay: 300,
      }),
      linter(jsonSchemaLinter()),
      jsonLanguage.data.of({
        autocomplete: jsonCompletion(),
      }),
      hoverTooltip(jsonSchemaHover()),
      stateExtensions(
        requestValue && graphqlSchema
          ? buildVariablesJSONSchema(graphqlSchema, requestValue)
          : undefined
      ),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Editor>
      <Editor.Area
        value={storeValue}
        onChange={dispatchDebounced}
        ref={editorRef}
        themeSettings={requestPanelThemeSettings}
        extensions={extensions}
      />
    </Editor>
  );
}

export default VariablesEditor;
