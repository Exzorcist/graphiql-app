import { ComponentProps, PropsWithChildren, createContext } from 'react';
import { Settings } from '@uiw/codemirror-themes';
import EditorArea from './EditorArea';
import EditorHeader from './EditorHeader';
import EditorContainer from './EditorContainer';

type Props = PropsWithChildren<ComponentProps<typeof EditorArea>>;

export const EditorContext = createContext<Settings | null>(null);

function Editor({ children, themeSettings = {}, ...delegated }: Props) {
  return (
    <EditorContext.Provider value={themeSettings ?? null}>
      {children ?? <EditorArea themeSettings={themeSettings} {...delegated} />}
    </EditorContext.Provider>
  );
}

Editor.Area = EditorArea;
Editor.Header = EditorHeader;
Editor.Container = EditorContainer;

export default Editor;
