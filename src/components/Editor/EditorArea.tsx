import {
  ComponentPropsWithRef,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useEffect,
} from 'react';
import CodeMirror, { EditorView, Extension, ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { CreateThemeOptions, Settings } from '@uiw/codemirror-themes';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { materialDarkInit, materialLightInit } from '@uiw/codemirror-theme-material';
import { graphql, updateSchema } from 'cm6-graphql';
import { cn } from '@/utils/cn';
import { useEditorContext, useEditorContainerContext } from './hooks';
import { Theme, useTheme } from '@/providers/ThemeProvider';
import { useAppSelector } from '@/utils/hooks/redux-hooks';
import { selectGraphqlSchema } from '@/redux/graphqlSlice';

type Props = {
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
    const codeMirrorRef = useRef<ReactCodeMirrorRef | null>(null);
    const graphqlSchema = useAppSelector(selectGraphqlSchema);
    const [theme] = useTheme();

    useImperativeHandle(ref, () => codeMirrorRef.current as ReactCodeMirrorRef);

    useEffect(() => {
      if (graphqlSchema) {
        updateSchema(codeMirrorRef.current!.view!, graphqlSchema);
      }
    }, [graphqlSchema]);

    return (
      <CodeMirror
        ref={codeMirrorRef}
        theme={themeInit[theme]({ settings: themeSettings ?? themeSettingsContext })}
        height="100%"
        className={cn('h-full flex flex-col', className)}
        extensions={[styleOverrides, graphql()]}
        style={{ paddingTop: header.visible ? header.height : undefined }}
        data-testid="editor-area"
        basicSetup={{
          tabSize: 4,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          autocompletion: true,
        }}
        {...rest}
      />
    );
  }
);

export default memo(EditorArea);
