import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Logger } from 'src/middleware';
import { UserResolver } from './user.resolver';

@Module({
    imports:[],
    controllers:[UserController],
    providers:[UserService,UserResolver]   
})

export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(Logger).forRoutes('/user/login')
    }
}//一定要暴露出去才可以