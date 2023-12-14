import { ComponentPropsWithRef, forwardRef, memo } from 'react';
import CodeMirror, { EditorView, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { Settings } from '@uiw/codemirror-themes';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { cn } from '@/utils';
import { useEditorContext, useEditorContainerContext } from './hooks';

type Props = {
  themeSettings?: Settings;
} & ComponentPropsWithRef<typeof CodeMirror>;

const styleOverrides = EditorView.theme({
  '&': { fontSize: 'var(--editor-code-font-size)' },
  '&.cm-focused': { outline: '2px solid transparent', outlineOffset: '2px' },
  '.cm-lineNumbers': { minWidth: '28px' },
});

const EditorArea = forwardRef<ReactCodeMirrorRef, Props>(
  ({ className, themeSettings, ...rest }, ref) => {
    const themeSettingsContext = useEditorContext();
    const { header } = useEditorContainerContext();

    return (
      <CodeMirror
        ref={ref}
        theme={draculaInit({ settings: themeSettings ?? themeSettingsContext })}
        height="100%"
        className={cn('h-full', className)}
        extensions={[styleOverrides, javascript({ jsx: true })]}
        style={{ paddingTop: header.visible ? header.height : undefined }}
        {...rest}
      />
    );
  }
);

export default memo(EditorArea);
