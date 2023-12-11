import { ComponentProps, createContext, useMemo, useState } from 'react';
import { cn } from '@/utils';
import { DEFAULT_HEADER_HEIGHT } from './constants';

type Props = ComponentProps<'div'>;

type SetHeader = (visible: boolean, height?: number) => void;

export type EditorContainerContextType = {
  header: {
    visible: boolean;
    height: number; // in px
    set: SetHeader;
  };
};

export const EditorContainerContext = createContext<EditorContainerContextType>({
  header: {
    visible: false,
    height: DEFAULT_HEADER_HEIGHT,
    set: () => null,
  },
});

function EditorContainer({ children, className }: Props) {
  const [state, setState] = useState({
    header: { visible: false, height: DEFAULT_HEADER_HEIGHT },
  });

  const setHeader: SetHeader = (visible, height = DEFAULT_HEADER_HEIGHT) => {
    setState((prev) => ({ ...prev, header: { visible, height } }));
  };

  const value = useMemo(
    () => ({ header: { ...state.header, set: setHeader } }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(state)]
  );

  return (
    <EditorContainerContext.Provider value={value}>
      <div className={cn('h-full relative', className)}>{children}</div>
    </EditorContainerContext.Provider>
  );
}

export default EditorContainer;
