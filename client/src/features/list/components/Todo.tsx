import { useRef, useState, useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import { checked, edited, removed } from '../listSlice';
import { edit, check, remove } from '../listAPI';
import { calcHeight } from '../utils/helpers';
import { TodoWithId } from '../utils/types';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdOutlineDriveFileRenameOutline,
} from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

const Todo = ({ id, todo, done }: TodoWithId) => {
  const dispatch = useAppDispatch();

  const [renaming, setRenaming] = useState(false);
  const [newTodoText, setNewTodoText] = useState(todo);

  const editTodoRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    if (renaming) {
      editTodoRef.current.focus();
      editTodoRef.current.selectionEnd = editTodoRef.current.value.length;
    }
  }, [renaming]);

  const CheckIcon = done ? MdCheckBox : MdCheckBoxOutlineBlank;

  return (
    <div className="flex mt-2 w-full relative todo">
      <div>
        <CheckIcon
          size={23}
          className="cursor-pointer"
          onClick={() => {
            dispatch(checked(id));
            check({ target: id, isDone: done });
          }}
        />
      </div>
      {renaming === true ? (
        <textarea
          ref={editTodoRef}
          value={newTodoText}
          rows={1}
          className="ml-2 bg-inherit outline-none resize-none w-full overflow-hidden break-all"
          spellCheck="false"
          onFocus={() => calcHeight(editTodoRef)}
          onChange={(e) => {
            calcHeight(editTodoRef);
            setNewTodoText(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Enter') editTodoRef.current.blur();
          }}
          onBlur={() => {
            setRenaming(false);
            dispatch(edited({ target: id, newText: newTodoText }));
            edit({ target: id, newText: newTodoText });
          }}
        ></textarea>
      ) : (
        <p className={`break-all ml-2 ${done ? 'line-through' : ''}`}>{todo}</p>
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
          onClick={() => {
            dispatch(removed(id));
            remove({ target: id });
          }}
        />
      </div>
    </div>
  );
};

export default Todo;
