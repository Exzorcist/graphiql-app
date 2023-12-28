import { ComponentPropsWithRef, forwardRef, memo } from 'react';
import CodeMirror, {
  EditorView,
  Extension,
  ReactCodeMirrorRef,
  BasicSetupOptions,
} from '@uiw/react-codemirror';
import { materialDarkInit, materialLightInit } from '@uiw/codemirror-theme-material';
import { CreateThemeOptions, Settings } from '@uiw/codemirror-themes';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { useEditorContext, useEditorContainerContext } from './hooks';
import { Theme, useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/utils/cn';

export type EditorAreaProps = {
  themeSettings?: Settings;
} & ComponentPropsWithRef<typeof CodeMirror>;

const styleOverrides = EditorView.theme({
  '&.cm-editor': {
    fontSize: 'var(--editor-code-font-size)',
    flex: '1 1 0px',
    overflow: 'hidden',
  },
  '&.cm-editor.cm-focused': { outline: '2px solid transparent', outlineOffset: '2px' },
  '.cm-lineNumbers': { minWidth: '28px' },
  '.cm-foldGutter': { minWidth: '11px' },
});

const themeInit: Record<Theme, (options?: Partial<CreateThemeOptions> | undefined) => Extension> = {
  dracula: draculaInit,
  dark: materialDarkInit,
  light: materialLightInit,
};

const basicSetup: BasicSetupOptions = {
  tabSize: 2,
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  autocompletion: true,
};

const EditorArea = forwardRef<ReactCodeMirrorRef, EditorAreaProps>(
  ({ extensions = [], className, themeSettings, ...rest }, ref) => {
    const themeSettingsContext = useEditorContext();
    const { header } = useEditorContainerContext();
    const [theme] = useTheme();

    return (
      <CodeMirror
        ref={ref}
        theme={themeInit[theme]({ settings: themeSettings ?? themeSettingsContext })}
        height="100%"
        className={cn('h-full flex flex-col', className)}
        extensions={[styleOverrides, ...extensions]}
        style={{ paddingTop: header.visible ? header.height : undefined }}
        data-testid="editor-area"
        basicSetup={basicSetup}
        {...rest}
      />
    );
  }
);

export default memo(EditorArea);
