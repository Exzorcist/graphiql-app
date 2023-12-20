import { Panel, PanelGroup } from 'react-resizable-panels';
import { useCallback, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import PanelResizeHandle from '../PanelResizeHandle/PanelResizeHandle';
import GraphqlToolsPanel from './GraphqlToolsPanel/GraphqlToolsPanel';
import DocsExplorerDrawer from './DocsEplorer/DocsExplorerDrawer';
import DocsExplorerPanel from './DocsEplorer/DocsExplorerPanel';
import EndpointField from './EndpointField/EndpointField';
import ResponsePanel from './ResponsePanel/ResponsePanel';
import RequestPanel from './RequestPanel/RequestPanel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import SideBar from './SideBar';
import { cn } from '@/utils/cn';

const PANEL_GROUP_ID = 'graphql-editor-panel-group';
const QUERY_EDITOR_PANEL_MIN_SIZE = 20;
const RESPONSE_PANEL_MIN_SIZE = 20;

function GraphqlEditor() {
  const [showDocs, setShowDocs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const isLaptop = useBreakpoint('min-laptop');

  const handleDocsClick = useCallback(() => {
    setShowDocs((prev) => !prev);
  }, []);

  return (
    <div className="flex h-full w-full text-editor-text-color bg-editor-primary font-editor-font-family">
      {isLaptop && <SideBar />}
      {!isLaptop && <DocsExplorerDrawer open={showDocs} onOpenChange={setShowDocs} />}
      <div className="h-full flex w-full flex-col">
        <div className="bg-editor-primary px-4 py-5 border-editor-border border-b">
          <EndpointField onSchemaClick={handleDocsClick} isSchemaOpen={showDocs} />
        </div>
        <Transition in={isLaptop ? showDocs : showTools} timeout={150} nodeRef={nodeRef}>
          {(state) => {
            const panelClassName = cn(
              (state === 'entering' || state === 'exiting') && 'animated-panel'
            );

            const currentPanel = isLaptop ? (
              <DocsExplorerPanel
                id="docsPanel"
                order={3}
                show={showDocs}
                onShowChange={setShowDocs}
                panelClassName={panelClassName}
              />
            ) : (
              <GraphqlToolsPanel
                id="toolsPanel"
                order={3}
                onShowChange={setShowTools}
                panelGroupId={PANEL_GROUP_ID}
                panelClassName={panelClassName}
              />
            );

            return (
              <div className="w-full h-full" ref={nodeRef}>
                <PanelGroup
                  id={PANEL_GROUP_ID}
                  autoSaveId={PANEL_GROUP_ID}
                  direction={isLaptop ? 'horizontal' : 'vertical'}
                >
                  <Panel
                    id="requestPanel"
                    order={1}
                    minSize={QUERY_EDITOR_PANEL_MIN_SIZE}
                    className={panelClassName}
                  >
                    <RequestPanel />
                  </Panel>
                  <PanelResizeHandle />
                  <Panel
                    id="responsePanel"
                    order={2}
                    minSize={RESPONSE_PANEL_MIN_SIZE}
                    className={panelClassName}
                  >
                    <ResponsePanel />
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

export default GraphqlEditor;
