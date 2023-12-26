import { memo } from 'react';
import { Editor } from '@/components/Editor';
import { responsePanelThemeSettings } from '../themeSettings';

function ResponsePanel() {
  return <Editor themeSettings={responsePanelThemeSettings} readOnly editable={false} />;
}

export default memo(ResponsePanel);
