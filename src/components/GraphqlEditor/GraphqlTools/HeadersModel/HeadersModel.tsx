import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import AutoSuggest from 'react-autosuggest';

import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { setReduxHeaders } from '@/redux/slices/headersSlice';
import { useLocalizationContext } from '@/providers/LocalizationProvider';

interface IHeadersArray {
  id: string;
  header: string;
  value: string;
}

type KeyData = 'header' | 'value';

const testArray = [
  'WWW-Authenticate',
  'Authorization',
  'Cache-Control',
  'Connection',
  'Keep-Alive',
  'Access-Control-Allow-Origin',
  'Access-Control-Allow-Credentials',
  'Access-Control-Allow-Headers',
  'Access-Control-Allow-Methods',
  'Access-Control-Expose-Headers',
  'Access-Control-Max-Age',
  'Access-Control-Request-Headers',
  'Access-Control-Request-Methods',
];

function HeadersModel() {
  const dispatch = useDispatch();
  const { t } = useLocalizationContext();

  const [headers, setHeaders] = useState<IHeadersArray[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const addHeadersLine = () => {
    const newHeader: IHeadersArray = {
      id: uuidv4(),
      header: '',
      value: '',
    };

    setHeaders((prevoius) => [...prevoius, newHeader]);
  };

  const removeHeadersLine = (id: string) => {
    setHeaders(headers.filter((item) => item.id !== id));
  };

  const updateHeadersData = (id: string, name: string, keyData: KeyData) => {
    setHeaders((prevoius) =>
      prevoius.map((item) => (item.id === id ? { ...item, [keyData]: name } : item))
    );
  };

  const getSuggestions = (value: string | undefined) => {
    if (!value) return [];

    return testArray.filter((el) =>
      el.toLocaleLowerCase().includes(value.trim().toLocaleLowerCase())
    );
  };

  useEffect(() => {
    const headersObect: Record<string, string> = {};

    headers.forEach((item) => {
      headersObect[item.header] = item.value;
    });

    dispatch(setReduxHeaders(headersObect));
  }, [headers, dispatch]);

  return (
    <div className="h-full flex-grow basis-0 min-h-0 flex flex-col justify-between gap-3">
      <div className="flex flex-col gap-3 overflow-auto fancy-scrollbar w-full">
        {headers &&
          headers.map((item) => (
            <div key={item.id} className="grid gap-3 pr-8 grid-cols-2 first:mt-3 relative">
              <AutoSuggest
                suggestions={suggestions}
                onSuggestionsClearRequested={() => setSuggestions([])}
                onSuggestionsFetchRequested={({ value }) => {
                  updateHeadersData(item.id, value, 'header');
                  setSuggestions(getSuggestions(value));
                }}
                onSuggestionSelected={(_, { suggestion }) => {
                  updateHeadersData(item.id, suggestion, 'header');
                }}
                getSuggestionValue={(option) => option}
                renderSuggestion={(option) => <span>{option}</span>}
                inputProps={{
                  placeholder: t.headers.placeholder.key,
                  value: item.header,
                  onChange: (e) => {
                    updateHeadersData(item.id, (e.target as HTMLInputElement).value, 'header');
                  },
                }}
                theme={{
                  container: 'relative',
                  input: 'px-2.5 py-1 rounded-md w-full text-slate-700 outline-0',
                  suggestionsContainerOpen:
                    'absolute top-full w-full z-20 bg-editor-secondary max-h-24 overflow-auto fancy-scrollbar',
                  suggestion: 'hover:bg-main pl-2 text-white transition duration-200',
                }}
              />

              <input
                type="text"
                placeholder={t.headers.placeholder.value}
                className="px-2.5 py-1 rounded-md w-full text-slate-700 outline-0"
                value={item.value}
                onChange={(e) =>
                  updateHeadersData(item.id, (e.target as HTMLInputElement).value, 'value')
                }
              />

              <span
                onClick={() => removeHeadersLine(item.id)}
                aria-label="delete-button"
                aria-hidden
                className="absolute top-1.5 right-0"
              >
                <TrashIcon
                  className="w-5 h-5 text-gray-50 hover:stroke-red-500 cursor-pointer 
                           transition-all duration-300"
                />
              </span>
            </div>
          ))}
      </div>
      <div className="bg-editor-primary py-2">
        <button
          type="button"
          className="inline-flex gap-2 py-1 px-2.5 transition rounded min-w-fit cursor-pointer 
                     hover:bg-editor-secondary hover:text-editor-accent items-center"
          onClick={addHeadersLine}
        >
          <PlusIcon className="w-5 h-5" />
          {t.headers.addButton}
        </button>
      </div>
    </div>
  );
}
export default memo(HeadersModel);
