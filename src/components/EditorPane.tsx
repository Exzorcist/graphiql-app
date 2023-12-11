import { ComponentPropsWithoutRef } from 'react';
import EditorArea from './EditorArea';
import { cn } from '@/utils';

type Props = ComponentPropsWithoutRef<typeof EditorArea>;

function EditorPane({ className, ...delegated }: Props) {
  return (
    <div className={cn('h-full', className)}>
      <EditorArea {...delegated} />
    </div>
  );
}

export default EditorPane;
