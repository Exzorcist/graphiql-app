import { TrashIcon } from '@heroicons/react/24/outline';
import { useState, ChangeEvent } from 'react';
import Autocomplete from './AutocompleteHeaders';
import { setHeader, setValue } from '@/redux/slices/headersSlice';
import { useAppDispatch } from '@/utils/hooks/redux-hooks';

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

function InputTodo({ todo, setTodo, deleteTodo, id }: Props) {
  const dispatch = useAppDispatch();
  const [headerValue, setHeaderValue] = useState(todo.header);
  const [currentValue, setCurrentValue] = useState(todo.value);

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

  return (
    <div className="flex flex-wrap gap-3 mb-5 text-slate-950">
      <Autocomplete />
      <input
        type="text"
        list="headers"
        className="pl-1 rounded-sm"
        placeholder="header key"
        onChange={onHeadersChange}
      />
      <input
        type="text"
        className="pl-1 rounded-sm"
        placeholder="value"
        name="text"
        onChange={onValueChange}
      />
      <button type="button" aria-label="delete-button" onClick={() => deleteTodo(id)}>
        {' '}
        <TrashIcon className="w-4 text-gray-50 hover:bg-editor-secondary hover:stroke-red-500" />
      </button>
    </div>
  );
}
export default InputTodo;
