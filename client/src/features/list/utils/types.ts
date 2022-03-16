export type TodoId = number;

export interface TodoOnState {
  todo: string;
  done: boolean;
}

export interface TodoDict {
  [key: number]: TodoOnState;
}

export interface TodoWithId extends TodoOnState {
  id: TodoId;
}

export interface TargetTodo {
  target: TodoId;
}

export interface EditTodo extends TargetTodo {
  newText: string;
}

export interface CheckTodo extends TargetTodo {
  isDone: boolean;
}

export interface AddBody {
  text: string;
}

export interface AddBlankBody extends AddBody {
  text: '';
}

export interface EditBody {
  payload: string;
}

export interface CheckBody {
  payload: boolean;
}
