import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from '../entities/todo.entity';
import { TodoAddInput } from '@src/dto/todo-add.input';
import { TodoUpdateInput } from '@src/dto/todo-update.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(@Args('todoAddInput') todoCreationInput: TodoAddInput) {
    return this.todoService.create(todoCreationInput);
  }

  @Query(() => [Todo], { name: 'getTodoList' })
  async findAll() {
    return this.todoService.findAll();
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('todoUpdateInput') updateTodoInput: TodoUpdateInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => String }) id: string) {
    return this.todoService.remove(id);
  }
}
