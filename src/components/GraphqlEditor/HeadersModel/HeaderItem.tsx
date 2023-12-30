import { TrashIcon } from '@heroicons/react/24/outline';
import { useState, ChangeEvent } from 'react';
// import Autocomplete from './AutocompleteHeaders';
import { setHeader, setValue } from '@/redux/slices/headersSlice';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';
import { cn } from '@/utils/cn';

type Todo = {
  header: string;
  value: string;
};

type Props = {
  id: string;
  todo: Todo;
  deleteTodo: (id: string) => void;
  setTodo: (el: Todo) => void;
};

function HeaderItem({ todo, setTodo, deleteTodo, id }: Props) {
  const dispatch = useAppDispatch();
  const [headerValue, setHeaderValue] = useState(todo.header);
  const [currentValue, setCurrentValue] = useState(todo.value);
  const [isShow, setIsShow] = useState(false);

  function onHeadersChange(e: ChangeEvent<HTMLInputElement>) {
    setHeaderValue(e.target.value);
    setTodo({ header: e.target.value, value: currentValue });
    dispatch(setHeader(e.target.value));
  }
  function onValueChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(e.target.value);
    setTodo({ header: headerValue, value: e.target.value });
    dispatch(setValue(e.target.value));
  }

  function showHeaders() {
    if (!isShow) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }

  return (
    <div className="flex w-full flex-wrap gap-3 mb-5 text-slate-950">
      {/* <Autocomplete /> */}
      <input
        type="text"
        list="headers"
        className="pl-2 rounded-md w-2/5 -ml-4 h-7"
        placeholder="header key"
        onChange={onHeadersChange}
        onClick={showHeaders}
      />
      <div
        className={cn(
          'absolute top-20 flex flex-col bg-slate-100 w-2/5 -ml-4 pl-2 rounded-md invisible',
          isShow && 'absolute top-20 flex flex-col bg-slate-100 w-2/5 -ml-4 pl-2 rounded-md visible'
        )}
      >
        <span>WWW-Authenticate</span>
        <span>Authorization</span>
        <span>Cache-Control</span>
        <span>Connection</span>
        <span>Keep-Alive</span>
        <span>Access-Control-Allow-Origin</span>
        <span>Access-Control-Allow-Credentials</span>
        <span>Access-Control-Allow-Headers</span>
        <span>Access-Control-Allow-Methods</span>
        <span>Access-Control-Expose-Headers</span>
        <span>Access-Control-Max-Age</span>
        <span>Access-Control-Request-Headers</span>
        <span>Access-Control-Request-Methods</span>
        <span>apollo-federation-include-trace</span>
        <span>apollographql-client-name</span>
        <span>apollographql-client-version</span>
      </div>
      <input
        type="text"
        className="pl-2 rounded-md w-2/5 h-7"
        placeholder="value"
        name="text"
        onChange={onValueChange}
      />
      <button type="button" aria-label="delete-button" onClick={() => deleteTodo(id)}>
        {' '}
        <TrashIcon className="w-5 text-gray-50 hover:bg-editor-secondary hover:stroke-red-500" />
      </button>
    </div>
  );
}
export default HeaderItem;
