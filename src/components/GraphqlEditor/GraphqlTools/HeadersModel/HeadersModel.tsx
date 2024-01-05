import { memo, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import HeaderItem from './HeaderItem';
import { useAppDispatch, useAppSelector } from '@/utils/hooks/redux-hooks';
import { removeHeadersValue, setClearHeaders, updateHeadersObj } from '@/redux/slices/headersSlice';

export type ITask = {
  id: string;
};

interface IHeadersArray {
  id: string;
  header: string;
  value: string;
}

type KeyData = 'header' | 'value';

function HeadersModel() {
  // const [todo, setTodo] = useState({ header: '', value: '' });
  // const [tasks, setTasks] = useState<ITask[]>([]);
  // const dispatch = useAppDispatch();
  // const headersForShow = useAppSelector((state) => state.headers.headers);

  const [headers, setHeaders] = useState<IHeadersArray[]>([]);

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

  useEffect(() => {
    const headersObect: Record<string, string> = {};

    headers.forEach((item) => {
      headersObect[item.header] = item.value;
    });

    console.log(headersObect);
  }, [headers]);

  // const addTodo = () => {
  //   const taskTodo = {
  //     id: Math.random(),
  //     value: { header: todo.header, value: todo.value },
  //     status: false,
  //   };
  //   const newTask = [...tasks, taskTodo];
  //   setTasks(newTask as never);
  //   setTodo({ header: '', value: '' });
  // };

  // const deleteTodo = (id: string, headerValue: string) => {
  //   const del = tasks.filter((el) => el.id !== id);
  //   setTasks(del);
  //   const newObj = Object.fromEntries(
  //     Object.entries(headersForShow).filter(([k]) => k !== headerValue)
  //   );
  //   dispatch(updateHeadersObj(newObj));
  // };

  // useEffect(() => {
  //   console.log(tasks);

  //   if (!tasks.length) {
  //     dispatch(removeHeadersValue({ header: '', value: '' }));
  //     const objClear = {} as { [key: string]: string };
  //     dispatch(setClearHeaders(objClear));
  //   }
  // }, [dispatch, tasks, todo.header, todo.value]);

  return (
    <div className="h-full flex-grow basis-0 min-h-0 flex flex-col gap-2">
      {headers &&
        headers.map((item) => (
          <div key={item.id} className="flex gap-2">
            <input
              type="text"
              className="text-slate-950"
              value={item.header}
              onChange={(e) =>
                updateHeadersData(item.id, (e.target as HTMLInputElement).value, 'header')
              }
            />
            <input
              type="text"
              className="text-slate-950"
              value={item.value}
              onChange={(e) =>
                updateHeadersData(item.id, (e.target as HTMLInputElement).value, 'value')
              }
            />
            <button type="button" onClick={() => removeHeadersLine(item.id)}>
              remove
            </button>
          </div>
        ))}

      <div>
        <button
          type="button"
          className="w-40 bottom-0 pl-0 mt-auto ml-2 mb-5 transition rounded min-w-fit cursor-pointer 
                     hover:bg-editor-secondary hover:text-editor-accent"
          onClick={addHeadersLine}
        >
          ➕ Add new header
        </button>
      </div>
      {/* <div className="flex h-full flex-col ml-6 text-sm mb-2 overflow-auto fancy-scrollbar [scrollbar-gutter:stable]">
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
          className="w-40 bottom-0 pl-0 mt-auto ml-2 mb-5 transition rounded min-w-fit cursor-pointer hover:bg-editor-secondary hover:text-editor-accent"
          onClick={addTodo}
        >
          {' '}
          ➕ Add new header
        </button>
      </div> */}
    </div>
  );
}
export default memo(HeadersModel);
