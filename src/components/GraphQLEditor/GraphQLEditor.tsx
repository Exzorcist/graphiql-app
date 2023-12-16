import { useCallback, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { ImperativePanelHandle, Panel, PanelGroup } from 'react-resizable-panels';
import RequestPanel from './RequestPanel/RequestPanel';
import ResponsePanel from './ResponsePanel/ResponsePanel';
import EndpointField from './EndpointField/EndpointField';
import SideBar from './SideBar';
import DocsPanel from './DocsPanel';
import PanelResizeHandle from '../PanelResizeHandle/PanelResizeHandle';
import { requestPanelThemeSettings, responsePanelThemeSettings } from './themeSettings';
import { useCollapsePanelInit, useDefaultExpandSize } from '../../hooks/panel-resize-hooks';
import { cn } from '@/utils';
import ToolsPanelNew from './ToolsPanel/ToolsPanelNew';
import { useBreakpoint } from '@/hooks/breakpoints-hooks';

const PANEL_GROUP_ID = 'graphql-editor-panel-group';
const QUERY_EDITOR_PANEL_MIN_SIZE = 20;
const RESPONSE_PANEL_MIN_SIZE = 20;
const DOCS_PANEL_MIN_SIZE = 20;
const DOCS_PANEL_DEFAULT_SIZE = 25;

function GraphQLEditor() {
  const [showDocs, setShowDocs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const docsPanelRef = useRef<ImperativePanelHandle | null>(null);
  const isLaptop = useBreakpoint('min-laptop');

  useCollapsePanelInit(docsPanelRef, PANEL_GROUP_ID);

  const { collapse, expand, onExpand, onCollapse } = useDefaultExpandSize(
    docsPanelRef,
    DOCS_PANEL_DEFAULT_SIZE
  );

  const handleDocsClick = useCallback(() => {
    if (showDocs) {
      collapse();
    } else {
      expand();
    }
  }, [showDocs, collapse, expand]);

  const handleDocsExpand = useCallback(() => {
    onExpand();
    setShowDocs(true);
  }, [onExpand]);

  const handleDocsCollapse = useCallback(() => {
    onCollapse();
    setShowDocs(false);
  }, [onCollapse]);

  return (
    <div className="flex h-screen">
      {isLaptop && <SideBar />}
      <div className="h-full flex w-full flex-col">
        <div className="bg-editor-primary px-4 py-5 border-editor-border border-b">
          <EndpointField onDocsClick={handleDocsClick} />
        </div>
        <Transition in={isLaptop ? showDocs : showTools} timeout={150} nodeRef={nodeRef}>
          {(state) => {
            const panelClassName = cn(
              (state === 'entering' || state === 'exiting') && 'animated-panel'
            );

            let currentPanel;

            if (isLaptop) {
              currentPanel = (
                <Panel
                  id="docsPanel"
                  order={3}
                  ref={docsPanelRef}
                  collapsible
                  collapsedSize={0}
                  minSize={DOCS_PANEL_MIN_SIZE}
                  onCollapse={handleDocsCollapse}
                  onExpand={handleDocsExpand}
                  className={panelClassName}
                >
                  <DocsPanel />
                </Panel>
              );
            } else {
              currentPanel = (
                <ToolsPanelNew
                  id="toolsPanel"
                  panelGroupId={PANEL_GROUP_ID}
                  className={panelClassName}
                  order={3}
                  themeSettings={requestPanelThemeSettings}
                  onToolsShow={setShowTools}
                />
              );
            }

            return (
              <div className="w-full h-full" ref={nodeRef}>
                <PanelGroup
                  direction={isLaptop ? 'horizontal' : 'vertical'}
                  id={PANEL_GROUP_ID}
                  autoSaveId={PANEL_GROUP_ID}
                >
                  <Panel
                    id="requestPanel"
                    order={1}
                    minSize={QUERY_EDITOR_PANEL_MIN_SIZE}
                    className={panelClassName}
                  >
                    <RequestPanel themeSettings={requestPanelThemeSettings} />
                  </Panel>
                  <PanelResizeHandle />
                  <Panel
                    id="responsePanel"
                    order={2}
                    minSize={RESPONSE_PANEL_MIN_SIZE}
                    className={panelClassName}
                  >
                    <ResponsePanel themeSettings={responsePanelThemeSettings} />
                  </Panel>
                  <PanelResizeHandle />
                  {currentPanel}
                </PanelGroup>
              </div>
            );
          }}
        </Transition>
      </div>
    </div>
  );
}

export default GraphQLEditor;
