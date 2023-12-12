import LeftPane from './LeftPane/LeftPane';
import RightPane from './RightPane/RightPane';
import Splitter from '../Splitter';
import { twConfig } from '@/utils';
import EndpointField from './EndpointField';

const commmonPaneThemeSettings = {
  fontFamily: 'Fira Code, monospace',
  gutterForeground: '#6C6C6C',
  lineHighlight: 'transparent',
  selection: '#D7D4F0',
};

const leftPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: twConfig.theme.colors['editor-primary'],
  gutterBackground: '#2C2E3B',
};

const rightPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: twConfig.theme.colors['editor-secondary'],
  gutterBackground: twConfig.theme.colors['editor-secondary'],
};

function QueryEditor() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-editor-primary px-4 py-5">
        <EndpointField />
      </div>
      <Splitter>
        <LeftPane themeSettings={leftPaneThemeSettings} />
        <RightPane themeSettings={rightPaneThemeSettings} />
      </Splitter>
    </div>
  );
}

export default QueryEditor;
