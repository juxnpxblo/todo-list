import api from '../../app/api';
import {
  TodoWithId,
  EditTodo,
  CheckTodo,
  TargetTodo,
  AddBlankBody,
  EditBody,
  CheckBody,
} from './utils/types';

export const fetchAll = async () => {
  const res = await api.get('/todos');
  return res.data as TodoWithId[];
};

export const addBlank = async () => {
  const res = await api.post('/todos', { text: '' } as AddBlankBody);
  return res.data as number;
};

export const edit = ({ target, newText }: EditTodo) => {
  api.put(`/todos/${target}`, {
    payload: newText,
  } as EditBody);
};

export const check = ({ target, isDone }: CheckTodo) => {
  api.put(`/todos/${target}`, {
    payload: isDone,
  } as CheckBody);
};

export const remove = ({ target }: TargetTodo) => {
  api.delete(`/todos/${target}`);
};
