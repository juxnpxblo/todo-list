import { useEffect, useState, useRef } from 'react';

import axios from 'axios';
import API_ENTRY_POINT from './utils/API_ENTRY_POINT';

import getStoredBgColor from './utils/getStoredBgColor';
import setBgColor from './utils/setBgColor';
import BG_COLORS from './utils/BG_COLORS';
import rotate from './utils/rotate';

import Todo from './components/Todo';
import LoadingIcon from './components/LoadingIcon';
import PickBgColor from './components/PickBgColor';

import { AiOutlineGithub } from 'react-icons/ai';
import { HiCog } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [bgPickerIsOpen, setBgPickerIsOpen] = useState(false);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [creatingTodo, setCreatingTodo] = useState(false);

  const cogRef = useRef(null);
  const bgPickerRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = getStoredBgColor();

    (async () => {
      setLoadingTodos(true);
      setTodos((await axios.get(API_ENTRY_POINT + '/todos')).data);
      setLoadingTodos(false);
    })();
  }, []);

  const totalTodosCompleted = todos.filter((todo) => todo.checked).length;

  const addNewTodo = async () => {
    setCreatingTodo(true);

    const res = await axios.post(API_ENTRY_POINT + '/todos', { text: '' });
    setTodos([...todos, { id: res.data, text: '' }]);

    setCreatingTodo(false);
  };

  return (
    <div className="text-[#262626] p-4 max-w-[876px] mx-auto relative h-full">
      <div className="w-full flex justify-between mb-4">
        <a
          href="https://github.com/juxnpxblo/todo-list"
          target="_blank"
          rel="noreferrer"
          className="font-medium cursor-pointer select-none flex items-center gap-2"
        >
          <span>TO-DO LIST</span>
          <AiOutlineGithub size={24} />
        </a>
        <div className="flex items-center gap-2">
          <span className="font-medium select-none">
            {totalTodosCompleted}/{todos.length}
          </span>
          <div
            className="cog cursor-pointer relative"
            ref={cogRef}
            onClick={() => {
              rotate(cogRef, 200);

              if (bgPickerIsOpen) {
                bgPickerRef.current.classList.add('invisible');
                setBgPickerIsOpen(false);
              } else {
                bgPickerRef.current.classList.remove('invisible');
                setBgPickerIsOpen(true);

                document.onmousedown = (e) => {
                  document.onmousedown = null;

                  if (!e.target.classList.contains('cog')) {
                    if (e.target.classList.contains('bg-color')) {
                      setBgColor(e.target.style.backgroundColor);
                    }
                    setBgPickerIsOpen(false);
                  }

                  rotate(cogRef, 200);
                };
              }
            }}
          >
            <HiCog size={22} />
            <div className="cog h-full w-full bg-transparent absolute top-0"></div>
          </div>
          <div
            ref={bgPickerRef}
            className={`${
              bgPickerIsOpen ? '' : 'invisible'
            } absolute rounded-md h-[30px] flex items-center right-4 mt-14 z-20`}
          >
            <div className="flex items-center gap-1 px-1">
              {BG_COLORS.map((color) => (
                <PickBgColor color={color} key={color} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#262626] mb-4"></div>
      {loadingTodos ? (
        <LoadingIcon />
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            thisTodo={todo}
            todos={todos}
            setTodos={setTodos}
          />
        ))
      )}
      {creatingTodo ? (
        <div className="mt-2">
          <LoadingIcon />
        </div>
      ) : (
        <p
          className="flex items-center mt-2 pb-2 cursor-pointer text-[#5c5c5c] w-max"
          onClick={() => addNewTodo()}
        >
          <MdOutlineAdd size={22} />
          <span className="ml-2 italic text-sm">Create new to-do...</span>
        </p>
      )}
    </div>
  );
};

export default App;
