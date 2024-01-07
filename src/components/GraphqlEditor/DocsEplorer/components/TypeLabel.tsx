import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

type Props = ComponentPropsWithoutRef<'span'>;

function TypeLabel({ children, className }: Props) {
  return <span className={cn('text-editor-accent ml-[6px]', className)}>{children}</span>;
}

export default TypeLabel;
