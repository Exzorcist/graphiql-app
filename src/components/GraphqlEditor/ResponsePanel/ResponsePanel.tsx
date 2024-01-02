import { memo } from 'react';
import { json } from '@codemirror/lang-json';
import { secondaryEditorThemeSettings } from '../themeSettings';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectRequestStatus, selectResponseValue } from '@/redux/slices/graphql/graphqlSlice';
import { Editor } from '@/components/Editor';
import ResponseStatusBar from './ResponseStatusBar';
import { cn } from '@/utils/cn';

const extension = [json()];

function ResponsePanel() {
  const responseValue = useAppSelector(selectResponseValue);
  const requestStatus = useAppSelector(selectRequestStatus);

  let value;

  if (!responseValue) {
    value = '';
  } else if (responseValue && typeof responseValue === 'object') {
    value = JSON.stringify({ ...responseValue }, null, 2);
  } else {
    value = JSON.stringify(responseValue);
  }

  return (
    <Editor>
      <Editor.Container>
        <Editor.Header className="border-b-editor-border border-b">
          <ResponseStatusBar />
        </Editor.Header>
        <Editor.Area
          value={value}
          themeSettings={secondaryEditorThemeSettings}
          extensions={extension}
          className={cn('transition-opacity', requestStatus === 'pending' && 'opacity-50')}
          readOnly
        />
      </Editor.Container>
    </Editor>
  );
}
export default memo(ResponsePanel);
