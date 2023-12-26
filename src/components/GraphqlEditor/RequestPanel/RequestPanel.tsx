import { Panel, PanelGroup } from 'react-resizable-panels';
import { Transition } from 'react-transition-group';
import { memo, useRef, useState } from 'react';
import GraphqlToolsPanel from '../GraphqlToolsPanel/GraphqlToolsPanel';
import { requestPanelThemeSettings } from '../themeSettings';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { Editor } from '@/components/Editor';
import { cn } from '@/utils/cn';
import RequestEditor from './RequestEditor';

const PANEL_GROUP_ID = 'request-panel-group';
const QUERY_PANEL_MIN_SIZE = 20;

function RequestPanel() {
  const [showTools, setShowTools] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const isLaptop = useBreakpoint('min-laptop');

  return (
    <Transition in={showTools} timeout={150} nodeRef={nodeRef}>
      {(state) => {
        const panelClassName = cn(
          (state === 'entering' || state === 'exiting') && 'animated-panel'
        );

        return (
          <div className="w-full h-full" ref={nodeRef}>
            <Editor themeSettings={requestPanelThemeSettings}>
              <PanelGroup
                id={PANEL_GROUP_ID}
                autoSaveId={PANEL_GROUP_ID}
                direction="vertical"
                className="relative"
              >
                <Panel
                  id="queryPanel"
                  order={1}
                  minSize={QUERY_PANEL_MIN_SIZE}
                  className={panelClassName}
                >
                  <RequestEditor />
                </Panel>
                {isLaptop && (
                  <GraphqlToolsPanel
                    id="toolsPanel"
                    order={2}
                    panelGroupId={PANEL_GROUP_ID}
                    onShowChange={setShowTools}
                    panelClassName={panelClassName}
                  />
                )}
              </PanelGroup>
            </Editor>
          </div>
        );
      }}
    </Transition>
  );
}

export default memo(RequestPanel);
