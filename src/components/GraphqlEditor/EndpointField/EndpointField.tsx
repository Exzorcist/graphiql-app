import { FormEvent, memo, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { cn } from '@/utils/cn';
import SendRequestButton from './SendRequestButton';
import { useLocalizationContext } from '@/providers/LocalizationProvider';
import SchemaButton from './SchemaButton';
import { PropsWithClassName } from '@/types/PropsWithClassName';
import {
  changeEndpointValue,
  selectEndpointValue,
  useInitRequestMutation,
} from '@/redux/slices/graphql/graphqlSlice';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';

export type EndpointFieldProps = {
  onSchemaClick?(): void;
  isSchemaOpen?: boolean;
} & PropsWithClassName;

function EndpointField({ onSchemaClick, isSchemaOpen = false, className }: EndpointFieldProps) {
  const { t } = useLocalizationContext();
  const apiUrl = useAppSelector(selectEndpointValue);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState(apiUrl);
  const [initRequest] = useInitRequestMutation();
  const dispatchDebounced = useDebouncedCallback((value: string) => {
    dispatch(changeEndpointValue(value));
  }, 500);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    initRequest(inputValue);
  };

  const handleChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputValue(value);
    dispatchDebounced(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      className={cn(
        'h-10 flex w-full bg-editor-secondary border-editor-border border rounded [&:has(input:focus)]:border-editor-accent',
        className
      )}
      onSubmit={handleSubmit}
    >
      <div className="w-full h-full flex ">
        <input
          className="w-full h-full bg-transparent outline-none pl-4"
          placeholder={t.page.editor.enterURL}
          value={inputValue}
          onChange={handleChange}
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
