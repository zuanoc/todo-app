import React, { useEffect } from 'react';
import tw from 'twin.macro';

import useStore from '../store/use-store';
import { TodoInput } from './TodoInput';
import { TodoItem } from './TodoItem';

/** @jsxImportSource @emotion/react */

const RootDiv = tw.div`
  flex 
  h-screen w-screen 
  justify-center items-start 
  bg-gray-200
`;

const TodoListContainerDiv = tw.div`
  flex 
  flex-col w-1/3 
  mt-20 
  gap-2
`;

const TodoListDiv = tw.div`
  flex 
  flex-col 
  gap-2
`;

const TodoApp = () => {
  const { todoList, init, isInitialized } = useStore(s => s.todoList);

  useEffect(() => {
    init();
  }, []);

  if (!isInitialized) {
    return <div>'Loading...'</div>;
  }

  return (
    <RootDiv>
      <TodoListContainerDiv>
        <TodoInput />
        <TodoListDiv>
          {todoList.map(t => (
            <TodoItem key={t.id} todo={t} />
          ))}
        </TodoListDiv>
      </TodoListContainerDiv>
    </RootDiv>
  );
};

export default TodoApp;
