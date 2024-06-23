import { Field,Int,ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
export class ResponseMessage{

    @Field()
    res: string

    @Field()
    message: string

    @Field(type => User,{nullable:true})
    user?: User

}