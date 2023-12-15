import { Panel, PanelGroup, ImperativePanelHandle } from 'react-resizable-panels';
import { memo, useCallback, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Settings } from '@uiw/codemirror-themes';
import PanelResizeHandle from '@/components/PanelResizeHandle/PanelResizeHandle';
import {
  useCollapsePanelInit,
  useDefaultExpandSize,
  useKeepPanelCollapsed,
  usePanelSizeState,
} from '@/components/panel-resize-hooks';
import { DEFAULT_EDITOR_HEADER_HEIGHT, Editor } from '@/components/Editor';
import ToolsPanel from '../ToolsPanel/ToolsPanel';
import { cn } from '@/utils';

type Props = {
  themeSettings?: Settings;
};

const PANEL_GROUP_ID = 'request-panel-group';
const TOOLS_PANEL_DEFAULT_SIZE = 30;
const TOOLS_PANEL_MIN_SIZE = 20;
const QUERY_PANEL_MIN_SIZE = 20;

function RequestPanel({ themeSettings }: Props) {
  const [showTools, setShowTools] = useState(false);
  const [toolsPanelCollapseSize] = usePanelSizeState(PANEL_GROUP_ID, DEFAULT_EDITOR_HEADER_HEIGHT);
  const toolsPanelRef = useRef<ImperativePanelHandle | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  useKeepPanelCollapsed(toolsPanelRef, TOOLS_PANEL_MIN_SIZE, [toolsPanelCollapseSize]);
  useCollapsePanelInit(toolsPanelRef, PANEL_GROUP_ID);

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
  }, [onCollapse]);

  const handleExpand = useCallback(() => {
    onExpand();
    setShowTools(true);
  }, [onExpand]);

  return (
    <Transition in={showTools} timeout={150} nodeRef={nodeRef}>
      {(state) => {
        const panelClassName = cn(
          (state === 'entering' || state === 'exiting') && 'animated-panel'
        );

        return (
          <div className="w-full h-full" ref={nodeRef}>
            <Editor themeSettings={themeSettings}>
              <PanelGroup id={PANEL_GROUP_ID} autoSaveId={PANEL_GROUP_ID} direction="vertical">
                <Panel
                  id="queryPanel"
                  minSize={QUERY_PANEL_MIN_SIZE}
                  collapsible
                  onCollapse={handleCollapse}
                  onExpand={handleExpand}
                  className={panelClassName}
                >
                  <Editor.Area />
                </Panel>
                <PanelResizeHandle />
                <Panel
                  id="toolsPanel"
                  ref={toolsPanelRef}
                  minSize={TOOLS_PANEL_MIN_SIZE}
                  collapsible
                  collapsedSize={toolsPanelCollapseSize}
                  onCollapse={handleCollapse}
                  onExpand={handleExpand}
                  className={panelClassName}
                >
                  <ToolsPanel isOpen={showTools} onChevronClick={handleChevronClick} />
                </Panel>
              </PanelGroup>
            </Editor>
          </div>
        );
      }}
    </Transition>
  );
}

export default memo(RequestPanel);
