import { useCallback, useRef, useState } from 'react';
import { AllotmentHandle } from 'allotment';
import { Settings } from '@uiw/codemirror-themes';
import { CSSTransition } from 'react-transition-group';
import { Editor, DEFAULT_EDITOR_HEADER_HEIGHT } from '@/components/Editor';
import Splitter from '@/components/Splitter';
import ToolsPanel from '../ToolsPanel/ToolsPanel';
import { cn } from '@/utils';

const headerHight = DEFAULT_EDITOR_HEADER_HEIGHT;
const DEFAULT_SPLITTER_SIZES = [100, 30];
const SPLITTER_DRAG_RESET_THRESHOLD = 10;

type Props = {
  themeSettings?: Settings;
};

function QueryEditor({ themeSettings }: Props) {
  const splitterRef = useRef<AllotmentHandle | null>(null);
  const [splitterSavedSizes, setSplitterSavedSizes] = useState(DEFAULT_SPLITTER_SIZES);
  const [toolsPanelIsOpen, setToolsPaneIsOpen] = useState(false);

  const handleChevronClick = useCallback(() => {
    if (toolsPanelIsOpen) {
      splitterRef.current?.reset();
    } else {
      splitterRef.current?.resize(splitterSavedSizes);
    }
  }, [toolsPanelIsOpen, splitterSavedSizes]);

  const handleSplitterChange = useCallback(
    (sizes: number[]) => {
      const [, toolsPanelSize] = sizes;

      if (toolsPanelSize > headerHight && !toolsPanelIsOpen) {
        setToolsPaneIsOpen(true);
      } else if (toolsPanelSize <= headerHight && toolsPanelIsOpen) {
        setToolsPaneIsOpen(false);
      }
    },
    [toolsPanelIsOpen]
  );

  const handleSplitterDragEnd = useCallback((sizes: number[]) => {
    setSplitterSavedSizes(
      sizes[1] > headerHight + SPLITTER_DRAG_RESET_THRESHOLD ? sizes : DEFAULT_SPLITTER_SIZES
    );
  }, []);

  return (
    <Editor themeSettings={themeSettings}>
      <CSSTransition in={toolsPanelIsOpen} timeout={150}>
        {(state) => {
          return (
            <Splitter
              onDragEnd={handleSplitterDragEnd}
              onChange={handleSplitterChange}
              vertical
              defaultSizes={[100, 0]}
              ref={splitterRef}
            >
              <Splitter.Pane
                className={cn(['entered', 'entering', 'exited'].includes(state) && 'animated-pane')}
              >
                <Editor.Area />
              </Splitter.Pane>
              <Splitter.Pane
                className={cn(['entered', 'entering', 'exited'].includes(state) && 'animated-pane')}
                minSize={headerHight}
                preferredSize={headerHight}
              >
                <ToolsPanel isOpen={toolsPanelIsOpen} onChevronClick={handleChevronClick} />
              </Splitter.Pane>
            </Splitter>
          );
        }}
      </CSSTransition>
    </Editor>
  );
}

export default QueryEditor;
