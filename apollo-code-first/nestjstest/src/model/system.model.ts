import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class System{
    @Field(type => Int)
    CurrentInlinepPeopleNum:number
}