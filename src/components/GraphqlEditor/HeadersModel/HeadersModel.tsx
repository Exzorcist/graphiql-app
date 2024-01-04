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
    <div className="h-full overflow-auto relative" data-testid="headers-area">
      <div
        className="flex flex-col text-sm max-h-52 overflow-auto fancy-scrollbar absolute left-6 right-6"
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
      <div className="absolute bottom-4 left-6 rounded cursor-pointer hover:bg-editor-secondary hover:text-editor-accent transition-all duration-300">
        <button type="button" onClick={() => addTodo()}>
          {' '}
          ➕ Add new header
        </button>
      </div>
    </div>
  );
}
export default memo(HeadersModel);
