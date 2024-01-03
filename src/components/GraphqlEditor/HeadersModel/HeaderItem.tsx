import { TrashIcon } from '@heroicons/react/24/outline';
import { useState, ChangeEvent, useEffect } from 'react';
import AutoSuggest from 'react-autosuggest';
import { setHeader, setHeadersObj, setValue } from '@/redux/slices/headersSlice';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { headersdata } from './AutocompleteHeaders';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

type Todo = {
  header: string;
  value: string;
};

type Props = {
  id: string;
  todo: Todo;
  deleteTodo: (id: string, headerValue: string) => void;
  setTodo: (el: Todo) => void;
};

function HeaderItem({ todo, setTodo, deleteTodo, id }: Props) {
  const { t } = useLocalizationContext();

  const dispatch = useAppDispatch();
  const [headerValue, setHeaderValue] = useState(todo.header);
  const [currentValue, setCurrentValue] = useState(todo.value);

  function onHeadersChange(e: ChangeEvent<HTMLInputElement>) {
    setHeaderValue(e.currentTarget.value);
    setTodo({ header: e.currentTarget.value, value: currentValue });
    dispatch(setHeader(e.currentTarget.value));
  }
  function onValueChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    setTodo({ header: headerValue, value: e.target.value });
    dispatch(setValue(e.target.value));
  }

  const lowerCasedHeaders = headersdata.map((el) => {
    return {
      id: el.id,
      name: el.name,
    };
  });

  type ISuggest = {
    id: number;
    name: string;
  };

  const [suggestions, setSuggestions] = useState<ISuggest[]>([]);

  function getSuggestions(value: string) {
    return lowerCasedHeaders.filter((el) => el.name.includes(value.trim()));
  }

  useEffect(() => {
    if (headerValue && currentValue) {
      const obj = {} as { [key: string]: string };
      obj[headerValue] = currentValue;
      dispatch(setHeadersObj(obj));
    }
  }, [headerValue, currentValue, dispatch]);

  return (
    <div className="flex w-full flex-wrap gap-3 mb-5 text-slate-950">
      <AutoSuggest
        suggestions={suggestions}
        onSuggestionsClearRequested={() => setSuggestions([])}
        onSuggestionsFetchRequested={({ value }) => {
          setHeaderValue(value);
          setSuggestions(getSuggestions(value));
        }}
        onSuggestionSelected={(_, { suggestion }) => dispatch(setHeader(suggestion.name))}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={(suggestion) => <span>{suggestion.name}</span>}
        inputProps={{
          placeholder: t.headers.placeholder.key,
          value: headerValue,
          onChange: (e) => {
            onHeadersChange(e as ChangeEvent<HTMLInputElement>);
          },
        }}
        theme={{
          container: 'w-2/5 relative',
          input: 'pl-2 rounded-md w-full h-7',
          containerOpen: 'bg-editor-secondary rounded-md cursor-pointer ',
          suggestionsContainerOpen:
            'absolute top-full w-full z-20 bg-editor-secondary max-h-24 overflow-auto fancy-scrollbar',
          suggestion: 'hover:bg-main pl-2 text-white',
        }}
        alwaysRenderSuggestions
        highlightFirstSuggestion
      />
      <input
        type="text"
        className="pl-2 rounded-md w-2/5 h-7 ml-4 last:mb-40"
        placeholder={t.headers.placeholder.value}
        name="text"
        onChange={onValueChange}
      />
      <div className="mt-1">
        <button
          type="button"
          aria-label="delete-button"
          onClick={() => deleteTodo(id, headerValue)}
        >
          {' '}
          <TrashIcon className="w-5 text-gray-50 hover:bg-editor-secondary hover:stroke-red-500" />
        </button>
      </div>
    </div>
  );
}
export default HeaderItem;
