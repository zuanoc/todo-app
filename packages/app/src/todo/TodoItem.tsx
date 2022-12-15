import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import { Todo } from '../graphql/generated/graphql';
import useStore from '../store/use-store';

/** @jsxImportSource @emotion/react */

export const borderStyle = tw`
	border rounded-xl border-gray-200 hover:focus:(border-gray-300)
`;

const TodoItemContainerDiv = styled.div(() => [
  tw`
		flex 
		gap-2 
		p-2 
		bg-white
		outline-none
	`,
  borderStyle,
]);

const TodoItemNameDiv = styled.div(({ isCompleted }: { isCompleted: boolean }) => [
  tw`w-full p-2 cursor-pointer`,
  isCompleted && tw`text-gray-500 line-through`,
]);

const TodoItemCheckboxInput = tw.input`
	outline-none 
	border border-gray-200 
`;

const TodoItemRemoveButton = tw.button`
	px-4
	rounded-xl
	bg-red-200
	cursor-pointer
  hover:(	bg-red-300)
`;

export const TodoItem = ({ todo }: { todo: Partial<Todo> }) => {
  const { removeTodo, updateTodo } = useStore(s => s.todoList);

  function toggleTodo() {
    updateTodo({ id: todo.id, isCompleted: !todo.isCompleted });
  }

  return (
    <TodoItemContainerDiv>
      <TodoItemCheckboxInput
        type="checkbox"
        checked={todo.isCompleted}
        onChange={toggleTodo}
      />
      <TodoItemNameDiv isCompleted={todo.isCompleted} onClick={toggleTodo}>
        {todo.name}
      </TodoItemNameDiv>
      <TodoItemRemoveButton onClick={() => removeTodo(todo.id)}>X</TodoItemRemoveButton>
    </TodoItemContainerDiv>
  );
};
