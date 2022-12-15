import produce from 'immer';
import { GetState, SetState } from 'zustand/vanilla';

import { Todo, TodoAddInput, TodoUpdateInput } from '../graphql/generated/graphql';
import { sdk } from '../graphql/gql-sdk';

export interface TodoListState {
  todoList: Todo[];
  isInitialized: boolean;
  init(): Promise<void>;
  addTodo(input: TodoAddInput): Promise<void>;
  updateTodo(input: TodoUpdateInput): Promise<void>;
  removeTodo(todoId: string): Promise<void>;
}

export interface TodoListSlice {
  todoList: TodoListState;
}

const todoListSlice = (
  set: SetState<TodoListSlice>,
  get: GetState<TodoListSlice>,
): TodoListSlice => ({
  todoList: {
    todoList: [],
    isInitialized: false,
    async init() {
      try {
        const result = await sdk.GetTodoList();
        set(
          produce<TodoListSlice>(state => {
            state.todoList.todoList = result.getTodoList;
            state.todoList.isInitialized = true;
          }),
        );
        console.log('Got todo list', result);
      } catch (error) {
        console.log('Cannot fetch todo list', error);
      }
    },
    async addTodo(input: TodoAddInput): Promise<void> {
      try {
        const result = await sdk.AddTodo({ input });
        set(
          produce<TodoListSlice>(state => {
            state.todoList.todoList = [...state.todoList.todoList, result.createTodo];
          }),
        );
        console.log('Added todo', result.createTodo);
      } catch (error) {
        console.log('Cannot add new todo', input, error);
      }
    },
    async updateTodo(input: TodoUpdateInput): Promise<void> {
      try {
        const result = await sdk.UpdateTodo({ input });
        set(
          produce<TodoListSlice>(state => {
            const todoIndex = state.todoList.todoList.findIndex(t => t.id === input.id);
            state.todoList.todoList = Object.assign([], state.todoList.todoList, {
              [todoIndex]: result.updateTodo,
            });
          }),
        );
        console.log('Updated todo', result.updateTodo);
      } catch (error) {
        console.log('Cannot update todo', input, error);
      }
    },
    async removeTodo(todoId: string): Promise<void> {
      try {
        const result = await sdk.RemoveTodo({ id: todoId });
        set(
          produce<TodoListSlice>(state => {
            state.todoList.todoList = [
              ...state.todoList.todoList.filter(t => t.id !== todoId),
            ];
          }),
        );
        console.log('Removed todo', todoId);
      } catch (error) {
        console.log('Cannot remove todo', todoId, error);
      }
    },
  },
});

export default todoListSlice;
