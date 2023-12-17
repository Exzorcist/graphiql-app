import { Settings } from '@uiw/codemirror-themes';
import { memo } from 'react';
import { Editor } from '@/components/Editor';

type Props = {
  themeSettings?: Settings;
};

function ResponsePanel({ themeSettings }: Props) {
  return <Editor themeSettings={themeSettings} />;
}

export default memo(ResponsePanel);
