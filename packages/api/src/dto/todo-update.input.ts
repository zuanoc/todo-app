import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class TodoUpdateInput {
  @Field()
  id!: string;

  @Field()
  isCompleted!: boolean;
}
