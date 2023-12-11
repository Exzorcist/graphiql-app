import { ComponentPropsWithRef, forwardRef } from 'react';
import CodeMirror, { EditorView, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { Settings } from '@uiw/codemirror-themes';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { cn } from '@/utils';

type Props = {
  themeSettings?: Settings;
} & ComponentPropsWithRef<typeof CodeMirror>;

const styleOverrides = EditorView.theme({
  '&': { fontSize: '16px' },
  '.cm-editor.cm-focused': { outline: '2px solid transparent', outlineOffset: '2px' },
  '.cm-lineNumbers': { minWidth: '26px' },
});

const EditorArea = forwardRef<ReactCodeMirrorRef, Props>(
  ({ className, themeSettings = {}, ...rest }, ref) => {
    return (
      <CodeMirror
        ref={ref}
        theme={draculaInit({ settings: themeSettings })}
        height="100%"
        className={cn('h-full', className)}
        extensions={[styleOverrides, javascript({ jsx: true })]}
        {...rest}
      />
    );
  }
);

export default EditorArea;
