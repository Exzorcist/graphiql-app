import { memo } from 'react';
import { graphqlLanguageSupport } from 'cm6-graphql';
import { Editor } from '@/components/Editor';
import { responsePanelThemeSettings } from '../themeSettings';

function ResponsePanel() {
  return (
    <Editor
      themeSettings={responsePanelThemeSettings}
      extensions={[graphqlLanguageSupport()]}
      readOnly
      editable={false}
    />
  );
}
export default memo(ResponsePanel);
