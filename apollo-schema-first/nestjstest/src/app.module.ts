import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { UploadModule } from './upload/upload.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
// import { definitionsFactory } from '../src/apollo/generate-typings';
@Module({
  imports: [
    UserModule,
    ArticleModule,
    UploadModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({//引入apollo-server
      driver: ApolloDriver,
      typePaths: ['src/schema.graphql'],//这个路径有点迷，日后再研究
      definitions: {//这个就是根据schema.graphql生成对应的ts对象，ts对象可以用于类型约束和语法提示，加快编码速度
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,//graphql中有typename这个内置属性，但ts中没有，可以在生成ts对象的时候自动添加上这个属性
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }  
