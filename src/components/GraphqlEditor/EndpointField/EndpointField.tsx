import { FormEvent, memo, useCallback, useRef } from 'react';
import { cn } from '@/utils/cn';
import SendRequestButton from './SendRequestButton';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import SchemaButton from './SchemaButton';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { selectApiUrl, useLazyFetchIntrospectionQuery } from '@/redux/slices/graphqlSlice';
import { useAppSelector } from '@/utils/hooks/redux-hooks';

export type EndpointFieldProps = {
  onSchemaClick?(): void;
  isSchemaOpen?: boolean;
} & PropsWithClassName;

function EndpointField({ onSchemaClick, isSchemaOpen = false, className }: EndpointFieldProps) {
  const { t } = useLocalizationContext();
  const apiUrl = useAppSelector(selectApiUrl);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fetchIntrospection] = useLazyFetchIntrospectionQuery();

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetchIntrospection?.(inputRef.current!.value);
    },
    [fetchIntrospection]
  );

  return (
    <form
      className={cn(
        'h-[45px] flex w-full bg-editor-secondary border-editor-border border rounded [&:has(input:focus)]:border-editor-accent',
        className
      )}
      onSubmit={handleSubmit}
    >
      <div className="w-full h-full flex ">
        <input
          className="w-full h-full bg-transparent outline-none pl-4"
          placeholder={t.page.editor['Enter URL']}
          defaultValue={apiUrl}
          ref={inputRef}
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
