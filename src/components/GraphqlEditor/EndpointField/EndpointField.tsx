import { memo } from 'react';
import { cn } from '@/utils/cn';
import SendRequestButton from './SendRequestButton';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import SchemaButton from './SchemaButton';
import { PropsWithClassName } from '@/types/PropsWithClassName';

export type EndpointFieldProps = {
  onSchemaClick?(): void;
  onSubmitRequest?(): void;
  isSchemaOpen?: boolean;
} & PropsWithClassName;

function EndpointField({
  onSchemaClick,
  onSubmitRequest,
  isSchemaOpen = false,
  className,
}: EndpointFieldProps) {
  const { t } = useLocalizationContext();

  return (
    <form
      className={cn(
        'h-[45px] flex w-full bg-editor-secondary border-editor-border border rounded [&:has(input:focus)]:border-editor-accent',
        className
      )}
      onSubmit={onSubmitRequest}
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
