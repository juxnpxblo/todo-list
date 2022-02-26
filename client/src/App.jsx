import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Todo from './components/Todo';

import { HiCog } from 'react-icons/hi';

import { MdOutlineAdd } from 'react-icons/md';

import { AiOutlineLoading, AiOutlineGithub } from 'react-icons/ai';

import API_ENTRY_POINT from './utils/API_ENTRY_POINT';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false);
  const [loadingTodos, setLoadingTodos] = useState(false);
  const [creatingTodo, setCreatingTodo] = useState(false);

  const cogRef = useRef(null);
  const pickColorRef = useRef(null);

  const getAndSetTodos = async () => {
    setLoadingTodos(true);
    setTodos((await axios.get(API_ENTRY_POINT + '/todos')).data);
    setLoadingTodos(false);
  };

  useEffect(() => {
    getAndSetTodos();

    const bgColor =
      localStorage.getItem('bgColor') ||
      localStorage.setItem('bgColor', '#ffffff') ||
      localStorage.getItem('bgColor');

    document.body.style.backgroundColor = bgColor;
  }, []);

  const totalTodos = todos.length;
  const totalTodosCompleted = todos.filter((todo) => todo.checked).length;

  const addNewTodo = async () => {
    setCreatingTodo(true);
    const res = await axios.post(API_ENTRY_POINT + '/todos', { text: '' });
    setCreatingTodo(false);
    setTodos([...todos, { id: res.data, text: '' }]);
  };

  return (
    <div className="text-[#262626] p-4 max-w-[876px] mx-auto relative h-full">
      <div className="w-full flex justify-between mb-4">
        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          className="font-medium cursor-pointer select-none flex items-center gap-2"
        >
          <span>TO-DO LIST</span>
          <AiOutlineGithub size={24} />
        </a>
        <div className="flex items-center gap-2">
          <span className="font-medium select-none">
            {totalTodosCompleted}/{totalTodos}
          </span>
          <div
            className="cog cursor-pointer relative"
            ref={cogRef}
            onClick={() => {
              cogRef.current.classList.add('rotate-center');
              setTimeout(() => {
                cogRef.current.classList.remove('rotate-center');
              }, 200);

              if (colorPickerIsOpen) {
                pickColorRef.current.classList.add('invisible');
                setColorPickerIsOpen(false);
              } else {
                pickColorRef.current.classList.remove('invisible');
                setColorPickerIsOpen(true);

                document.onmousedown = (e) => {
                  const clickedCog = e.target.classList.contains('cog');

                  if (!clickedCog) {
                    if (e.target.classList.contains('bg-color')) {
                      const clickedColor = e.target.style.backgroundColor;
                      localStorage.setItem('bgColor', clickedColor);
                      document.body.style.backgroundColor = clickedColor;
                    }
                    setColorPickerIsOpen(false);
                  }

                  cogRef.current.classList.add('rotate-center');
                  setTimeout(() => {
                    cogRef.current.classList.remove('rotate-center');
                  }, 200);

                  document.onmousedown = null;
                };
              }
            }}
          >
            <HiCog size={22} className="cog" />
            <div className="cog h-full w-full bg-transparent absolute top-0"></div>
          </div>
          <div
            ref={pickColorRef}
            onClick={() => pickColorRef.current.classList.add('invisible')}
            className={`${
              colorPickerIsOpen ? '' : 'invisible'
            } absolute rounded-md  h-[30px] flex items-center right-4 mt-14 z-20`}
          >
            <div className="flex items-center gap-1 px-1">
              <div
                className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
                style={{ backgroundColor: '#ffffff' }}
              ></div>
              <div
                className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
                style={{ backgroundColor: '#fff291' }}
              ></div>
              <div
                className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
                style={{ backgroundColor: '#91ff93' }}
              ></div>
              <div
                className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
                style={{ backgroundColor: '#91ffdc' }}
              ></div>
              <div
                className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
                style={{ backgroundColor: '#ff9391' }}
              ></div>
              <div
                className="bg-color cursor-pointer w-[24px] h-[24px] border-2 rounded-md border-[#262626]"
                style={{ backgroundColor: '#bb91ff' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] w-full bg-[#262626] mb-4"></div>
      {loadingTodos ? (
        <AiOutlineLoading className="rotate" size={22} />
      ) : (
        todos.map((todo, pos) => (
          <Todo
            key={todo.id}
            todo={todo}
            pos={pos}
            todos={todos}
            setTodos={setTodos}
          />
        ))
      )}
      {creatingTodo ? (
        <AiOutlineLoading className="rotate mt-2" size={22} />
      ) : (
        <p
          className="flex items-center mt-2 pb-2 cursor-pointer text-[#5c5c5c] w-max"
          onClick={() => addNewTodo()}
        >
          <MdOutlineAdd size={22} className="" />
          <span className="ml-2 italic text-sm">Create new to-do...</span>
        </p>
      )}
    </div>
  );
};

export default App;
