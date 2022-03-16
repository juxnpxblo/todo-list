import { MutableRefObject } from 'react';
import { TodoDict } from './types';

export const BG_COLORS = [
  '#fff',
  '#fff291',
  '#91ff93',
  '#91ffdc',
  '#ff9391',
  '#bb91ff',
];

export const setDefaultBgColor = () => {
  localStorage.setItem('bgColor', '#ffffff');
};

export const getStoredBgColor = () => {
  return (
    (localStorage.getItem('bgColor') as string) ||
    setDefaultBgColor() ||
    (localStorage.getItem('bgColor') as string)
  );
};

export const setBgColor = (color: string) => {
  localStorage.setItem('bgColor', color);
  document.body.style.backgroundColor = color;
};

export const calcHeight = (ref: MutableRefObject<HTMLTextAreaElement>) => {
  ref.current.style.height = '1px';
  ref.current.style.height = ref.current.scrollHeight + 'px';
};

export const rotateElem = (
  ref: MutableRefObject<HTMLElement>,
  duration: number
) => {
  ref.current.classList.add('rotate');
  setTimeout(() => {
    ref.current.classList.remove('rotate');
  }, duration);
};

export const howManyTodosAreDone = (todos: TodoDict) => {
  let totalDone = 0;
  for (let { done } of Object.values(todos)) if (done) totalDone++;
  return totalDone;
};
