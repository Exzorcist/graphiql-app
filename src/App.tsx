import { AllotmentHandle } from 'allotment';
import { useCallback, useRef, useState } from 'react';
import Editor from './components/Editor/Editor';
import GraphQLToolsHeader from './components/GraphQLToolsHeader';
import Splitter from './components/Splitter';
import { DEFAULT_HEADER_HEIGHT } from './components/Editor/constants';

const commmonPaneThemeSettings = {
  fontFamily: 'Fira Code, monospace',
  gutterForeground: '#6C6C6C',
  lineHighlight: 'transparent',
  selection: '#D7D4F0',
};

const leftPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: '#282A36',
  gutterBackground: '#2C2E3B',
};

const rightPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: '#303240',
  gutterBackground: '#303240',
};

const DEFAULT_SIZES = [730, 200];

function App() {
  const splitterRef = useRef<AllotmentHandle | null>(null);
  const [splitterSavedSizes, setSplitterSavedSizes] = useState(DEFAULT_SIZES);
  const [toolsPaneIsOpen, setToolsPaneIsOpen] = useState(false);

  const handleChevronClick = () => {
    if (toolsPaneIsOpen) {
      splitterRef.current?.reset();
    } else {
      splitterRef.current?.resize(splitterSavedSizes);
    }
  };

  const handleSplitterChange = useCallback(
    (sizes: number[]) => {
      const [, toolsPaneSize] = sizes;

      if (toolsPaneSize > 50 && !toolsPaneIsOpen) {
        setToolsPaneIsOpen(true);
      } else if (toolsPaneSize <= 50 && toolsPaneIsOpen) {
        setToolsPaneIsOpen(false);
      }
    },
    [toolsPaneIsOpen]
  );

  const handleSplitterDragEnd = (sizes: number[]) => {
    setSplitterSavedSizes(sizes[1] > 60 ? sizes : DEFAULT_SIZES);
  };

  return (
    <div className="h-screen">
      <Splitter>
        <Editor themeSettings={leftPaneThemeSettings}>
          <Splitter
            onDragEnd={handleSplitterDragEnd}
            onChange={handleSplitterChange}
            vertical
            defaultSizes={[100, 0]}
            ref={splitterRef}
          >
            <Editor.Area />
            <Splitter.Pane minSize={DEFAULT_HEADER_HEIGHT} preferredSize={50}>
              <Editor.Container>
                <Editor.Header>
                  <GraphQLToolsHeader
                    isOpen={toolsPaneIsOpen}
                    onChevronClick={handleChevronClick}
                  />
                </Editor.Header>
                <Editor.Area />
              </Editor.Container>
            </Splitter.Pane>
          </Splitter>
        </Editor>
        <Editor themeSettings={rightPaneThemeSettings} />
      </Splitter>
    </div>
  );
}

export default App;
