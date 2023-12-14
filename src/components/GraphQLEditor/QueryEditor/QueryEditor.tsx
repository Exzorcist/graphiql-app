import { useCallback, useRef, useState } from 'react';
import { AllotmentHandle } from 'allotment';
import { Settings } from '@uiw/codemirror-themes';
import { CSSTransition } from 'react-transition-group';
import { Editor, DEFAULT_EDITOR_HEADER_HEIGHT } from '@/components/Editor';
import Splitter from '@/components/Splitter';
import ToolsPanel from '../ToolsPanel/ToolsPanel';
import { cn } from '@/utils';

const headerHight = DEFAULT_EDITOR_HEADER_HEIGHT;
const DEFAULT_PANES_CLOSED_SIZES = [100, 0];
const DEFAULT_PANES_OPEN_SIZES = [200, 100];
const SPLITTER_DRAG_RESET_THRESHOLD = 10;

type Props = {
  themeSettings?: Settings;
};

function QueryEditor({ themeSettings }: Props) {
  const splitterRef = useRef<AllotmentHandle | null>(null);
  const savedSizesRef = useRef(DEFAULT_PANES_OPEN_SIZES);
  const [toolsPanelIsOpen, setToolsPaneIsOpen] = useState(false);
  const [shouldAnimatePanes, setShouldAnimatePanes] = useState(false);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleChevronClick = useCallback(() => {
    setShouldAnimatePanes(true);

    if (toolsPanelIsOpen) {
      splitterRef.current?.reset();
    } else {
      splitterRef.current?.resize(savedSizesRef.current);
    }
  }, [toolsPanelIsOpen]);

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
    savedSizesRef.current =
      sizes[1] > headerHight + SPLITTER_DRAG_RESET_THRESHOLD ? sizes : DEFAULT_PANES_OPEN_SIZES;
  }, []);

  const handleOnEntered = useCallback(() => {
    setShouldAnimatePanes(false);
  }, []);

  return (
    <Editor themeSettings={themeSettings}>
      <CSSTransition
        in={shouldAnimatePanes}
        timeout={150}
        onEntered={handleOnEntered}
        nodeRef={nodeRef}
      >
        {(state) => {
          return (
            <div className="w-full h-full" ref={nodeRef}>
              <Splitter
                defaultSizes={DEFAULT_PANES_CLOSED_SIZES}
                onDragEnd={handleSplitterDragEnd}
                onChange={handleSplitterChange}
                ref={splitterRef}
                vertical
              >
                <Splitter.Pane className={cn(state === 'entering' && 'animated-pane')}>
                  <Editor.Area />
                </Splitter.Pane>
                <Splitter.Pane
                  className={cn(state === 'entering' && 'animated-pane')}
                  minSize={headerHight}
                  preferredSize={headerHight}
                >
                  <ToolsPanel isOpen={toolsPanelIsOpen} onChevronClick={handleChevronClick} />
                </Splitter.Pane>
              </Splitter>
            </div>
          );
        }}
      </CSSTransition>
    </Editor>
  );
}

export default QueryEditor;
