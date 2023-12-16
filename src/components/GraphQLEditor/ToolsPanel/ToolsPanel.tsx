import { ComponentProps, memo } from 'react';
import { Settings } from '@uiw/codemirror-themes';
import { Editor } from '@/components/Editor';
import ToolsPanelHeader from './ToolsPanelHeader';

type Props = { themeSettings?: Settings } & ComponentProps<typeof ToolsPanelHeader>;

function ToolsPanel({ themeSettings, ...delegated }: Props) {
  return (
    <Editor themeSettings={themeSettings}>
      <Editor.Container>
        <Editor.Header>
          <ToolsPanelHeader {...delegated} />
        </Editor.Header>
        <Editor.Area />
      </Editor.Container>
    </Editor>
  );
}

export default memo(ToolsPanel);
