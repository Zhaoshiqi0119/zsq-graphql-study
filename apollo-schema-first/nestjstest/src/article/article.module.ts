import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
@Module({
    imports:[],
    controllers:[ArticleController],
    providers:[]   
})

export class ArticleModule {}//一定要暴露出去才可以