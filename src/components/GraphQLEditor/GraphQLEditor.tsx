import { useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { AllotmentHandle } from 'allotment';
import QueryEditor from './QueryEditor/QueryEditor';
import ResponsePanel from './ResponsePanel/ResponsePanel';
import Splitter from '../Splitter';
import EndpointField from './EndpointField';
import SideBar from './SideBar';
import DocsPanel from './DocsPanel';
import { cn } from '@/utils';

const commmonEditorThemeSettings = {
  fontFamily: 'rgb(var(--editor-code-font-family))',
  gutterForeground: 'rgb(var(--editor-line-numbers-color))',
  selection: 'rgb(var(--editor-code-selection-color))',
  lineHighlight: 'transparent',
};

const queryEditorThemeSettings = {
  ...commmonEditorThemeSettings,
  background: 'rgb(var(--editor-primary-color))',
  gutterBackground: 'rgb(var(--editor-gutter-color))',
};

const responsePanelThemeSettings = {
  ...commmonEditorThemeSettings,
  background: 'rgb(var(--editor-secondary-color))',
  gutterBackground: 'rgb(var(--editor-secondary-color))',
};

const DEFAULT_PANE_SIZES = [50, 50, 0];
const DOCS_PANEL_RATIO = 4;

function GraphQLEditor() {
  const [showDocs, setShowDocs] = useState(false);
  const splitterRef = useRef<AllotmentHandle | null>(null);
  const leftPaneRef = useRef<HTMLDivElement | null>(null);
  const rightPaneRef = useRef<HTMLDivElement | null>(null);
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const paneSizes = useRef<number[]>([]);
  const docsSashRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    docsSashRef.current = nodeRef.current!.querySelector('.sash-container .sash:last-child');
    docsSashRef.current?.classList.add('docs-sash');
  }, []);

  useEffect(() => {
    const leftPaneSize = parseFloat(leftPaneRef.current!.style.width);
    const rightPaneSize = parseFloat(rightPaneRef.current!.style.width);
    paneSizes.current = [leftPaneSize, rightPaneSize];
  }, []);

  const handleSplitterDragEnd = useCallback((sizes: number[]) => {
    paneSizes.current = sizes;
  }, []);

  const openDocs = () => {
    setShowDocs((prev) => !prev);

    let [left, right] = paneSizes.current;

    if (showDocs) {
      splitterRef.current?.resize([left, right, 0]);
    } else {
      const containerSize = left + right;
      const docsSize = containerSize / DOCS_PANEL_RATIO;
      const idealSize = (containerSize - docsSize) / 2;

      if (left < right) {
        right = Math.max(right - docsSize, idealSize);
      } else {
        right = idealSize;
        left = idealSize;
      }

      splitterRef.current?.resize([left, right, docsSize]);
    }
  };

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="h-full flex w-full flex-col">
        <div className="bg-editor-primary px-4 py-5 border-editor-border border-b">
          <EndpointField onDocsClick={openDocs} />
        </div>
        <Transition in={showDocs} timeout={150} nodeRef={nodeRef}>
          {(state) => {
            const className = cn((state === 'entering' || state === 'exiting') && 'animated-pane');
            const paneProps = { className, prefferredSize: '50%' };

            return (
              <div className="w-full h-full" ref={nodeRef}>
                <Splitter
                  defaultSizes={DEFAULT_PANE_SIZES}
                  ref={splitterRef}
                  onDragEnd={handleSplitterDragEnd}
                  proportionalLayout
                >
                  <Splitter.Pane {...paneProps} ref={leftPaneRef}>
                    <QueryEditor themeSettings={queryEditorThemeSettings} />
                  </Splitter.Pane>
                  <Splitter.Pane {...paneProps} ref={rightPaneRef}>
                    <ResponsePanel themeSettings={responsePanelThemeSettings} />
                  </Splitter.Pane>
                  <Splitter.Pane {...paneProps} minSize={0} preferredSize="0%">
                    <DocsPanel />
                  </Splitter.Pane>
                </Splitter>
              </div>
            );
          }}
        </Transition>
      </div>
    </div>
  );
}

export default GraphQLEditor;
