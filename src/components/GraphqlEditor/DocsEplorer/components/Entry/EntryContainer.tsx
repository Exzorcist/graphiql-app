import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ComponentProps } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export type EntryContainerProps = ComponentProps<typeof Button>;

function EntryContainer({ children, className, ...delegated }: EntryContainerProps) {
  return (
    <Button
      className={cn(
        'flex items-center w-full group text-sm hover:text-editor-text-color',
        className
      )}
      {...delegated}
    >
      {children}
      <ArrowRightIcon className="text-editor-text-color ml-auto h-4 w-4 opacity-0 group-hover:opacity-100" />
    </Button>
  );
}

export default EntryContainer;
