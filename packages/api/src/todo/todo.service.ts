import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoAddInput } from '../dto/todo-add.input';
import { Todo } from '../entities/todo.entity';
import { TodoUpdateInput } from '@src/dto/todo-update.input';

@Injectable()
export class TodoService {
  private todoList: Todo[] = [];

  async create({ name }: TodoAddInput) {
    const todo = new Todo(name);
    this.todoList.push(todo);
    return todo;
  }

  async findAll() {
    return this.todoList;
  }

  async update({ id, isCompleted }: TodoUpdateInput) {
    const todo = this.todoList.find(t => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} does not exist.`);
    }

    todo.isCompleted = isCompleted;
    return todo;
  }

  async remove(id: string) {
    const todo = this.todoList.find(t => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} does not exist.`);
    }

    this.todoList = this.todoList.filter(t => t.id !== id);
    return todo;
  }
}
