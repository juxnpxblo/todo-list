import { useEffect, useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchedAll,
  addedBlank,
  selectFetchingStatus,
  selectTodos,
  selectAddingStatus,
} from './listSlice';
import {
  getStoredBgColor,
  setBgColor,
  BG_COLORS,
  rotateElem,
  howManyTodosAreDone,
} from './utils/helpers';
import { Todo, PickBgColor, LoadingIcon } from './components';
import { AiOutlineGithub } from 'react-icons/ai';
import { HiCog } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';

const App = () => {
  const dispatch = useAppDispatch();

  const fetchingStatus = useAppSelector(selectFetchingStatus);
  const todos = useAppSelector(selectTodos);
  const addingStatus = useAppSelector(selectAddingStatus);

  const [bgPickerIsOpen, setBgPickerIsOpen] = useState(false);

  const cogRef = useRef<HTMLDivElement>(null!);
  const bgPickerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    document.body.style.backgroundColor = getStoredBgColor();
    dispatch(fetchedAll());
  }, []);

  const cogOnClick = () => {
    rotateElem(cogRef, 200);

    if (bgPickerIsOpen) {
      bgPickerRef.current.classList.add('invisible');
      setBgPickerIsOpen(false);
    } else {
      bgPickerRef.current.classList.remove('invisible');
      setBgPickerIsOpen(true);

      document.onmousedown = (e) => {
        document.onmousedown = null;
        const target = e.target! as HTMLElement;

        if (!target.classList.contains('cog')) {
          if (target.classList.contains('bg-color')) {
            setBgColor(target.style.backgroundColor);
          }
          setBgPickerIsOpen(false);
        }

        rotateElem(cogRef, 200);
      };
    }
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
            {howManyTodosAreDone(todos)}/{Object.keys(todos).length}
          </span>
          <div
            className="cog cursor-pointer relative"
            ref={cogRef}
            onClick={cogOnClick}
          >
            <HiCog size={22} />
            <div className="cog h-full w-full bg-transparent absolute top-0"></div>
          </div>
          <div
            ref={bgPickerRef}
            className={`${
              bgPickerIsOpen || 'invisible'
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
      {fetchingStatus === 'fetching' ? (
        <LoadingIcon />
      ) : (
        Object.entries(todos).map(([id, { todo, done }]) => (
          <Todo id={parseInt(id)} todo={todo} done={done} key={id} />
        ))
      )}
      {addingStatus === 'adding' ? (
        <div className="mt-2">
          <LoadingIcon />
        </div>
      ) : (
        <p
          className="flex items-center mt-2 pb-2 cursor-pointer text-[#5c5c5c] w-max"
          onClick={() => dispatch(addedBlank())}
        >
          <MdOutlineAdd size={22} />
          <span className="ml-2 italic text-sm">Create new to-do...</span>
        </p>
      )}
    </div>
  );
};

export default App;
