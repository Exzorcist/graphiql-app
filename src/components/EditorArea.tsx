import { ComponentProps } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { CreateThemeOptions } from '@uiw/codemirror-themes';
import { cn } from '@/utils';

type Props = {
  themeOptions?: Partial<CreateThemeOptions>;
} & ComponentProps<typeof CodeMirror>;

function EditorArea({ className, themeOptions = {}, ...rest }: Props) {
  return (
    <CodeMirror
      theme={draculaInit(themeOptions)}
      height="100%"
      className={cn('h-full', className)}
      extensions={[
        EditorView.theme({
          '&.cm-editor.cm-focused': { outline: '2px solid transparent', outlineOffset: '2px' },
        }),
        javascript({ jsx: true }),
      ]}
      {...rest}
    />
  );
}

export default EditorArea;
