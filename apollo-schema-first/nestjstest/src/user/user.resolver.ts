import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User') //它是一种命名约定和组织方式，确保代码的清晰和逻辑结构。(没有实际作用，只是为了结构清晰)
export class UserResolver {
  constructor(private userService: UserService) {}  

  @Query('login')  //这个要和之前schema.graphql中写的名字对应起来
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('code') code:string,
    @Context() context,
  ) {
    const session = context.req.session;
    return this.userService.login(username,password,code,session);
  }

  @Mutation('register')
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string
  ) {
    return this.userService.register(username, password,confirmPassword);
  }
}
