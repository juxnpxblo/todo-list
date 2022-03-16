import { useQuery } from '../db';
import { Todo, TodoId } from './todo.interface';

export const getAll = async () => {
  const res = await useQuery<Todo[]>('SELECT * FROM todos ORDER BY id');
  return res;
};

export const add = async (todo: string) => {
  const result = await useQuery<[TodoId]>(
    'INSERT INTO todos (todo, done) VALUES ($1, false) RETURNING id',
    [todo]
  );
  return result[0].id;
};

export const edit = async (target: number, newText: string) => {
  await useQuery<[]>('UPDATE todos SET todo = $1 WHERE id = $2', [
    newText,
    target,
  ]);
};

export const check = async (target: number, done: boolean) => {
  await useQuery<[]>('UPDATE todos SET done = $1 WHERE id = $2', [
    done,
    target,
  ]);
};

export const remove = async (target: number) => {
  await useQuery<[]>('DELETE FROM todos WHERE id = $1', [target]);
};
