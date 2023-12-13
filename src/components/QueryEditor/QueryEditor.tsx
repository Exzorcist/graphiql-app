import LeftPane from './LeftPane/LeftPane';
import RightPane from './RightPane/RightPane';
import Splitter from '../Splitter';
import EndpointField from './EndpointField';
import SideBar from './SideBar';

const commmonPaneThemeSettings = {
  fontFamily: 'var(--editor-code-font-family)',
  gutterForeground: '#6C6C6C',
  lineHighlight: 'transparent',
  selection: '#D7D4F0',
};

const leftPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: 'var(--editor-primary-color)',
  gutterBackground: '#2C2E3B',
};

const rightPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: 'var(--editor-secondary-color)',
  gutterBackground: 'var(--editor-secondary-color)',
};

function QueryEditor() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="h-full flex w-full flex-col">
        <div className="bg-editor-primary px-4 py-5 border-editor-border border-b">
          <EndpointField />
        </div>
        <Splitter>
          <LeftPane themeSettings={leftPaneThemeSettings} />
          <RightPane themeSettings={rightPaneThemeSettings} />
        </Splitter>
      </div>
    </div>
  );
}

export default QueryEditor;
