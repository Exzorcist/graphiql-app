import { ComponentPropsWithRef, forwardRef, memo, useMemo } from 'react';
import CodeMirror, {
  EditorView,
  Extension,
  ReactCodeMirrorRef,
  BasicSetupOptions,
} from '@uiw/react-codemirror';
import { materialDarkInit, materialLightInit } from '@uiw/codemirror-theme-material';
import { CreateThemeOptions, Settings } from '@uiw/codemirror-themes';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import { foldGutter } from '@codemirror/language';
import { useEditorContext, useEditorContainerContext } from './hooks';
import { Theme, useTheme } from '@/providers/ThemeProvider';
import { cn } from '@/utils/cn';
import styles from './EditorArea.module.css';

export type EditorAreaProps = {
  themeSettings?: Settings;
} & ComponentPropsWithRef<typeof CodeMirror>;

const styleOverrides = EditorView.theme({
  '&.cm-editor': {
    fontSize: 'var(--editor-code-font-size)',
    flex: '1 1 0px',
    overflow: 'hidden',
    outline: '2px solid transparent',
    outlineOffset: '2px',
  },
  '&.cm-editor.cm-focused': { outline: '2px solid transparent', outlineOffset: '2px' },
  '.cm-lineNumbers': { minWidth: '37px' },
  '.cm-foldGutter': { minWidth: '15px' },
  '.cm-gutters': { paddingRight: '4px', maxWidth: '56px' },
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
  foldGutter: false,
};

function markerDOM(open: boolean) {
  const span = document.createElement('span');
  span.textContent = open ? '▾' : '▸';
  span.title = open ? 'Fold Line' : 'Unfold Line';
  span.classList.add(styles.FoldMarker, open ? styles.FoldMarkerOpen : styles.FoldMarkerFolded);
  return span;
}

const foldGutterExtension = foldGutter({ markerDOM });
const defaultExtensionsProp: Extension[] = [];

const EditorArea = forwardRef<ReactCodeMirrorRef, EditorAreaProps>(
  ({ extensions = defaultExtensionsProp, className, themeSettings, ...rest }, ref) => {
    const themeSettingsContext = useEditorContext();
    const { header } = useEditorContainerContext();
    const [theme] = useTheme();

    const themeMemo = useMemo(
      () => themeInit[theme]({ settings: themeSettings ?? themeSettingsContext }),
      [theme, themeSettings, themeSettingsContext]
    );

    const extensionsMemo = useMemo(
      () => [styleOverrides, foldGutterExtension, ...extensions],
      [extensions]
    );

    return (
      <CodeMirror
        ref={ref}
        theme={themeMemo}
        height="100%"
        className={cn('h-full flex flex-col', className)}
        extensions={extensionsMemo}
        style={{ paddingTop: header.visible ? header.height : undefined }}
        data-testid="editor-area"
        basicSetup={basicSetup}
        {...rest}
      />
    );
  }
);

export default memo(EditorArea);
