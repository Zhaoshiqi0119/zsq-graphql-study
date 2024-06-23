import { Field,Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserInfo{
    @Field(type => Int)
    id: number

    @Field(type => Int)
    userId: number

    @Field({nullable:true})
    phone?: String

    @Field({nullable:true})
    home?: string

    @Field({nullable:true})
    gender?: string


}