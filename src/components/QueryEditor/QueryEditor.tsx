import LeftPane from './LeftPane/LeftPane';
import RightPane from './RightPane/RightPane';
import Splitter from '../Splitter';

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

function QueryEditor() {
  return (
    <div className="h-screen">
      <Splitter>
        <LeftPane themeSettings={leftPaneThemeSettings} />
        <RightPane themeSettings={rightPaneThemeSettings} />
      </Splitter>
    </div>
  );
}

export default QueryEditor;
