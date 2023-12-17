import { ImperativePanelHandle, Panel } from 'react-resizable-panels';
import { ComponentProps, useCallback, useRef, useState } from 'react';
import { Settings } from '@uiw/codemirror-themes';
import GraphqlTools from './GraphqlTools';
import {
  useKeepPanelCollapsed,
  useCollapsePanelInit,
  useDefaultExpandSize,
  usePanelSizeState,
} from '@/hooks/panel-resize-hooks';
import { DEFAULT_EDITOR_HEADER_HEIGHT } from '@/components/Editor';

type Props = {
  panelGroupId: string;
  panelClassName?: string;
  onToolsShow?(isShowing: boolean): void;
  themeSettings?: Settings;
} & ComponentProps<typeof Panel>;

const TOOLS_PANEL_DEFAULT_SIZE = 30;
const TOOLS_PANEL_MIN_SIZE = 20;

function ToolsPanelNew({
  panelGroupId,
  panelClassName,
  onToolsShow,
  themeSettings,
  ...panelProps
}: Props) {
  const [showTools, setShowTools] = useState(false);
  const [toolsPanelCollapseSize] = usePanelSizeState(panelGroupId, DEFAULT_EDITOR_HEADER_HEIGHT);
  const toolsPanelRef = useRef<ImperativePanelHandle | null>(null);

  useKeepPanelCollapsed(toolsPanelRef, TOOLS_PANEL_MIN_SIZE, [toolsPanelCollapseSize]);
  useCollapsePanelInit(toolsPanelRef, panelGroupId);

  const { collapse, expand, onCollapse, onExpand } = useDefaultExpandSize(
    toolsPanelRef,
    TOOLS_PANEL_DEFAULT_SIZE
  );

  const handleChevronClick = useCallback(() => {
    if (showTools) {
      collapse();
    } else {
      expand();
    }
  }, [showTools, collapse, expand]);

  const handleCollapse = useCallback(() => {
    onCollapse();
    setShowTools(false);
    onToolsShow?.(false);
  }, [onCollapse, onToolsShow]);

  const handleExpand = useCallback(() => {
    onExpand();
    setShowTools(true);
    onToolsShow?.(true);
  }, [onExpand, onToolsShow]);

  return (
    <Panel
      ref={toolsPanelRef}
      minSize={TOOLS_PANEL_MIN_SIZE}
      collapsible
      collapsedSize={toolsPanelCollapseSize}
      onCollapse={handleCollapse}
      onExpand={handleExpand}
      className={panelClassName}
      {...panelProps}
    >
      <GraphqlTools
        isOpen={showTools}
        onChevronClick={handleChevronClick}
        themeSettings={themeSettings}
      />
    </Panel>
  );
}

export default ToolsPanelNew;
