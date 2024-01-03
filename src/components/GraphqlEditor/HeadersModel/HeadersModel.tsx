import { memo, useEffect, useState } from 'react';
import { useEditorContainerContext } from '@/components/Editor/hooks';
import HeaderItem from './HeaderItem';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { removeHeadersValue, setClearHeaders, updateHeadersObj } from '@/redux/slices/headersSlice';

export type ITask = {
  id: string;
};

function HeadersModel() {
  const { header } = useEditorContainerContext();
  const [todo, setTodo] = useState({ header: '', value: '' });
  const [tasks, setTasks] = useState<ITask[]>([]);
  const dispatch = useAppDispatch();
  const headersForShow = useAppSelector((state) => state.headers.headers);

  const addTodo = () => {
    const taskTodo = {
      id: Math.random(),
      value: { header: todo.header, value: todo.value },
      status: false,
    };
    const newTask = [...tasks, taskTodo];
    setTasks(newTask as never);
    setTodo({ header: '', value: '' });
  };

  const deleteTodo = (id: string, headerValue: string) => {
    const del = tasks.filter((el) => el.id !== id);
    setTasks(del);
    const newObj = Object.fromEntries(
      Object.entries(headersForShow).filter(([k]) => k !== headerValue)
    );
    dispatch(updateHeadersObj(newObj));
  };
  useEffect(() => {
    if (!tasks.length) {
      dispatch(removeHeadersValue({ header: '', value: '' }));
      const objClear = {} as { [key: string]: string };
      dispatch(setClearHeaders(objClear));
    }
  }, [dispatch, tasks, todo.header, todo.value]);

  return (
    <div>
      <div
        className="flex flex-col ml-6 text-sm mb-2"
        style={{ paddingTop: header.visible ? header.height : undefined }}
        data-testid="editor-area"
      >
        {tasks.map((el) => (
          <HeaderItem
            todo={todo}
            setTodo={setTodo}
            key={el.id}
            id={el.id}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
      <div>
        <button
          type="button"
          className="w-40 pl-0 mt-3 ml-2 mb-5 transition rounded min-w-fit cursor-pointer hover:bg-editor-secondary hover:text-editor-accent"
          onClick={() => addTodo()}
        >
          {' '}
          ➕ Add new header
        </button>
      </div>
    </div>
  );
}
export default memo(HeadersModel);
