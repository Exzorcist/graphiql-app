import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { memo } from 'react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { setHeaderOpen } from '@/redux/slices/headersSlice';

export type GraphqlToolsHeaderProps = {
  onChevronClick?(): void;
  isOpen?: boolean;
  className?: string;
};

function GraphqlToolsHeader({
  isOpen = false,
  onChevronClick,
  className,
}: GraphqlToolsHeaderProps) {
  const { t } = useLocalizationContext();

  const dispatch = useAppDispatch();

  function onHeadersclick() {
    dispatch(setHeaderOpen({ isHeader: true }));
  }
  function onVariablesClick() {
    dispatch(setHeaderOpen({ isHeader: false }));
  }

  return (
    <div className={cn('flex gap-6 w-full', className)}>
      <Button onClick={() => onVariablesClick()}>{t.page.editor.variables}</Button>
      <Button onClick={() => onHeadersclick()}>{t.page.editor.headers}</Button>
      <Button className="ml-auto" onClick={onChevronClick}>
        <ChevronUpIcon className={cn('h-6 w-6', isOpen && 'rotate-180')} />
      </Button>
    </div>
  );
}

export default memo(GraphqlToolsHeader);
