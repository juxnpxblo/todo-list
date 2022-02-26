import { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import API_ENTRY_POINT from '../utils/API_ENTRY_POINT';

import calcHeight from '../utils/calcHeight';

import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

const Todo = ({ thisTodo, todos, setTodos }) => {
  const [renaming, setRenaming] = useState(false);
  const [todoText, setTodoText] = useState(thisTodo.text);

  const renameTodoRef = useRef(null);

  useEffect(() => {
    if (renaming) {
      renameTodoRef.current.focus();
      renameTodoRef.current.selectionEnd = renameTodoRef.current.value.length;
    }
  }, [renaming]);

  const renameTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo !== thisTodo ? todo : { ...todo, text: todoText }
      )
    );

    axios.put(API_ENTRY_POINT + `/todos/${thisTodo.id}`, {
      operation: 'RENAME',
      payload: todoText,
    });
  };

  const checkTodo = () => {
    setTodos(
      todos.map((todo) =>
        todo !== thisTodo ? todo : { ...todo, checked: !todo.checked }
      )
    );

    axios.put(API_ENTRY_POINT + `/todos/${thisTodo.id}`, {
      operation: 'CHECK',
      payload: !thisTodo.checked,
    });
  };

  const deleteTodo = () => {
    setTodos(todos.filter((todo) => todo !== thisTodo));

    axios.delete(API_ENTRY_POINT + `/todos/${thisTodo.id}`);
  };

  return (
    <div className="flex mt-2 w-full relative todo">
      <div>
        {thisTodo.checked ? (
          <MdCheckBox
            size={23}
            className="cursor-pointer"
            onClick={() => checkTodo()}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            size={23}
            className="cursor-pointer"
            onClick={() => checkTodo()}
          />
        )}
      </div>
      {renaming === true ? (
        <textarea
          ref={renameTodoRef}
          value={todoText}
          rows="1"
          className="ml-2 bg-inherit outline-none resize-none w-full overflow-hidden break-all"
          spellCheck="false"
          onFocus={() => calcHeight(renameTodoRef)}
          onChange={(e) => {
            calcHeight(renameTodoRef);
            setTodoText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              renameTodoRef.current.blur();
            }
          }}
          onBlur={() => {
            setRenaming(false);
            renameTodo();
          }}
        ></textarea>
      ) : (
        <p
          className={`break-all ml-2 ${thisTodo.checked ? 'line-through' : ''}`}
        >
          {thisTodo.text}
        </p>
      )}
      <div className="ml-1 flex items-center justify-self-end gap-1 opacity-0 invisible transition-all duration-200">
        <MdOutlineDriveFileRenameOutline
          size={23}
          className="cursor-pointer"
          onClick={() => setRenaming(true)}
        />
        <FaTrash
          size={20}
          className="cursor-pointer mt-[1px]"
          onClick={() => deleteTodo()}
        />
      </div>
    </div>
  );
};

export default Todo;
