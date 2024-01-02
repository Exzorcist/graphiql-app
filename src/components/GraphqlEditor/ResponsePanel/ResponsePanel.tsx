import { memo } from 'react';
import { json } from '@codemirror/lang-json';
import { secondaryEditorThemeSettings } from '../themeSettings';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectResponseValue } from '@/redux/slices/graphql/graphqlSlice';
import { Editor } from '@/components/Editor';

const extension = [json()];

function ResponsePanel() {
  const responseValue = useAppSelector(selectResponseValue);

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
        <Editor.Header size={35} className="border-b-editor-border border-b" />
        <Editor.Area
          value={value}
          themeSettings={secondaryEditorThemeSettings}
          extensions={extension}
          readOnly
        />
      </Editor.Container>
    </Editor>
  );
}
export default memo(ResponsePanel);
