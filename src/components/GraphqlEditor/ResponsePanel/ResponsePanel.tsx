import { memo } from 'react';
import { json } from '@codemirror/lang-json';
import { secondaryEditorThemeSettings } from '../themeSettings';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectResponseValue } from '@/redux/slices/graphqlSlice';
import { Editor } from '@/components/Editor';

function ResponsePanel() {
  const responseValue = useAppSelector(selectResponseValue);

  let value;

  if (responseValue === '') {
    value = responseValue;
  } else if (responseValue && typeof responseValue === 'object') {
    value = JSON.stringify({ ...responseValue }, null, 2);
  } else {
    value = JSON.stringify(responseValue);
  }

  return (
    <Editor
      value={value}
      themeSettings={secondaryEditorThemeSettings}
      extensions={[json()]}
      readOnly
    />
  );
}
export default memo(ResponsePanel);
