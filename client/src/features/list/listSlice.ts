import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchAll, addBlank } from './listAPI';
import { TodoDict, TodoId, EditTodo } from './utils/types';

export interface ListState {
  todos: TodoDict;
  fetchingStatus: 'fetching' | 'fetched';
  addingStatus: 'adding' | 'added';
}

const initialState: ListState = {
  todos: {},
  fetchingStatus: 'fetching',
  addingStatus: 'added',
};

export const fetchedAll = createAsyncThunk(
  'list/fetchedAll',
  async () => await fetchAll()
);

export const addedBlank = createAsyncThunk(
  'list/added',
  async () => await addBlank()
);

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    edited: (
      state,
      { payload: { target, newText } }: PayloadAction<EditTodo>
    ) => {
      state.todos[target].todo = newText;
    },
    checked: (state, { payload: target }: PayloadAction<TodoId>) => {
      state.todos[target].done = !state.todos[target].done;
    },
    removed: (state, { payload: target }: PayloadAction<TodoId>) => {
      delete state.todos[target];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchedAll.fulfilled, (state, { payload }) => {
        state.fetchingStatus = 'fetched';
        payload.forEach(({ id, todo, done }) => {
          state.todos[id] = {
            todo,
            done,
          };
        });
      })
      .addCase(addedBlank.pending, (state) => {
        state.addingStatus = 'adding';
      })
      .addCase(addedBlank.fulfilled, (state, { payload: returningId }) => {
        state.addingStatus = 'added';
        state.todos[returningId] = {
          todo: '',
          done: false,
        };
      });
  },
});

export const { edited, checked, removed } = listSlice.actions;

export const selectFetchingStatus = ({ list: { fetchingStatus } }: RootState) =>
  fetchingStatus;
export const selectAddingStatus = ({ list: { addingStatus } }: RootState) =>
  addingStatus;
export const selectTodos = ({ list: { todos } }: RootState) => todos;

export default listSlice.reducer;
