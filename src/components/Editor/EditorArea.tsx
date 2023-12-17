import { ComponentPropsWithRef, forwardRef, memo } from 'react';
import CodeMirror, { EditorView, Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { CreateThemeOptions, Settings } from '@uiw/codemirror-themes';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { materialDarkInit, materialLightInit } from '@uiw/codemirror-theme-material';
import { javascript } from '@codemirror/lang-javascript';
import { cn } from '@/utils';
import { useEditorContext, useEditorContainerContext } from './hooks';
import { Theme, useTheme } from '@/providers/ThemeProvider';

type Props = {
  themeSettings?: Settings;
} & ComponentPropsWithRef<typeof CodeMirror>;

const styleOverrides = EditorView.theme({
  '&.cm-editor': {
    fontSize: 'var(--editor-code-font-size)',
    flex: '1 1 0px',
    overflow: 'hidden',
  },
  '&.cm-focused': { outline: '2px solid transparent', outlineOffset: '2px' },
  '.cm-lineNumbers': { minWidth: '28px' },
});

const themeInit: Record<Theme, (options?: Partial<CreateThemeOptions> | undefined) => Extension> = {
  dracula: draculaInit,
  dark: materialDarkInit,
  light: materialLightInit,
};

const EditorArea = forwardRef<ReactCodeMirrorRef, Props>(
  ({ className, themeSettings, ...rest }, ref) => {
    const themeSettingsContext = useEditorContext();
    const { header } = useEditorContainerContext();
    const [theme] = useTheme();

    return (
      <CodeMirror
        ref={ref}
        theme={themeInit[theme]({ settings: themeSettings ?? themeSettingsContext })}
        height="100%"
        className={cn('h-full flex flex-col', className)}
        extensions={[styleOverrides, javascript({ jsx: true })]}
        style={{ paddingTop: header.visible ? header.height : undefined }}
        {...rest}
      />
    );
  }
);

export default memo(EditorArea);
