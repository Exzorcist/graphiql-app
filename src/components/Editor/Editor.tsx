import { ComponentProps, PropsWithChildren, createContext, memo } from 'react';
import { Settings } from '@uiw/codemirror-themes';
import EditorArea from './EditorArea';
import EditorHeader from './EditorHeader';
import EditorContainer from './EditorContainer';

type Props = PropsWithChildren<ComponentProps<typeof EditorArea>>;

export const EditorContext = createContext<Settings | null>(null);

const EditorInner = memo(({ children, className, themeSettings = {}, ...delegated }: Props) => {
  return (
    <EditorContext.Provider value={themeSettings ?? null}>
      {children ?? (
        <EditorArea themeSettings={themeSettings} className={className} {...delegated} />
      )}
    </EditorContext.Provider>
  );
});

const Editor = Object.assign(EditorInner, {
  Area: EditorArea,
  Header: EditorHeader,
  Container: EditorContainer,
});

Editor.displayName = 'Editor';

export default Editor;
