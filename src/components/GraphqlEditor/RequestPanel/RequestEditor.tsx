import { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { useDebouncedCallback } from 'use-debounce';
import { updateSchema } from 'cm6-graphql';
import { memo, useEffect, useMemo, useRef } from 'react';
import { diagnosticCount } from '@codemirror/lint';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { primaryEditorThemeSettings } from '../themeSettings';
import {
  changeRequestValue,
  selectGraphQLSchema,
  selectRequestValue,
  setHasRequestEditorLintErrors,
} from '@/redux/slices/graphql/graphqlSlice';
import { Editor } from '@/components/Editor';
import { graphql } from './utils';
import RequestEditorHeader from './RequestEditorHeader';

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
    <Editor>
      <Editor.Container>
        <Editor.Header className="border-b-editor-border border-b">
          <RequestEditorHeader />
        </Editor.Header>
        <Editor.Area
          value={storeValue}
          onChange={handleChange}
          ref={editorAreaRef}
          extensions={extension}
          data-scrollbar-gutter
          themeSettings={primaryEditorThemeSettings}
        />
      </Editor.Container>
    </Editor>
  );
}

export default memo(RequestEditor);
