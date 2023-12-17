import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { memo } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils';

export type GraphqlToolsHeaderProps = {
  onVariablesClick?(): void;
  onHeadersclick?(): void;
  onChevronClick?(): void;
  isOpen?: boolean;
  className?: string;
};

function GraphqlToolsHeader({
  isOpen = false,
  onChevronClick,
  onHeadersclick,
  onVariablesClick,
  className,
}: GraphqlToolsHeaderProps) {
  return (
    <div className={cn('flex gap-6 w-full', className)}>
      <Button onClick={onVariablesClick}>Variables</Button>
      <Button onClick={onHeadersclick}>Headers</Button>
      <Button className="ml-auto" onClick={onChevronClick}>
        <ChevronUpIcon className={cn('h-6 w-6', isOpen && 'rotate-180')} />
      </Button>
    </div>
  );
}

export default memo(GraphqlToolsHeader);
