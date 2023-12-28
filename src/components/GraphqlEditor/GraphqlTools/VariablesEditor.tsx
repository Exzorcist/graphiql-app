import { Editor } from '@/components/Editor';
import { requestPanelThemeSettings } from '../themeSettings';

function VariablesEditor() {
  return <Editor themeSettings={requestPanelThemeSettings} />;
}

export default VariablesEditor;
