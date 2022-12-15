import create from 'zustand';
import { GetState, SetState } from 'zustand/vanilla';

import todoListSlice, { TodoListSlice } from './todo-store';

export type RootState = TodoListSlice;

export const useStore = create<RootState>((set: SetState<any>, get: GetState<any>) => ({
  ...todoListSlice(set, get),
}));

export default useStore;
