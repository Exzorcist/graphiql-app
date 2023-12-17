import { ComponentProps, memo, useEffect } from 'react';
import { cn } from '@/utils';
import { useEditorContext, useEditorContainerContext } from './hooks';
import { DEFAULT_EDITOR_HEADER_HEIGHT } from './constants';

export type EditorHeaderProps = {
  size?: number;
} & ComponentProps<'div'>;

function EditorHeader({
  children,
  size = DEFAULT_EDITOR_HEADER_HEIGHT,
  className,
}: EditorHeaderProps) {
  const { background } = useEditorContext();
  const { header } = useEditorContainerContext();

  useEffect(() => {
    header.set(true);
  }, [header]);

  return (
    <div
      className={cn('w-full absolute top-0 left-0 px-4 flex items-center', className)}
      style={{ backgroundColor: background, height: size }}
    >
      {children}
    </div>
  );
}

export default memo(EditorHeader);
