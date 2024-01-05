import { Panel, PanelGroup } from 'react-resizable-panels';
import { useCallback, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import PanelResizeHandle from '../PanelResizeHandle/PanelResizeHandle';
import GraphqlToolsPanel from './GraphqlTools/GraphqlToolsPanel';
import DocsExplorerDrawer from './DocsEplorer/DocsExplorerDrawer';
import DocsExplorerPanel from './DocsEplorer/DocsExplorerPanel';
import EndpointField from './EndpointField/EndpointField';
import ResponsePanel from './ResponsePanel/ResponsePanel';
import RequestPanel from './RequestPanel/RequestPanel';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { cn } from '@/utils/cn';

const PANEL_GROUP_ID = 'graphql-editor-panel-group';
const QUERY_EDITOR_PANEL_MIN_SIZE = 20;
const RESPONSE_PANEL_MIN_SIZE = 20;

function GraphqlEditor() {
  const [showDocsPanel, setShowDocsPanel] = useState(false);
  const [showDocsDrawer, setShowDocsDrawer] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const isLaptop = useBreakpoint('min-laptop');

  const handleDocsClick = useCallback(() => {
    if (isLaptop) {
      setShowDocsPanel((show) => !show);
    } else {
      setShowDocsDrawer((show) => !show);
    }
  }, [isLaptop]);

  return (
    <div className="flex h-full w-full max-w-[100vw] text-editor-text-color bg-editor-primary font-sans selection:bg-editor-code-selection">
      {!isLaptop && <DocsExplorerDrawer open={showDocsDrawer} onOpenChange={handleDocsClick} />}
      <div className="h-full flex w-full flex-col min-w-0">
        <div className="bg-editor-primary px-4 pt-5  sm:flex sm:items-center sm:gap-5 lg:block">
          <EndpointField
            onSchemaClick={handleDocsClick}
            isSchemaOpen={isLaptop ? showDocsPanel : showDocsDrawer}
          />
        </div>
        <Transition in={isLaptop ? showDocsPanel : showTools} timeout={150} nodeRef={nodeRef}>
          {(state) => {
            const panelClassName = cn(
              (state === 'entering' || state === 'exiting') && 'animated-panel'
            );

            const currentPanel = isLaptop ? (
              <>
                <PanelResizeHandle />
                <DocsExplorerPanel
                  id="docsPanel"
                  order={3}
                  show={showDocsPanel}
                  onShowChange={setShowDocsPanel}
                  panelClassName={panelClassName}
                />
              </>
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
                  className="relative"
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
