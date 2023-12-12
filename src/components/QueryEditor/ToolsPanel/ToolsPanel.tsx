import { ComponentProps, memo } from 'react';
import { Editor } from '@/components/Editor';
import ToolsPanelHeader from './ToolsPanelHeader';

type Props = ComponentProps<typeof ToolsPanelHeader>;

function ToolsPanel(props: Props) {
  return (
    <Editor.Container>
      <Editor.Header>
        <ToolsPanelHeader {...props} />
      </Editor.Header>
      <Editor.Area />
    </Editor.Container>
  );
}

export default memo(ToolsPanel);
