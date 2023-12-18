import { Panel, PanelGroup } from 'react-resizable-panels';
import { memo, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Settings } from '@uiw/codemirror-themes';
import PanelResizeHandle from '@/components/PanelResizeHandle/PanelResizeHandle';
import { cn } from '@/utils';
import GraphqlToolsPanel from '../GraphqlToolsPanel/GraphqlToolsPanel';
import { Editor } from '@/components/Editor';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type Props = {
  themeSettings?: Settings;
};

const PANEL_GROUP_ID = 'request-panel-group';
const QUERY_PANEL_MIN_SIZE = 20;

function RequestPanel({ themeSettings }: Props) {
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
            <Editor themeSettings={themeSettings}>
              <PanelGroup id={PANEL_GROUP_ID} autoSaveId={PANEL_GROUP_ID} direction="vertical">
                <Panel
                  id="queryPanel"
                  order={1}
                  minSize={QUERY_PANEL_MIN_SIZE}
                  className={panelClassName}
                >
                  <Editor.Area />
                </Panel>
                {isLaptop && (
                  <>
                    <PanelResizeHandle />
                    <GraphqlToolsPanel
                      id="toolsPanel"
                      order={2}
                      panelGroupId={PANEL_GROUP_ID}
                      onToolsShow={setShowTools}
                      className={panelClassName}
                      themeSettings={themeSettings}
                    />
                  </>
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
