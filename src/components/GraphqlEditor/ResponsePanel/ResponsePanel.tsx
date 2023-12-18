import { memo } from 'react';
import { Editor } from '@/components/Editor';
import { responsePanelThemeSettings } from '../themeSettings';

function ResponsePanel() {
  return <Editor themeSettings={responsePanelThemeSettings} />;
}

export default memo(ResponsePanel);
