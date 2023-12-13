import { ComponentProps } from 'react';
import { cn } from '@/utils';

function DocsPanel({ className, ...delegated }: ComponentProps<'div'>) {
  return <div className={cn('bg-editor-primary h-full w-full', className)} {...delegated} />;
}

export default DocsPanel;
