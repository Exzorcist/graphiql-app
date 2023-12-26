import { ImperativePanelHandle, Panel } from 'react-resizable-panels';
import { ComponentProps, memo, useCallback, useRef, useState } from 'react';
import GraphqlTools from './GraphqlTools';
import {
  useKeepPanelCollapsed,
  useDefaultExpandSize,
  usePanelSizeState,
} from '@/hooks/panel-resize-hooks';
import { DEFAULT_EDITOR_HEADER_HEIGHT } from '@/components/Editor';
import { requestPanelThemeSettings } from '../themeSettings';
import PanelResizeHandle from '@/components/PanelResizeHandle/PanelResizeHandle';
import { cn } from '@/utils/cn';

type Props = {
  panelGroupId: string;
  panelClassName?: string;
  onShowChange?(isShowing: boolean): void;
} & ComponentProps<typeof Panel>;

const TOOLS_PANEL_DEFAULT_SIZE = 30;
const TOOLS_PANEL_MIN_SIZE = 20;

function GraphqlToolsPanel({ panelGroupId, panelClassName, onShowChange, ...panelProps }: Props) {
  const [showTools, setShowTools] = useState(false);
  const [toolsPanelCollapseSize] = usePanelSizeState(panelGroupId, DEFAULT_EDITOR_HEADER_HEIGHT);
  const toolsPanelRef = useRef<ImperativePanelHandle | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useKeepPanelCollapsed(toolsPanelRef, isCollapsed, [toolsPanelCollapseSize]);

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
    setIsCollapsed(true);
    onCollapse();
    setShowTools(false);
    onShowChange?.(false);
  }, [onCollapse, onShowChange]);

  const handleExpand = useCallback(() => {
    setIsCollapsed(false);
    onExpand();
    setShowTools(true);
    onShowChange?.(true);
  }, [onExpand, onShowChange]);

  return (
    <>
      <PanelResizeHandle className={cn(isCollapsed && !panelClassName && 'mb-[50px]')} />
      <Panel
        ref={toolsPanelRef}
        minSize={TOOLS_PANEL_MIN_SIZE}
        defaultSize={0}
        collapsible
        // collapsedSize should be equal to minSize on the first render
        collapsedSize={toolsPanelCollapseSize || TOOLS_PANEL_MIN_SIZE}
        onCollapse={handleCollapse}
        onExpand={handleExpand}
        className={cn(isCollapsed && !panelClassName && 'absolute bottom-0 w-full', panelClassName)}
        {...panelProps}
      >
        <GraphqlTools
          isOpen={showTools}
          onChevronClick={handleChevronClick}
          themeSettings={requestPanelThemeSettings}
        />
      </Panel>
    </>
  );
}

export default memo(GraphqlToolsPanel);
