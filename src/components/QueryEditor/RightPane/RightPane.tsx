import { Settings } from '@uiw/codemirror-themes';
import { Editor } from '@/components/Editor';

type Props = {
  themeSettings?: Settings;
};

function RightPane({ themeSettings }: Props) {
  return <Editor themeSettings={themeSettings} className="border-editor-border border-t" />;
}

export default RightPane;
