import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { memo } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { GraphqlTool } from './GraphqlTools';

export type GraphqlToolsHeaderProps = {
  onVariablesClick?(): void;
  onChevronClick?(): void;
  onHeadersClick?(): void;
  activeTool?: GraphqlTool | null;
  className?: string;
  open?: boolean;
};

function GraphqlToolsHeader({
  open = false,
  activeTool,
  onChevronClick,
  onHeadersClick,
  onVariablesClick,
  className,
}: GraphqlToolsHeaderProps) {
  const { t } = useLocalizationContext();

  return (
    <div className={cn('flex gap-6 w-full', className)}>
      <Button onClick={onVariablesClick} active={activeTool === 'variables'}>
        {t.page.editor.variables}
      </Button>
      <Button onClick={onHeadersClick} active={activeTool === 'headers'}>
        {t.page.editor.headers}
      </Button>
      <Button className="ml-auto" onClick={onChevronClick}>
        <ChevronUpIcon className={cn('h-6 w-6', open && 'rotate-180')} />
      </Button>
    </div>
  );
}

export default memo(GraphqlToolsHeader);
