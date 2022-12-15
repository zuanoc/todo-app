import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';

import useStore from '../store/use-store';
import { borderStyle } from './TodoItem';

/** @jsxImportSource @emotion/react */

const TodoInputContainerDiv = tw.div`
	flex gap-2
`;

const TodoTextInput = styled.input(() => [
  tw`w-full p-4 rounded-xl border outline-none text-xl`,
  borderStyle,
]);

const AddButton = tw.button`
	p-4 
	rounded-xl 
	bg-green-500
	text-white
	cursor-pointer
	disabled:(
		bg-green-300
		cursor-not-allowed
	)
`;

export const TodoInput = () => {
  const { addTodo } = useStore(s => s.todoList);
  const [name, setName] = useState<string>('');

  async function addNewTodo() {
    if (!name) {
      alert('Please input the todo name!');
      return;
    }
    const todoName = name;
    setName('');
    await addTodo({ name: todoName });
  }

  return (
    <TodoInputContainerDiv>
      <TodoTextInput
        type="text"
        placeholder="type todo here..."
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') addNewTodo();
        }}
      />
      <AddButton disabled={!name} onClick={addNewTodo}>
        Add
      </AddButton>
    </TodoInputContainerDiv>
  );
};
