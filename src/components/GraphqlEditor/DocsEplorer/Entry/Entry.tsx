import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { ReactNode } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export type EntryProps = {
  onClick?(): void;
  className?: string;
  children?: ReactNode;
};

function Entry({ children, className, onClick }: EntryProps) {
  return (
    <Button className={cn('flex items-center w-full group', className)} onClick={onClick}>
      {children}
      <ArrowRightIcon className="text-editor-text-color ml-auto h-4 w-4 opacity-0 group-hover:opacity-100" />
    </Button>
  );
}

export default Entry;
