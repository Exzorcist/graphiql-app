import { ComponentProps } from 'react';
import { cn } from '@/utils';

function SchemaDocs({ className, ...delegated }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('bg-editor-primary flex items-center justify-center h-full w-full', className)}
      {...delegated}
    >
      Docs goes here
    </div>
  );
}

export default SchemaDocs;
