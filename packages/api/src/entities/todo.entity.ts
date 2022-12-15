import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import cuid from 'cuid';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field()
  isCompleted!: boolean;

  constructor(name: string) {
    this.id = cuid();
    this.name = name;
    this.isCompleted = false;
  }
}
