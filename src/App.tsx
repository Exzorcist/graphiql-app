import { Allotment } from 'allotment';
import EditorPane from './components/EditorPane';
import 'allotment/dist/style.css';

const commmonPaneThemeSettings = {
  gutterForeground: '#6C6C6C',
  lineHighlight: 'transparent',
  selection: '#D7D4F0',
};

const leftPaneThemeSettings = { ...commmonPaneThemeSettings, gutterBackground: '#2C2E3B' };

const rightPaneThemeSettings = {
  ...commmonPaneThemeSettings,
  background: '#303240',
  gutterBackground: '#303240',
};

function App() {
  return (
    <div className="h-screen">
      <Allotment minSize={200}>
        <EditorPane themeSettings={leftPaneThemeSettings} />
        <EditorPane themeSettings={rightPaneThemeSettings} />
      </Allotment>
    </div>
  );
}

export default App;
