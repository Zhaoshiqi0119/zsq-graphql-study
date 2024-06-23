import { Resolver,Query,Mutation, Args, Context, ResolveField, Parent, Subscription } from "@nestjs/graphql";
import { User } from "src/model/user.model";
import { UserService } from "./user.service";
import { UserInfo } from "src/model/userInfo.model";
import { ResponseMessage } from "src/model/ResponseMessage.model";
import { System } from "src/model/system.model";
import { PubSub } from 'graphql-subscriptions';
@Resolver(of => User)  //在代码优先中，为了更准确的生成schema.graphql，因此要使用ts中的类型函数
export class UserResolver{
    constructor(
        private userService:UserService
    ){}

    
    @Query(returns => ResponseMessage)
    async login(
        @Args('username')username:string,
        @Args('password')password:string,
        @Args('code')code:string,
        @Context() context
    ){
        return this.userService.login(username,password,code,context.req.session)
    }

    @Mutation(returns => ResponseMessage)
    async register(
        @Args('username')username:string,
        @Args('password')password:string,
        @Args('confirmPassword')confirmPassword:string
    ){
        return this.userService.register(username,password,confirmPassword)
    }

}

