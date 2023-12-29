import { ComponentProps, memo } from 'react';
import { Settings } from '@uiw/codemirror-themes';
import { Editor } from '@/components/Editor';
import ToolsPanelHeader from './GraphqlToolsHeader';
import HeadersModel from '../HeadersModel/HeadersModel';
import { useAppSelector } from '@/utils/hooks/redux-hooks';

type Props = { themeSettings?: Settings } & ComponentProps<typeof ToolsPanelHeader>;

function GraphqlTools({ themeSettings, ...delegated }: Props) {
  const isHeader = useAppSelector((state) => state.headers.isHeader);
  return (
    <Editor themeSettings={themeSettings}>
      <Editor.Container>
        <Editor.Header>
          <ToolsPanelHeader {...delegated} />
        </Editor.Header>
        {isHeader && <HeadersModel />}
        {!isHeader && <Editor.Area />}
      </Editor.Container>
    </Editor>
  );
}

export default memo(GraphqlTools);
