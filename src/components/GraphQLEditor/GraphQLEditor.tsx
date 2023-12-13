import { useCallback, useState } from 'react';
import QueryEditor from './QueryEditor/QueryEditor';
import ResponsePanel from './ResponsePanel/ResponsePanel';
import Splitter from '../Splitter';
import EndpointField from './EndpointField';
import SideBar from './SideBar';
import DocsPanel from './DocsPanel';

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

function GraphQLEditor() {
  const [showDocs, setShowDocs] = useState(false);

  const openDocs = useCallback(() => setShowDocs((prev) => !prev), []);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="h-full flex w-full flex-col">
        <div className="bg-editor-primary px-4 py-5 border-editor-border border-b">
          <EndpointField onDocsClick={openDocs} />
        </div>
        <Splitter>
          <Splitter.Pane>
            <QueryEditor themeSettings={queryEditorThemeSettings} />
          </Splitter.Pane>
          <Splitter.Pane>
            <ResponsePanel themeSettings={responsePanelThemeSettings} />
          </Splitter.Pane>
          <Splitter.Pane visible={showDocs}>
            <DocsPanel />
          </Splitter.Pane>
        </Splitter>
      </div>
    </div>
  );
}

export default GraphQLEditor;
