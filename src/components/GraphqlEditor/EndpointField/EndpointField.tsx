import { FormEvent, memo, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/utils/cn';
import SendRequestButton from './SendRequestButton';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import SchemaButton from './SchemaButton';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import { useFetchIntrospectionMutation } from '@/redux/slices/graphql/graphqlApi';
import SchemaIndicator from './SchemaIndicator';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { changeEndpointValue, selectEndpointValue } from '@/redux/slices/graphql/graphqlSlice';

export type EndpointFieldProps = {
  onSchemaClick?(): void;
  isSchemaOpen?: boolean;
} & PropsWithClassName;

function EndpointField({ onSchemaClick, isSchemaOpen = false, className }: EndpointFieldProps) {
  const dispatch = useAppDispatch();
  const { t } = useLocalizationContext();
  const apiUrl = useAppSelector(selectEndpointValue);
  const [inputValue, setInputValue] = useState(apiUrl);
  const [fetchIntrospection] = useFetchIntrospectionMutation();

  const debouncedFetchIntrospection = useDebouncedCallback(fetchIntrospection, 300);
  const debouncedDispatchEndpointValue = useDebouncedCallback(
    (value: string) => dispatch(changeEndpointValue(value)),
    300
  );

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputValue(value);
    debouncedFetchIntrospection(value);
    debouncedDispatchEndpointValue(value);
  };

  return (
    <div
      className={cn(
        'h-10 flex w-full bg-editor-secondary border-editor-border border rounded [&:has(input:focus)]:border-editor-accent',
        className
      )}
    >
      <div className="w-full h-full flex relative">
        <SchemaIndicator className="absolute left-3 absolute-y-center" />
        <input
          className="w-full h-full bg-transparent outline-none pl-10"
          placeholder={t.page.editor.enterURL}
          value={inputValue}
          onChange={handleChange}
        />
        <div className="bottom-0 right-4 h-full flex items-center pr-4 pl-4">
          <SchemaButton variant="ghost-accented" onClick={onSchemaClick} active={isSchemaOpen} />
        </div>
      </div>
      <SendRequestButton />
    </div>
  );
}

export default memo(EndpointField);
