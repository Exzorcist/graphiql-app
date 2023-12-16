import { ComponentProps, PropsWithChildren, createContext } from 'react';
import { Settings } from '@uiw/codemirror-themes';
import EditorArea from './EditorArea';
import EditorHeader from './EditorHeader';
import EditorContainer from './EditorContainer';
import { cn } from '@/utils';

type Props = PropsWithChildren<ComponentProps<typeof EditorArea>>;

export const EditorContext = createContext<Settings | null>(null);

function Editor({ children, className, themeSettings = {}, ...delegated }: Props) {
  return (
    <EditorContext.Provider value={themeSettings ?? null}>
      {children ? (
        <div className={cn('h-full w-full fancy-scrollbar', className)}>{children}</div>
      ) : (
        <EditorArea themeSettings={themeSettings} className={className} {...delegated} />
      )}
    </EditorContext.Provider>
  );
}

Editor.Area = EditorArea;
Editor.Header = EditorHeader;
Editor.Container = EditorContainer;

export default Editor;
