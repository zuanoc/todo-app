/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  removeTodo: Todo;
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  todoAddInput: TodoAddInput;
};


export type MutationRemoveTodoArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTodoArgs = {
  todoUpdateInput: TodoUpdateInput;
};

export type Query = {
  __typename?: 'Query';
  getTodoList: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  isCompleted: Scalars['Boolean'];
  name: Scalars['String'];
};

export type TodoAddInput = {
  name: Scalars['String'];
};

export type TodoUpdateInput = {
  id: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type TodoDataFragment = { __typename?: 'Todo', id: string, name: string, isCompleted: boolean };

export type GetTodoListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTodoListQuery = { __typename?: 'Query', getTodoList: Array<{ __typename?: 'Todo', id: string, name: string, isCompleted: boolean }> };

export type AddTodoMutationVariables = Exact<{
  input: TodoAddInput;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, name: string, isCompleted: boolean } };

export type UpdateTodoMutationVariables = Exact<{
  input: TodoUpdateInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, name: string, isCompleted: boolean } };

export type RemoveTodoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveTodoMutation = { __typename?: 'Mutation', removeTodo: { __typename?: 'Todo', id: string, name: string, isCompleted: boolean } };

export const TodoDataFragmentDoc = gql`
    fragment TodoData on Todo {
  id
  name
  isCompleted
}
    `;
export const GetTodoListDocument = gql`
    query GetTodoList {
  getTodoList {
    ...TodoData
  }
}
    ${TodoDataFragmentDoc}`;
export const AddTodoDocument = gql`
    mutation AddTodo($input: TodoAddInput!) {
  createTodo(todoAddInput: $input) {
    ...TodoData
  }
}
    ${TodoDataFragmentDoc}`;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($input: TodoUpdateInput!) {
  updateTodo(todoUpdateInput: $input) {
    ...TodoData
  }
}
    ${TodoDataFragmentDoc}`;
export const RemoveTodoDocument = gql`
    mutation RemoveTodo($id: String!) {
  removeTodo(id: $id) {
    ...TodoData
  }
}
    ${TodoDataFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetTodoList(variables?: GetTodoListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTodoListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTodoListQuery>(GetTodoListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTodoList', 'query');
    },
    AddTodo(variables: AddTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddTodoMutation>(AddTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddTodo', 'mutation');
    },
    UpdateTodo(variables: UpdateTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTodoMutation>(UpdateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateTodo', 'mutation');
    },
    RemoveTodo(variables: RemoveTodoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveTodoMutation>(RemoveTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveTodo', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;