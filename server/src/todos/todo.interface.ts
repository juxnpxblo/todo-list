export interface TodoId {
  id: number;
}

export interface TodoDone {
  done: boolean;
}

export interface TodoText {
  text: string;
}

export interface Todo extends TodoId, TodoDone, TodoText {}
