import { ComponentProps, memo } from 'react';
import { cn } from '@/utils';
import SendRequestButton from './SendRequestButton';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import SchemaButton from './SchemaButton';

export type EndpointFieldProps = {
  onSchemaClick?(): void;
  isSchemaOpen?: boolean;
} & ComponentProps<'form'>;

function EndpointField({
  onSchemaClick,
  isSchemaOpen = false,
  className,
  ...delegated
}: EndpointFieldProps) {
  const { t } = useLocalizationContext();

  return (
    <form
      className={cn(
        'h-[45px] flex w-full bg-editor-secondary border-editor-border border rounded [&:has(input:focus)]:border-editor-accent',
        className
      )}
      {...delegated}
    >
      <div className="w-full h-full flex ">
        <input
          className="w-full h-full bg-transparent outline-none pl-4"
          placeholder={t.page.editor['Enter URL']}
        />
        <div className="bottom-0 right-4 h-full flex items-center pr-4 pl-4">
          <SchemaButton variant="ghost-accented" onClick={onSchemaClick} active={isSchemaOpen} />
        </div>
      </div>
      <SendRequestButton />
    </form>
  );
}

export default memo(EndpointField);
