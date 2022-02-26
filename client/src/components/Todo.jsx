import { useRef } from 'react';

import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';

import { FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

import API_ENTRY_POINT from '../utils/API_ENTRY_POINT';

function auto_height(ref) {
  ref.current.style.height = '1px';
  ref.current.style.height = ref.current.scrollHeight + 'px';
}

const Todo = ({ todo: thisTodo, todos, setTodos }) => {
  const [renaming, setRenaming] = useState(false);
  const [todoText, setTodoText] = useState(thisTodo.text);

  const todoTextRef = useRef(null);

  useEffect(() => {
    if (renaming) {
      todoTextRef.current.focus();
      todoTextRef.current.selectionEnd = todoTextRef.current.value.length;
    }
  }, [renaming]);

  const renameTodo = async () => {
    setTodos(
      todos.map((todo) =>
        todo !== thisTodo ? todo : { ...todo, text: todoText }
      )
    );

    await axios.put(API_ENTRY_POINT + `/todos/${thisTodo.id}`, {
      operation: 'RENAME',
      payload: todoText,
    });
  };

  const checkTodo = async () => {
    setTodos(
      todos.map((todo) =>
        todo !== thisTodo ? todo : { ...todo, checked: !todo.checked }
      )
    );

    await axios.put(API_ENTRY_POINT + `/todos/${thisTodo.id}`, {
      operation: 'CHECK',
      payload: !thisTodo.checked,
    });
  };

  const deleteTodo = async () => {
    setTodos(todos.filter((todo) => todo !== thisTodo));

    await axios.delete(API_ENTRY_POINT + `/todos/${thisTodo.id}`);
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
          rows="1"
          className="ml-2 bg-inherit outline-none resize-none w-full overflow-hidden break-all"
          ref={todoTextRef}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              todoTextRef.current.blur();
            }
          }}
          onFocus={() => auto_height(todoTextRef)}
          onChange={(e) => {
            auto_height(todoTextRef);
            setTodoText(e.target.value);
          }}
          value={todoText}
          spellCheck="false"
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
