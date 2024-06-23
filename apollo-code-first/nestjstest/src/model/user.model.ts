import { Field,Int,ObjectType } from "@nestjs/graphql";
import { UserInfo } from "./userInfo.model";
@ObjectType()   //该装饰器告诉nestjs和graphql，这个类是一个graphql类
export class User{
    @Field(type => Int)   //@Field可以指明该属性是一个graphql中的属性
    id: number    //id在typescript中是number类型，然而在graphql中是Int类型，因此type => Int是在做一个类型的对应声明
    //number类型需要去使用type=>，因为ts中number类型包含int和float，因此graphql无法推断出我们想要的是什么类型的数据
    
    //这里string类型不需要type=>string，因为graphql会自动识别并转换
    @Field()
    username: string

    @Field({nullable:true})
    password?: string

    @Field(type => UserInfo)
    userInfo?: UserInfo

}       